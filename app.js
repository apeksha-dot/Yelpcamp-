var express = require("express");
var app = express();
var bodyParser = require("body-parser");
var mongoose = require("mongoose");
var passport = require("passport");
var LocalStrategy = require("passport-local");
var methodOverride = require("method-override");
var Campground = require("./models/campground");
var Comment = require("./models/comment");
var User = require("./models/user");
var seedDB = require("./seeds");

var commentRoutes = require("./routes/comments"),
    campgroundRoutes = require("./routes/campgrounds"),
    indexRoutes = require("./routes/index")
// seedDB();
mongoose.connect("mongodb+srv://NHExoN4SE9R0LF6B:<password>@cluster0-vhdak.mongodb.net/test?retryWrites=true&w=majority").then(() =>{
    console.log('connected');
}).catch(err =>{
    console.log('Eroorororororororor')
    console.log(err)
});




app.use(bodyParser.urlencoded({extended:true}));

app.set("view engine", "ejs");
app.use(express.static(__dirname + "/public"));
app.use(methodOverride("_method"));

//PASSPORT CONFIGURATION
app.use(require("express-session")({
  secret: "Rusty is cute ",
  resave: false,
  saveUninitialized: false
}));

app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use(function(req,res, next){
    res.locals.currentUser = req.user;
    next();
})

app.use("/campgrounds/:id/comments/" , commentRoutes);
app.use("/campgrounds" , campgroundRoutes);
app.use("/" ,indexRoutes);



app.listen(process.env.PORT || 3000, function(req,res){
   
    console.log("Server has started!!");
});
