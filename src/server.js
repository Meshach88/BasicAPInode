import express, { urlencoded } from 'express';
import 'dotenv/config';
import connectDB from './config/db.js';

//import routes
import authRoutes from './routes/authRoutes.js';

const app = express();
const port = process.env.PORT || 5001;

//middleware
app.use(express.json());
app.use(express.urlencoded({extended: true}));

//connect to DB
connectDB()

//API endpoints
app.get('/', (req, res) => {
    res.json({status: true, message: "API working"})
})

app.use('/users', authRoutes);

app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
})