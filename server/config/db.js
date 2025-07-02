import mongoose from "mongoose";
// const DB_URL = "mongodb://localhost:27017/airBNB";

const connectWithDB = () => {
  mongoose
    .connect(process.env.DB_URL)
    .then(console.log("DB connected successfully"))
    .catch((err) => {
      console.log(err);
      process.on('exit', ()=>console.log('exiting process'))
      process.exit(1);
    });
};


export default connectWithDB