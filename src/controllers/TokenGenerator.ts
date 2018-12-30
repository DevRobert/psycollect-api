import * as config from "config"
import * as jwt from "jsonwebtoken"

export interface Token {
    userid: string,
    email: string,
    admin: boolean
}

export interface Options {
    secret: string,
    expiresIn: number
}

export function signToken(payload: Token, options?: Partial<Options>) {
    if(!options) {
        options = {}
    }

    const secret = options.secret || config.get("jwt-secret") as string

    return jwt.sign(payload, secret, {
        algorithm: "HS256",
        expiresIn: options.expiresIn || 60 * 60 // 60 minutes
    })
}
