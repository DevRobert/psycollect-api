import { Request, Response } from "express";
import DailyReportId from "../model/DailyReportId";
import Day from "../model/Day";

function getReportId(request: Request) {
    const userId = request.user.userid
    const day =  Day.parseString(request.params.date)
    return new DailyReportId(userId, day)
}

export async function getDayReport(request: Request, response: Response) {
    let reportId: DailyReportId

    try {
        reportId: getReportId(request)
    }
    catch(error) {
        response.status(400).send({
            error: error.message
        })

        return
    }

    response.status(200).send({
        reportId: reportId.toString()
    })
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

    response.status(200).send({
        reportId: reportId.toString()
    })
}
