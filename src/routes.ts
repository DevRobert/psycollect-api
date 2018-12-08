import { Request, Response, Application } from "express"
import * as UserController from "./controllers/UserController"

export default class Routes {
    public static configure(app: Application): void {
        // Authentication

        app.route('/login').post((request: Request, response: Response) => {
            response.status(200).send({
                "userid": "test",
                "email": "test@example.com",
                "admin": true,
                "enabled": true
            })
        })

        // User

        app.route('/users').get(UserController.getUsers)
        app.route('/users').post(UserController.createUser)

        // Emotion

        app.route('/emotions').get((request: Request, response: Response) => {
            response.status(200).send({
                "message": "emotions"
            })
        })

        // Activity

        app.route('/activities').get((request: Request, response: Response) => {
            response.status(200).send({
                "message": "activities"
            })
        })

        // Daily report

        // Analysis
    }
}
