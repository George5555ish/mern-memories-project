import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import bodyParser from 'body-parser';
import postRoute from './routes/posts.js';
import userRoute from './routes/user.js';
import dotenv from 'dotenv';
const app = express();


app.use(bodyParser.json({limit: "30mb", extended: true}));
app.use(bodyParser.urlencoded({limit: "30mb", extended: true}));
app.use(cors());
dotenv.config();

// app.get('/', (req, res)=> {
//     res.send('Working');
//     console.log('works');
// })


app.use('/posts', postRoute);
app.use('/user', userRoute);
const port = process.env.PORT || 3000;

mongoose.connect(process.env.CONNECTION_URL, {useUnifiedTopology: true, useNewUrlParser:true})
.then(() => app.listen(port, ()=> {
    console.log('Server listening at port ' + port);
})).catch((err)=> console.log(err.message));




mongoose.set('useFindAndModify', false);