import mongoose from "mongoose"
import { config } from "dotenv"
config()

const connectDB = () => {
    const mongo_uri = process.env.MONGO_URI as string;
    mongoose.connect(mongo_uri)
        .then(() => console.log("MongoDB Connected..."))
        .catch((err) => console.log(err))
}

export default connectDB