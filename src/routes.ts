import { Application } from "express"
import * as AuthenticationController from "./controllers/AuthenticationController"
import * as UserController from "./controllers/UserController"
import * as TrackingController from "./controllers/TrackingController"
import * as AnalyzeController from "./controllers/AnalyzeController"
import * as GoalsController from "./controllers/GoalsController"

export default class Routes {
    public static configure(app: Application): void {
        // Authentication

        app.route('/login').post(AuthenticationController.login)

        // User

        app.route('/users').get(UserController.getUsers)
        app.route('/users').post(UserController.createUser)

        // Track

        app.route("/tracking/:date").get(TrackingController.getDayReport)
        app.route("/tracking/:date").put(TrackingController.setDayReport)

        // Analyze

        app.route("/analyze").get(AnalyzeController.getReport)

        // Goals

        app.route("/goals").get(GoalsController.getGoals)
        app.route("/goals").put(GoalsController.setGoals)
    }
}
