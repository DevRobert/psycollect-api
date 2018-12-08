import * as express from "express"
import * as bodyParser from "body-parser"
import Routes from "./routes"

class App {
    public app: express.Application

    constructor() {
        this.app = express()
        this.config()

    }

    private config(): void {
        this.app.use(bodyParser.json())
        Routes.configure(this.app)
    }
}

export default new App().app
