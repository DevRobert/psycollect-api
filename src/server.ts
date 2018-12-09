import app from "./app"
import * as AWS from "aws-sdk"

const PORT = 3001

app.listen(PORT, () => {
    console.log("Server listening on port " + PORT)
})
