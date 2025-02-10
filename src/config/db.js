import mongoose from "mongoose";

export const connectDB = async () => {
  try {
    const conn = await mongoose.connect("mongodb+srv://dedeemir07:SFdnQzqfiWTPgQXe@cluster0.2kdn0.mongodb.net/portfolio?retryWrites=true&w=majority&appName=Cluster0/mydatabase");
    console.log(`MongoDB connected: ${conn.connection.host}`);
  } catch (error) {
    console.log(`Error: ${error.message}`);
    process.exit(1); //Code 1 for error
  }
};