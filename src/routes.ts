import { Request, Response, Application } from "express"

export default class Routes {
    public static configure(app: Application): void {
        // Authentication

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
