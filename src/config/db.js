import mongoose from "mongoose";

export const connectDB = async () => {
  try {
    const conn = await mongoose.connect("mongodb://dedeemir07:SFdnQzqfiWTPgQXe@cluster0-shard-00-00.2kdn0.mongodb.net:27017,cluster0-shard-00-01.2kdn0.mongodb.net:27017,cluster0-shard-00-02.2kdn0.mongodb.net:27017/portfolio?ssl=true&replicaSet=atlas-109cji-shard-0&authSource=admin&retryWrites=true&w=majority&appName=Cluster0");
    console.log(`MongoDB connected: ${conn.connection.host}`);
  } catch (error) {
    console.log(`Error: ${error.message}`);
    process.exit(1); //Code 1 for error
  }
};

// mongodb://dedeemir07:<db_password>@cluster0-shard-00-00.2kdn0.mongodb.net:27017,cluster0-shard-00-01.2kdn0.mongodb.net:27017,cluster0-shard-00-02.2kdn0.mongodb.net:27017/?ssl=true&replicaSet=atlas-109cji-shard-0&authSource=admin&retryWrites=true&w=majority&appName=Cluster0

// mongodb+srv://dedeemir07:SFdnQzqfiWTPgQXe@cluster0.2kdn0.mongodb.net/portfolio?retryWrites=true&w=majority&appName=Cluster0/mydatabase