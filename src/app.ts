import * as express from "express"
import * as expressJwt from "express-jwt"
import * as bodyParser from "body-parser"
import * as config from "config"
import Routes from "./routes"

class App {
    public app: express.Application

    constructor() {
        this.app = express()
        this.config()
    }

    private config(): void {
        this.app.use(bodyParser.json())

        this.app.use(expressJwt({
            secret: config.get("jwt-secret"),
            algorithm: "HS256"
        }).unless({
            path: '/login'
        }))

        Routes.configure(this.app)
    }
}

export default new App().app
