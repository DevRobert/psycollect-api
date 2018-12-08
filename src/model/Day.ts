const regex = /^[0-9]{4}\-[0-9]{2}\-[0-9]{2}$/

export default class Day {
    private _s: string

    private constructor(s: string) {
        if(!regex.test(s)) {
            throw Error("The date must be in the format ####-##-##.")
        }

        try {
            // toISOString throws error for invalid date
            new Date(s).toISOString()
        }
        catch(error) {
            throw new Error("The given date '" + s + "' is invalid.")
        }

        this._s = s
    }

    public static parseString(s: string): Day {
        return new Day(s)
    }

    toString(): string {
        return this._s
    }
}
