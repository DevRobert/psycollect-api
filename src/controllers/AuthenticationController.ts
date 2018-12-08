import { Request, Response } from "express";
import * as jwt from "jsonwebtoken"
import UserRepository from "../model/UserRepository";
import User from "../model/User";
import * as config from "config"

const userRepository = new UserRepository()

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
        user = await userRepository.getUserByEmail(email)
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

    const payload = {
        userid: user.id,
        email: user.email,
        admin: user.admin
    }

    const secret: string = config.get("jwt-secret")

    const token = jwt.sign(payload, secret, {
        algorithm: "HS256"
    })

    response.status(200).send({
        token
    })
}
