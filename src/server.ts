import app from "./app"
import * as AWS from "aws-sdk"

const port = process.env.PORT || 3001;


app.listen(port, () => {
    console.log("Server listening on port " + port)
})
