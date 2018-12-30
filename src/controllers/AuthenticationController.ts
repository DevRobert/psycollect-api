import { Request, Response } from "express";
import * as UserRepository from "../model/UserRepository";
import User from "../model/User";
import { signToken, Token } from "./TokenGenerator";

export async function login(request: Request, response: Response) {
    let email = "";

    if(request.body.email) {
        email = String(request.body.email).trim()
    }

    if(email.length === 0) {
        response.status(400).send({
            error: "Please enter your email address."
        })

        return
    }

    let password = "";

    if(request.body.password) {
        password = String(request.body.password).trim()
    }

    if(password.length === 0) {
        response.status(400).send({
            error: "Please enter your password."
        })

        return
    }

    let user: User
    
    try {
        user = await UserRepository.getUserByEmail(email)
        console.log("user ", user)
    }
    catch(error) {
        console.log(error)

        response.status(500).send({
            error: error.message
        })

        return
    }

    if(!user) {
        response.status(400).send({
            error: "The email address is unknown."
        })

        return
    }

    if(!user.checkPassword(password)) {
        response.status(400).send({
            error: "The password is wrong."
        })

        return
    }

    if(!user.enabled) {
        response.status(400).send({
            error: "The account has been disabled."
        })
    }

    const payload: Token = {
        userid: user.id,
        email: user.email,
        admin: user.admin
    }

    const token = signToken(payload)

    response.status(200).send({
        token,
        email: user.email,
        admin: user.admin
    })
}
