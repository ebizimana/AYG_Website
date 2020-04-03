// PACKAGE INSTALLATION
var express                 = require("express"),
    dotenv                  = require("dotenv"),
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
    User        = require("./models/user"),
    Category    = require("./models/category")

// ROUTER SETUP
var classRouter       = require("./routes/class"),
    indexRouter       = require("./routes/index"),
    categoryRouter    = require("./routes/category"),
    assignmentRouter  = require("./routes/assignment");
    
//APP SETUP
app.use(flash())
app.set("view engine","ejs")
app.use(methodOverride("_method"))
app.use(express.static(__dirname + "/public"))
app.use(bodyParser.urlencoded({extended:true}))
dotenv.config()
url = process.env.DATABASEURL || "mongodb://localhost/ayg";
mongoose.connect(url,{useNewUrlParser:true, useFindAndModify:false})


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
app.use("/users/:user_id/classes", classRouter),
app.use("/users/:user_id/classes/:class_id/categories", categoryRouter),
app.use("/users/:user_id/classes/:class_id/assignments", assignmentRouter),

app.listen(process.env.PORT || 5000,() => console.log("Server Running on port 5000"))



