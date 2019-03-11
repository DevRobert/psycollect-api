export default class Period {
    private _year: number

    constructor(year: number) {
        this._year = year
    }

    get year(): number {
        return this._year
    }

    toString() {
        return this._year.toString()
    }

    static parseString(s: string): Period {
        const year = Number.parseInt(s)
        return new Period(year)
    }
}
