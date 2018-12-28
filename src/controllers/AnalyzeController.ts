import { Request, Response } from "express";
import { getDailyReports } from "../model/DailyReportRepository";
import DailyReportId from "../model/DailyReportId";
import Day from "../model/Day";

export async function getReport(request: Request, response: Response) {
    const userId = request.user.userid
    const showDays = 10

    let dailyReportIds = []
    const date = new Date()

    for(let dayIndex = 0; dayIndex < showDays; dayIndex++) {
        const dateString = date.toISOString().substr(0, "0000-00-00".length)
        dailyReportIds.push(new DailyReportId(userId, Day.parseString(dateString)))

        date.setDate(date.getDate() - 1)
    }

    dailyReportIds.reverse()

    let dailyReports
    
    try {
        dailyReports = await getDailyReports(dailyReportIds)
    }
    catch(error) {
        response.status(400).send({
            error: error.message
        })

        return
    }
    

    const data = {
        dates: [],
        emotions: {},
        activities: {}
    }

    dailyReports.forEach(dailyReport => {
        if(!dailyReport) {
            return
        }

        data.dates.push(dailyReport.reportId.day.toString())

        dailyReport.emotions.forEach((value, key) => {
            if(!data.emotions[key]) {
                data.emotions[key] = []
            }

            data.emotions[key].push(value.number)
        })

        dailyReport.activities.forEach((value, key) => {
            if(!data.activities[key]) {
                data.activities[key] = []
            }

            data.activities[key].push(value.number)
        })
    })

    response.status(400).send({
        data
    })
}
