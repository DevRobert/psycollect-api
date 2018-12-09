export default class EmotionValue {
    private static _unknown: EmotionValue
    private static _weak: EmotionValue
    private static _medium: EmotionValue
    private static _strong: EmotionValue

    static initialize() {
        EmotionValue._unknown = new EmotionValue(0)
        EmotionValue._weak = new EmotionValue(1)
        EmotionValue._medium = new EmotionValue(2)
        EmotionValue._strong = new EmotionValue(3)
    }

    public static get Unknown(): EmotionValue {
        return EmotionValue._unknown
    }

    public static get Weak(): EmotionValue {
        return EmotionValue._weak
    }

    public static get Medium(): EmotionValue {
        return EmotionValue._medium
    }

    public static get Strong(): EmotionValue {
        return EmotionValue._strong
    }

    public static parseNumber(number: number): EmotionValue {
        switch(number) {
            case EmotionValue.Unknown.number:
                return EmotionValue.Unknown
            
            case EmotionValue.Weak.number:
                return EmotionValue.Weak
            
            case EmotionValue.Medium.number:
                return EmotionValue.Medium
            
            case EmotionValue.Strong.number:
                return EmotionValue.Strong

            default:
                throw new Error("Invalid emotion number '" + number + "'!")
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

EmotionValue.initialize()
