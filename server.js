// Import npm packages
const express = require('express');
const mongoose = require('mongoose');
const morgan = require('morgan');
const path = require('path');

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
app.use(morgan('tiny'));

//Schema
const Schema = mongoose.Schema;
const BlogPostSchema = new Schema ({
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


//NewBlogPost.save((error) => {
//  if(error){
//    console.log('Oops, something went wrong');
//  }
//  else{
//    console.log('Data Saved!');
//  }
//});
//.save()



// Routes
app.get('/api',(req,res) => {
  const data={
    username:'HEYA',
    age:5
  };
  BlogPost.find({ })
    .then((data) => {
      console.log('Data: ',data);
      res.json(data);
    })
    .catch((error) => {
      console.log('error: ',error);
    });
});
app.get('/api/name',(req,res) => {
  const data={
    username:'Shubham',
    age:5
  };
  res.json(data);
});

app.listen(PORT, console.log(`Server is starting at ${PORT}`));