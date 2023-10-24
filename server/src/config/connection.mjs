import mongoose from "mongoose";
import chalk from "chalk";
import properties from "./properties.mjs";

const dbURI = properties.DB;

// custom console
const connected = chalk.bold.magenta;
const error = chalk.bold.red;
const terminated = chalk.bold.cyan;

const connection = () => {
  mongoose
    .connect(dbURI, { useNewUrlParser: true })
    .then(() => console.log(connected(`Mondodb connected on ${dbURI}`)))
    .catch((err) => console.log(error(`Connection failed: ${err}`)));

  process.on("SIGINT", () => {
    mongoose.connection
      .close()
      .then(console.log(terminated("MongoDB has been disconnected.")))
      .then(process.exit(0));
  });
};
export default connection;
