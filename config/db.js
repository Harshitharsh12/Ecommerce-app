import mongoose from "mongoose";
const connectDB = async () => {
  try {
    const con = await mongoose.connect(process.env.MONGO_URL);
    console.log(
      `Connected to mongodb Database ${con.connection.host}`.bgMagenta.white
    );
  } catch (err) {
    console.log(`Error in Mongodb ${err}`.bgRed.white);
  }
};
export default connectDB;
