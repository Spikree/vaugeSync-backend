import mongoose from "mongoose";

const connectDb = async () => {
    try {
        await mongoose.connect(process.env.MONGO_STRING);
        console.log("conndected to db")
    } catch (error) {
        console.log("error connecting to the database");
    }
}

export default connectDb