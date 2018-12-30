import DailyReportId from "./DailyReportId";
import DailyReport from "./DailyReport";
import * as AWS from "aws-sdk"
import * as config from "config"
import EmotionValue from "./EmotionValue";
import ActivityValue from "./ActivityValue";

AWS.config.update({
    region: config.get("aws_region")
})

const documentClient = new AWS.DynamoDB.DocumentClient()
const tableName = 'psycollect-daily-reports'

function dailyReportToItem(dailyReport: DailyReport) {
    const Activities = {}

    dailyReport.activities.forEach((activityValue, activityName) => {
        if(activityValue !== ActivityValue.Unknown) {
            Activities[activityName] = activityValue.number
        }
    })

    const Emotions = {}

    dailyReport.emotions.forEach((emotionValue, emotionName) => {
        if(emotionValue !== EmotionValue.Unknown) {
            Emotions[emotionName] = emotionValue.number
        }
    })

    return {
        ReportId: dailyReport.reportId.toString(),
        Activities,
        Emotions
    }
}

function itemToDailyReport(item): DailyReport {
    const reportId = DailyReportId.parseString(item.ReportId)
    const report = new DailyReport(reportId)

    if(item.Emotions) {
        for(let emotionName of Object.keys(item.Emotions)) {
            report.trackEmotion(emotionName, EmotionValue.parseNumber(item.Emotions[emotionName]))
        }
    }

    if(item.Activities) {
        for(let activityName of Object.keys(item.Activities)) {
            report.trackActivity(activityName, ActivityValue.parseNumber(item.Activities[activityName]))
        }
    }

    return report
}

export async function saveDailyReport(dailyReport: DailyReport): Promise<void> {
    const params = {
        TableName: tableName,
        Item: dailyReportToItem(dailyReport)
    }

    await documentClient.put(params).promise()
}

export async function getDailyReport(reportId: DailyReportId): Promise<DailyReport> {
    const params = {
        TableName: tableName,
        Key: {
            ReportId: reportId.toString()
        }
    }

    const response = await documentClient.get(params).promise()

    if(!response.Item) {
        return null
    }

    return itemToDailyReport(response.Item)
}

export async function getDailyReports(dailyReportIds: DailyReportId[]): Promise<DailyReport[]> {
    const promises = dailyReportIds.map(dailyReportId => getDailyReport(dailyReportId))
    return await Promise.all(promises)
}
