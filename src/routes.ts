import { Request, Response, Application } from "express"
import * as AuthenticationController from "./controllers/AuthenticationController"
import * as UserController from "./controllers/UserController"
import * as TrackingController from "./controllers/TrackingController"

export default class Routes {
    public static configure(app: Application): void {
        // Authentication

        app.route('/login').post(AuthenticationController.login)

        // User

        app.route('/users').get(UserController.getUsers)
        app.route('/users').post(UserController.createUser)

        // Tracking

        app.route("/tracking/:date").get(TrackingController.getDayReport)
        app.route("/tracking/:date").put(TrackingController.setDayReport)
    }
}
