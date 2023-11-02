import express from 'express'
import cors from 'cors'
import bodyParser from 'body-parser'
import chalk from 'chalk'
import properties from './config/properties.mjs'
import connection from './config/connection.mjs'
import { router as userRouter } from './users/users.routes.mjs'

const serving = chalk.bold.blue

// montaje de la aplicación
const app = express()
const bodyParserJSON = bodyParser.json()
const bodyParserURLEncoded = bodyParser.urlencoded({ extended: true })
app.use(cors())
app.use(bodyParserJSON)
app.use(bodyParserURLEncoded)

// se establece conexión con la base de datos
connection()

// inicialización de enrutador de express
const router = express.Router()

// implementación de rutas definidas en la aplicación
app.use('/', router)
userRouter(router)

// inicialización del servidor
app.listen(properties.PORT, () =>
  console.log(serving(`Server running on port ${properties.PORT}`))
)
