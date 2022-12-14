import mongoose from "mongoose";
import environments from "../../config/environments.js";

const MONGODB_URL = environments.MONGODB_URL;

const connectToMongoDB = async () => {
    try {
        await mongoose.connect(MONGODB_URL);

        console.log("MongoDB database connected!");
    } catch (err) {
        console.log("MongoDB database connection error!");

        // 0 = shout down successfully, 1 = shout down error
        process.exit(1);
    }
};

export default connectToMongoDB;
