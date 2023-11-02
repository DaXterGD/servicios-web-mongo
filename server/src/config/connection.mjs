import mongoose from 'mongoose'
import chalk from 'chalk'
import properties from './properties.mjs'

// se obtiene la url de la base de datos del archivo properties
const dbURI = properties.DB

// definición de variables para mostrar mensajes con colores personalizados en la consola
const connected = chalk.bold.magenta
const error = chalk.bold.red
const terminated = chalk.bold.cyan

// esta funnción establece la conexión con la base de datos usando su url, si la conexión falla se mostrará un mensaje de error en la consola
const connection = () => {
  mongoose
    .connect(dbURI, { useNewUrlParser: true })
    .then(() => console.log(connected('Mondodb connected successfully')))
    .catch((err) => console.log(error(`Connection failed: ${err}`)))

  process.on('SIGINT', () => {
    mongoose.connection
      .close()
      .then(console.log(terminated('MongoDB has been disconnected.')))
      .then(process.exit(0))
  })
}
export default connection
