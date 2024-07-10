import cors from 'cors'
import express from 'express'
import helmet from 'helmet'
import mongoose from 'mongoose'
import { setupLogger } from './config/logger'

class Application {
  public app: express.Application

  constructor() {
    this.app = express()

    this.app.use(cors())

    this.app.use(async (_, _res, next) => {
      await mongoose.connect(String(process.env.MONGO_URI))
      next()
    })

    this.config()
    this.router()
  }

  config() {
    this.app.enable('trust proxy')

    this.app.use(setupLogger(process.env.NODE_ENV))

    this.app.use(helmet())
    this.app.use(express.json())
    this.app.use(express.urlencoded({ extended: true }))
  }

  router() {
    this.app.get('/', (req, res) => {
      res.status(200).json({ message: 'Hello World!' })
    })
  }
}

export default Application
