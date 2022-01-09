// Import npm packages
import express from 'express';
import mongoose from 'mongoose';
import morgan from 'morgan';
import cookieParser from 'cookie-parser';
import session from 'express-session';
import cors from "cors";
import userRoutes from "./routes/user.js";
import conversationRoutes from './routes/conversation.js';
import messageRoutes from './routes/message.js';
import reviewRoutes from './routes/review.js';
import path from 'path';

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

app.use(session({
  secret: "secretCode",
  resave: true,
  saveUninitialized: true,
  cookie: {
    maxAge: 60 * 60 * 24 * 1000
  },
  cookieName: "session"

}))
app.use(function (req, res, next) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, X-AUTHENTICATION, X-IP, Content-Type, Accept');
  res.setHeader('Access-Control-Allow-Credentials', true);
  next();
});
const __dirname = path.resolve();
// Routes
app.use("/backend/", userRoutes);
app.use("/backend/conversation/", conversationRoutes);
app.use("/backend/message/", messageRoutes);
app.use("/backend/", reviewRoutes);
if (process.env.NODE_ENV === 'production') {
  const publicPath = path.join(__dirname, 'f_app', 'build');
  app.use(express.static(publicPath));
  app.get('*', (req, res) => {
    res.sendFile(path.join(publicPath, 'index.html'));
  });
}




app.listen(PORT, console.log(`Server is starting at ${PORT}`));