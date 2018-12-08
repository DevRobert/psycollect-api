import DailyReportId from "./DailyReportId";
import EmotionValue from "./EmotionValue";
import ActivityValue from "./ActivityValue";
import EmotionSet from "./EmotionSet";
import ActivitySet from "./ActivitySet";

export default class DailyReport {
    private _reportId: DailyReportId
    private _emotions = new Map<string, EmotionValue>()
    private _activities = new Map<string, ActivityValue>()

    constructor(reportId: DailyReportId) {
        this._reportId = reportId
    }

    public get ReportId(): DailyReportId {
        return this._reportId
    }

    public get emotions(): ReadonlyMap<string, EmotionValue> {
        return this._emotions
    }

    public get activities(): ReadonlyMap<string, ActivityValue> {
        return this._activities
    }

    public trackEmotion(emotionName: string, emotionValue: EmotionValue): void {
        if(!EmotionSet.has(emotionName)) {
            throw new Error("Invalid emotion name")
        }

        this._emotions.set(emotionName, emotionValue)
    }

    public trackActivity(activityName: string, activityValue: ActivityValue): void {
        if(!ActivitySet.has(activityName)) {
            throw new Error("Invalid activity name")
        }

        this._activities.set(activityName, activityValue)
    }
}
