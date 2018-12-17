// PACKAGE INSTALLATION
var express                 = require("express"),
    mongoose                = require("mongoose"),
    passport                = require("passport"),
    bodyParser              = require("body-parser"),
    flash                   = require("connect-flash"),
    passportLocal           = require("passport-local"),
    passportLocal           = require("passport-local"),
    methodOverride          = require("method-override"),
    expressSession          = require("express-session"),
    passportLocalMongoose   = require("passport-local-mongoose"),
    app                     = express();

//MODEL SETUP
var Assignment  = require("./models/assignment"),
    Class       = require("./models/class"),
    User        = require("./models/user"),
    url         = "mongoosedb://localhost/ayg";

// ROUTER SETUP
var assignmentRouter  = require("./router/assignment"),
    classRouter       = require("./router/class"),
    indexRouter       = require("./router/index");

//APP SETUP
app.use(flash())
app.set("view engine","ejs")
app.use(methodOverride("_method"))
app.use(express.static(__dirmane + "public"))
app.use(bodyParser.urlencoded({extend:true}))
mongoose.connect(url,{useNewUrlParser:true})

//PASSPORT SETUP
app.use(expressSession({
  secret:"Elie Bizimana",
  resave:false,
  saveUninitialized:false
}))
app.use(passport.initialize())
app.use(passport.session())
app.use(new passportLocal(User.autheticate()))
passport.serializeUser(User.serializedUser())
passport.deserializeUser(User.deserializedUser())

//ROUTER CONFIG
app.use(function(req,res,next){
  res.locals.currentUser = req.user;
  res.locals.error       = req.flash("error"),
  res.locals.success     = req.flash("success")
  next();
})
app.use(indexRouter)
app.use("/classes", classRouter),
app.use("/classes/:id/assignments", assignmentRouter)

app.listen(3000,function(req,res){
  console.log("Server Running....");
})
