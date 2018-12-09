import * as bcrypt from "bcrypt"

export default class User {
    public id: string
    public email: string
    public password: string
    public enabled: boolean
    public admin: boolean

    constructor() {
        this.enabled = true
        this.admin = false
    }

    public setPassword(password: string): void {
        const saltRounds = 10
        this.password = bcrypt.hashSync(password, saltRounds)
    }

    public checkPassword(password: string): boolean {
        return bcrypt.compareSync(password, this.password)
    }
}
