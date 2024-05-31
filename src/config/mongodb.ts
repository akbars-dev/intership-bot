import mongoose from "mongoose";

mongoose.set('strictQuery', true)


mongoose.connection.on('connected', () => {
    console.log("> MongoDB connection established");
})

mongoose.connection.on('disconnected', () => {
    console.log("> MongoDB disconnected")
})

mongoose.connection.on('close', () => {
    console.log("> MongoDB closed")
})

mongoose.connection.on('error', (error: string) => {
    console.error(`> MongoDB connection ERROR: ${error}`);

    process.exit(1)
})


export const mongooseConnection = async () => {
    try {
        await mongoose.connect(<string>process.env.MONGO_URI);
    } catch (error) {
        console.error(`> MongoDB connection ERROR: ${error}`);
    }
}

