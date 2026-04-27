import mongoose from 'mongoose';

const connectDB = () => {   
    mongoose.connect(process.env.DB_URL)
    .then(() => console.log('DB connected'))
    .catch((error) => console.error(`DB connection error ${error}`))
}

export default connectDB;