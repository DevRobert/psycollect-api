import Day from "./Day";

export default class DailyReportId {
    private _userId: String
    private _day: Day

    constructor(userId: String, day: Day) {
        this._userId = userId
        this._day= day
    }

    get userId(): String {
        return this._userId
    }

    get day(): Day {
        return this._day
    }

    toString(): string {
        return this._userId + "_" + this._day
    }

    static parseString(s: string): DailyReportId {
        const userId = s.substring(0, s.length - "_0000-00-00".length)
        const date = s.substring(s.length - "0000-00-00".length, s.length)
        return new DailyReportId(userId, Day.parseString(date))
    }
}
