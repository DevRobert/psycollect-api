import { Request, Response } from "express";
import DailyReportId from "../model/DailyReportId";
import Day from "../model/Day";
import DailyReport from "../model/DailyReport";
import EmotionValue from "../model/EmotionValue";
import ActivityValue from "../model/ActivityValue";
import * as DailyReportRepository from "../model/DailyReportRepository"

function getReportId(request: Request) {
    const userId = request.user.userid
    const day =  Day.parseString(request.params.date)
    return new DailyReportId(userId, day)
}

export async function getDayReport(request: Request, response: Response) {
    let reportId: DailyReportId

    try {
        reportId = getReportId(request)
    }
    catch(error) {
        response.status(400).send({
            error: error.message
        })

        return
    }

    let dailyReport: DailyReport

    try {
        dailyReport = await DailyReportRepository.getDailyReport(reportId)
    }
    catch(error) {
        response.status(500).send({
            error: error.message
        })

        return
    }

    if(dailyReport == null) {
        response.status(404).send({
            error: "No data available."
        })

        return
    }

    const body = {
        date: dailyReport.reportId.day.toString(),
        emotions: {},
        activities: {}
    }

    for(let emotionName of dailyReport.emotions.keys()) {
        body.emotions[emotionName] = dailyReport.emotions.get(emotionName).number
    }

    for(let activityName of dailyReport.activities.keys()) {
        body.activities[activityName] = dailyReport.activities.get(activityName).number
    }

    response.status(200).send(body)
}

export async function setDayReport(request: Request, response: Response) {
    let reportId: DailyReportId

    try {
        reportId = getReportId(request)
    }
    catch(error) {
        response.status(400).send({
            error: error.message
        })

        return
    }

    const dailyReport = new DailyReport(reportId)

    try {
        if(request.body.emotions) {
            for(let emotionName in request.body.emotions) {
                let emotionValue = EmotionValue.parseNumber(request.body.emotions[emotionName])
                dailyReport.trackEmotion(emotionName, emotionValue)
            }
        }

        if(request.body.activities) {
            for(let activityName in request.body.activities) {
                let activityValue = ActivityValue.parseNumber(request.body.activities[activityName])
                dailyReport.trackActivity(activityName, activityValue)
            }
        }
    }
    catch(error) {
        response.status(400).send({
            error: error.message
        })

        return
    }

    try {
        await DailyReportRepository.saveDailyReport(dailyReport)
    }
    catch(error) {
        console.log(error)

        response.status(500).send({
            error: error.message
        })

        return
    }

    response.status(200).send({
        reportId: reportId.toString()
    })
}
