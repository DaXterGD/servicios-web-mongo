import express from 'express'
import cors from 'cors'
import bodyParser from 'body-parser'
import chalk from 'chalk'
import properties from './config/properties.mjs'
import connection from './config/connection.mjs'
import { router as userRouter } from './users/users.routes.mjs'

const serving = chalk.bold.blue

// creating the app
const app = express()
const bodyParserJSON = bodyParser.json()
const bodyParserURLEncoded = bodyParser.urlencoded({ extended: true })
app.use(cors())
app.use(bodyParserJSON)
app.use(bodyParserURLEncoded)

// initializing database connection
connection()

// initializing routes
const router = express.Router()

// using routes
app.use('/api', router)
userRouter(router)

// initializing server
app.listen(properties.PORT, () =>
  console.log(serving(`Server running on port ${properties.PORT}`))
)
