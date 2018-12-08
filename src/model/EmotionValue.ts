export default class EmotionValue {
    private static _weak: EmotionValue
    private static _medium: EmotionValue
    private static _strong: EmotionValue

    static() {
        EmotionValue._weak = new EmotionValue(0)
        EmotionValue._medium = new EmotionValue(1)
        EmotionValue._strong = new EmotionValue(2)
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
            case EmotionValue.Weak.number:
                return EmotionValue.Weak
            
            case EmotionValue.Medium.number:
                return EmotionValue.Medium
            
            case EmotionValue.Strong.number:
                return EmotionValue.Strong

            default:
                throw new Error('Invalid emotion number!')
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
