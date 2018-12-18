// PACKAGE INSTALLATION
var express                 = require("express"),
    mongoose                = require("mongoose"),
    passport                = require("passport"),
    bodyParser              = require("body-parser"),
    flash                   = require("connect-flash"),
    passportLocal           = require("passport-local"),
    methodOverride          = require("method-override"),
    expressSession          = require("express-session"),
    passportLocalMongoose   = require("passport-local-mongoose"),
    app                     = express();



//MODEL SETUP
var Assignment  = require("./models/assignment"),
    Class       = require("./models/class"),
    User        = require("./models/user"),
    SeedDB      = require("./seed")
    url         = "mongodb://localhost/ayg";

// ROUTER SETUP
var assignmentRouter  = require("./routes/assignment"),
    classRouter       = require("./routes/class"),
    indexRouter       = require("./routes/index");

//APP SETUP
app.use(flash())
app.set("view engine","ejs")
app.use(methodOverride("_method"))
app.use(express.static(__dirname + "/public"))
app.use(bodyParser.urlencoded({extended:true}))
mongoose.connect(url,{useNewUrlParser:true})
SeedDB();

//PASSPORT SETUP
app.use(expressSession({
  secret:"Elie Bizimana",
  resave:false,
  saveUninitialized:false
}))
app.use(passport.initialize())
app.use(passport.session())
passport.use(new passportLocal(User.authenticate()))
passport.serializeUser(User.serializeUser())
passport.deserializeUser(User.deserializeUser())

//ROUTER CONFIG
app.use(function(req, res, next){
  res.locals.currentUser = req.user;
  res.locals.error       = req.flash("error");
  res.locals.success     = req.flash("success");
  next();
})
app.use(indexRouter)
app.use("/classes", classRouter),
// app.use("/classes/:id/assignments", assignmentRouter)

app.listen(3000,function(req,res){
  console.log("Server Running....");
})
