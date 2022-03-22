import mongoose from "mongoose";

const connectDB = async (DATABASE_URL) => {
  try {
    const DB = {
      dbName: "mydb",
    };
    await mongoose.connect(DATABASE_URL, DB);
    console.log("connected Database");
  } catch (err) {
    console.log(err);
  }
};

export default connectDB;
