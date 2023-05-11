const express = require('express');
const dotenv = require('dotenv');
const path = require('path')
const cors = require('cors')
const shortid = require('shortid')
const Razorpay = require('razorpay')
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');

// fetching routes

const authRoute = require('./routes/auth');
const tourRoute = require('./routes/tours');
const userRoute = require('./routes/users');
const reviewRoute = require('./routes/reviews')
const bookingRoute = require('./routes/bookings');

dotenv.config();
const app = express();
const PORT = process.env.PORT || 5000;
const corsOptions = {
    origin: true,
    credentials: true
}

const razorpay = new Razorpay({
    key_id: "rzp_test_0HNVfUdXU1ot3f",
    key_secret: "1pLh9TstRmp1KOSSljY1YItE",
});

app.use(cors())
app.get('/Resume.jpeg', (req,res)=>{
    res.sendFile(path.join(__dirname,"Resume.jpeg"))
})

app.post('/razorpay', async (req,res) => {
    const data = req.body;
    const payment_capture = 1
    const amount = 499
    const currency = 'INR'
    const options = {
        amount: amount*100,
        currency: currency,
        receipt: shortid.generate(),  //this will generate random receipt.
        payment_capture
    }
    try{
        const response = await razorpay.orders.create(options)
        console.log(response)
        res.json({
            id: response.id,
            currency: response.currency,
            amount: response.amount
        })
    } catch(error){
        console.log(error)
    }
})

// connecting database
mongoose.set('strictQuery', false);
mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    console.log('MongoDB database connected');
}).catch((error) => {
    console.log('MongoDB database connection failed', error);
});

// middlewares
app.use(express.json());
app.use(cookieParser());
app.use(cors(corsOptions));

// routes path and redirecting...
app.use('/api/v1/auth', authRoute);
app.use('/api/v1/tours', tourRoute);
app.use('/api/v1/users', userRoute);
app.use('/api/v1/review', reviewRoute);
app.use('/api/v1/booking', bookingRoute);

// listening at PORT : 5000
app.listen(PORT, () => {
    console.log(`server runnin on ${PORT}\nhttp://localhost:${PORT}`);
})
