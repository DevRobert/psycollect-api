import * as request from "supertest"
import app from "./app"
import { expect } from "chai"
import { signToken } from "./controllers/TokenGenerator";

describe("app", () => {
    describe("for unknown route, if logged in", () => {
        it("should return not found error", async () => {
            const token = signToken({
                userid: "test-user",
                email: "test@example.com",
                admin: false
            })
    
            const response = await request(app).get("/invalid-path").set("Authorization", "Bearer " + token)
    
            expect(response.status).to.equal(404)
            expect(response.header["content-type"]).to.equal("application/json; charset=utf-8")
            expect(response.body.error).to.equal("Not Found")
        })
    })

    describe("for unknown route, if not logged in", () => {
        it("should return authorization error", async () => {
            const response = await request(app).get("/invalid-path")
            
            expect(response.status).to.equal(401)
            expect(response.header["content-type"]).to.equal("application/json; charset=utf-8")
            expect(response.body.error).to.equal("No authorization token was found")
        })
    })

    describe("for invalid token format", () => {
        it("should return authorization error", async () => {
            const response = await request(app).get("/users").set("Authorization", "Invalid-Token-Format")
    
            expect(response.status).to.equal(401)
            expect(response.header["content-type"]).to.equal("application/json; charset=utf-8")
            expect(response.body.error).to.equal("Format is Authorization: Bearer [token]")
        })
    })

    describe("for invalid signature", () => {
        it("should return authorization error", async () => {
            const token = signToken({
                userid: "test-user",
                email: "test@example.com",
                admin: false
            }, { secret: "invalid-secret"})

            const response = await request(app).get("/users").set("Authorization", "Bearer " + token)

            expect(response.status).to.equal(401)
            expect(response.header["content-type"]).to.equal("application/json; charset=utf-8")
            expect(response.body.error).to.equal("invalid signature")
        })
    })

    describe("for expired token", () => {
        it("should return authorization error", async () => {
            const token = signToken({
                userid: "test-user",
                email: "test@example.com",
                admin: false
            }, { expiresIn: -1})

            const response = await request(app).get("/users").set("Authorization", "Bearer " + token)

            expect(response.status).to.equal(401)
            expect(response.header["content-type"]).to.equal("application/json; charset=utf-8")
            expect(response.body.error).to.equal("jwt expired")
        })
    })
})
