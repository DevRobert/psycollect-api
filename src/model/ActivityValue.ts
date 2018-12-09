export default class ActivityValue {
    private static _unknown: ActivityValue
    private static _notDone: ActivityValue
    private static _medium: ActivityValue
    private static _intensive: ActivityValue

    static initialize() {
        ActivityValue._unknown = new ActivityValue(0)
        ActivityValue._notDone = new ActivityValue(1)
        ActivityValue._medium = new ActivityValue(2)
        ActivityValue._intensive = new ActivityValue(3)
    }

    public static get Unknown(): ActivityValue {
        return ActivityValue._unknown
    }

    public static get NotDone(): ActivityValue {
        return ActivityValue._notDone
    }

    public static get Medium(): ActivityValue {
        return ActivityValue._medium
    }

    public static get Intensive(): ActivityValue {
        return ActivityValue._intensive
    }

    public static parseNumber(number: number): ActivityValue {
        switch(number) {
            case ActivityValue.Unknown.number:
                return ActivityValue.Unknown
            
            case ActivityValue.NotDone.number:
                return ActivityValue.NotDone
            
            case ActivityValue.Medium.number:
                return ActivityValue.Medium
            
            case ActivityValue.Intensive.number:
                return ActivityValue.Intensive

            default:
                throw new Error("Invalid activity number '" + number + "'!")
        }
    }

    private _number: number

    private constructor(value: number) {
        this._number = value;
    }

    public get number(): number {
        return this._number
    }
}

ActivityValue.initialize()
