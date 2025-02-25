import mongoose from 'mongoose';

const connectMongoDB = async ()=>{
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log("CONNECTED TO MONGO DB");

    } catch (error) {
        console.log(error);
    }
}

export default connectMongoDB;