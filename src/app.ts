import * as express from "express"
import * as expressJwt from "express-jwt"
import * as bodyParser from "body-parser"
import * as config from "config"
import Routes from "./routes"
import * as cors from "cors"

class App {
    public app: express.Application

    constructor() {
        this.app = express()
        this.config()
    }

    private config(): void {
        this.app.use(cors())
        
        this.app.use(bodyParser.json())

        this.app.use(expressJwt({
            secret: config.get("jwt_secret"),
            algorithm: "HS256"
        }).unless({
            path: '/login'
        }))

        Routes.configure(this.app)

        this.app.use((request, response) => {
            response.status(404).send({
                error: "Not Found"
            })
        })

        this.app.use((error, request, response, next) => {
            if(error.name === "UnauthorizedError") {
                response.status(401).send({
                    error: error.message
                })

                next()
            }
            else {
                next(error)
            }
        })
    }
}

export default new App().app
