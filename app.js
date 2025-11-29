require("dotenv").config();
const mongoose = require("mongoose");

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/attendify';

mongoose.connect(MONGODB_URI)
.then(()=>{
    console.log("MongoDb connected");
})
.catch((e)=>{
    console.log(e,"Db not connected");
})


const express=require('express');
const app=express();
const path=require('path');

// set ejs as default engine
app.set('view engine', 'ejs');

// path till public folder

// path till views folder
app.set ('views', path.join (__dirname, 'views'))


// passport and password thing-> authorization
const passport = require("passport");
const session = require("express-session");
const User = require("./Model/User");

app.use(session({
  secret: process.env.SESSION_SECRET || "heu5671iio90",  
  resave: false,
  saveUninitialized: false
}));

app.use(passport.initialize());
app.use(passport.session());

passport.use(User.createStrategy());
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());


// for form data
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

//  for req.user
app.use((req, res, next) => {
  res.locals.user = req.user;  // makes "user" available in all EJS views
  next();
});
// import router
const landingRoute=require('./Routes/api/landing');
const authRoute=require('./Routes/api/auth');
const infoRoute=require('./Routes/api/info');
const seedDB = require("./seedStudnet");
const seedSections = require("./seedSec");
const seedSimpleUsers = require("./seedStudnet");

// use imported routes
app.use( landingRoute);
app.use( authRoute);
app.use(infoRoute);
//  for static files
app.use(express.static(path.join(__dirname, 'public')));
app.use('/uploads', express.static('public/uploads'));


// seedSections();
// seedSimpleUsers();



app.get('/',(req,res)=>{
    res.redirect('/landing');
})

const PORT = process.env.PORT || 8080;

app.listen(PORT,()=>{
    console.log(`server started at port ${PORT}`)
})