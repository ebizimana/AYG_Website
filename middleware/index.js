// TODO: Make this middleware work for classes routes
var middlewareObj  = {}

middlewareObj.isLoggedIn = function(req, res, next) {
    if (req.isAuthenticated()) {
      return next()
    }
    req.flash("error","You need to be logged in to that")
    res.redirect("/")
  }

module.exports = middlewareObj;

