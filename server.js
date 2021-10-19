// Import npm packages
import express from 'express';
import mongoose from 'mongoose';
import morgan from 'morgan';
import cookieParser from 'cookie-parser';
import session from 'express-session';
import cors from "cors";
import userRoutes from "./routes/user.js";
import jwt from 'jsonwebtoken';

const app = express();
const PORT = process.env.PORT || 8080;

const MONGODB_URI = 'mongodb+srv://Shubham_Arya:hello123@ytrn.lul4b.mongodb.net/myFirstDatabase?retryWrites=true&w=majority'

mongoose.connect(MONGODB_URI || 'mongodb://localhost/mern_youtube', {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

mongoose.connection.on('connected', () => {
  console.log('Mongoose is connected!!!!');
});



//hello123
// HTTP request logger

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(morgan('tiny'));
app.use(cookieParser("secretCode"));

app.use(cors({
  origin: "http://localhost:3000",
  credentinals: true
}))
app.use(session({
  secret: "secretCode",
  resave: true,
  saveUninitialized: true,
  cookie: {
    maxAge: 60 * 60 * 24 * 1000
  },
  cookieName:"session"

}))
app.use(function (req, res, next) {
  res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, X-AUTHENTICATION, X-IP, Content-Type, Accept');
  res.setHeader('Access-Control-Allow-Credentials', true);
  next();
});


//Schema
const Schema = mongoose.Schema;
const BlogPostSchema = new Schema({
  title: String,
  body: String,
  date: {
    type: String,
    Default: Date.now()
  }
});

// Model
const BlogPost = mongoose.model('BlogPost', BlogPostSchema);


//Saving Data to our MongoDB
const data = {
  title: 'Welcome!😈😈',
  body: 'Noob here!😂😂'
};

const NewBlogPost = new BlogPost(data); // instance of the model

// Routes
app.use("/", userRoutes);


app.listen(PORT, console.log(`Server is starting at ${PORT}`));