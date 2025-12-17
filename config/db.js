import mongoose from "mongoose";
import colors from "colors";

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI);

    console.log(
      `Connected To MongoDB Host: ${conn.connection.host}`.bgMagenta.white
    );

    // ✅ CORRECT place to log DB name
    console.log(
      `Connected Database Name: ${conn.connection.name}`.bgGreen.white
    );

  } catch (error) {
    console.log(`Error in MongoDB ${error}`.bgRed.white);
    process.exit(1);
  }
};

export default connectDB;
