import { Request, Response } from "express"
import * as UserRepository from "../model/UserRepository"
import * as uuidv4 from "uuid/v4"
import User from "../model/User"

export async function getUsers(request: Request, response: Response) {
    if(!request.user.admin) {
        response.status(403).send({
            error: "Access is only granted for admins."
        })

        return
    }
    
    const users = await UserRepository.getAllUsers()

    response.status(200).send(users.map(user => {
        return {
            id: user.id,
            email: user.email,
            enabled: user.enabled,
            admin: user.admin
        }
    }))
}

export async function createUser(request: Request, response: Response) {
    if(!request.user.admin) {
        response.status(403).send({
            error: "Access is only granted for admins."
        })

        return
    }
    
    const email = request.body.email

    if(!email) {
        response.status(400).send({
            message: "Please provide an email address."
        })

        return
    }


    let existingUser = null;
    
    try {
        existingUser = await UserRepository.getUserByEmail(email)
    }
    catch(error) {
        console.log(error)
        
        response.status(500).send({
            error: error.message
        })

        return
    }

    if(existingUser) {
        response.status(400).send({
            message: "The email address has already been used."
        })

        return
    }

    let password = "";
    
    if(request.body.password) {
        password = String(request.body.password).trim()
    }

    if(password.length === 0) {
        response.status(400).send({
            message: "Please provide a password."
        })

        return
    }

    if(password.length < 6) {
        response.status(400).send({
            message: "The password must contain at least 6 characters."
        })

        return
    }

    const user = new User()
    user.id = uuidv4()
    user.email = email
    user.setPassword(password)

    try {
        await UserRepository.saveUser(user)

        response.status(200).send({
            id: user.id,
            email: user.email,
            enabled: user.enabled,
            admin: user.admin
        })
    }
    catch(error) {
        console.log(error)

        response.status(500).send({
            error: error.message
        })
    }
}
