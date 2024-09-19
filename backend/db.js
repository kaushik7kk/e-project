import mongoose from "mongoose";

const connectDB = async () => {
  try {
    const conn = await mongoose.connect("mongodb+srv://kaykayyyy:eProject@eproject.anfmg.mongodb.net/?retryWrites=true&w=majority&appName=eProject");
    console.log(`Connected to Mongoose Database ${conn.connection.host}`);
  } catch (error) {
    console.log(`Error in MongoDB ${error}`);
  }
};

export default connectDB;
