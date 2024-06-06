import express, { Express } from "express"
import router from "./routes"
import cors from 'cors'
import "reflect-metadata"


function createServer(): Express {
    const app: Express = express()
    
    app.use(express.json())
    app.use(express.urlencoded({ extended: true }))
    app.use(cors())

    app.use('/api/v1/', router)

    return app
}

export default createServer