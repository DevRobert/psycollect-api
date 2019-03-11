import Period  from "./Period";

export default class PlanId {
    private _userId: String
    private _period: Period
    
    constructor(userId: String, period: Period) {
        this._userId = userId
        this._period = period
    }

    get userId() {
        return this._userId
    }

    get period() {
        return this._period
    }
    
    toString(): string {
        return this._userId + "_" + this._period.toString()
    }

    static parseString(s: string): PlanId {
        const parts = s.split("_")
        const userId = parts[0]
        const period = Period.parseString(parts[1])
        return new PlanId(userId, period)
    }
}
