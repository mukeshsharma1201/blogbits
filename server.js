const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
require('dotenv').config(); //Take secret values from .env files and put in ENV variables
const cloudinary = require('cloudinary');
const path = require('path');

//API routes to handle
const articleRoute = require('./routes/api/article');
const userRoute = require('./routes/api/user');
const categoriesRoute = require('./routes/api/category');
const commentRoute = require('./routes/api/comment');

/** configure cloudinary */
cloudinary.config({
  cloud_name: 'blog-bits',
  api_key: '312497753297615',
  api_secret: 'lzi4ICGNaOR1YBqDXTQV3E9_RYs'
});

//Express Application
const app = express();

//Express Middlewares
app.use(cors());
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'client', 'build')));

//Connect to DB
const uri = process.env.MONGO_URI;
mongoose.set('useFindAndModify', false);
mongoose
  .connect(uri, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true
  })
  .then(() => console.log('MongoDB database connection established successfully!'))
  .catch(error => console.log(error));

//Handle routes
app.use('/api/articles', articleRoute);
app.use('/api/users', userRoute);
app.use('/api/categories', categoriesRoute);
app.use('/api/comments', commentRoute);

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'client', 'build', 'index.html'));
});

//Start Listening to requests via Express App
const port = process.env.PORT || 5000; //Default Port 5000
app.listen(port, () => {
  console.log(`Server is running at port ${port}`);
});
