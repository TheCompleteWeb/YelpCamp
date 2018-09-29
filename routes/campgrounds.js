var express= require('express');
var router = express.Router();
var Campground = require('../models/campground');


router.get('/', function(req, res){
    
    Campground.find({}, function(err, allCampgrounds){
        if(err){
            console.log(err);
        } else {
            res.render("campgrounds/index", {campgrounds:allCampgrounds, currentUser: req.user});
        }
    });
    /*res.render('campgrounds', {campgrounds: campgrounds});*/
});
//create a new data to DB
router.post('/', isLoggedIn, function(req, res){
   var name = req.body.name;
   var image = req.body.image;
   var desc = req.body.description;
   var author = {
       id: req.user._id,
       username : req.user.username
   }
   var newCampgound = {name:name, image:image, description: desc, author: author};
   console.log(req.user);
   
  /* campgrounds.push(newCampgound);*/
   //Create a new campground and save it into DB
   Campground.create(newCampgound, function(err, newlyCreated){
       if(err){
           console.log(err);
       } else {
           //redirect back to campgrounds pagez
           console.log(newlyCreated);
           res.redirect("/campgrounds");
       }
   });
});

router.get('/new', isLoggedIn, function(req,res){
    res.render('campgrounds/new');
});

router.get('/:id', function(req,res){
    //find the campground with provided ID
    //
    Campground.findById(req.params.id).populate("comments").exec(function(err, foundCampground){
        if(err){
            console.log(err);
        } else {
            console.log(foundCampground);
            res.render("campgrounds/show", {campground: foundCampground});
        }
    });
    
});

function isLoggedIn(req, res, next){
    if(req.isAuthenticated()){
        return next();
    }
    res.redirect("/login")
}

module.exports = router;