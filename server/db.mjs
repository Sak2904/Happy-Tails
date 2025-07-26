import { connect } from "mongoose";

const connectDB = async () => {
    try {
        await connect("mongodb://127.0.0.1:27017/petManagement", {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log("✅ MongoDB Connected Successfully");
    } catch (error) {
        console.error("❌ MongoDB Connection Failed:", error.message);
        process.exit(1);
    }
};

export default connectDB;
