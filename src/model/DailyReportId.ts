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

    toString(): String {
        return this._userId + "_" + this._day
    }
}
