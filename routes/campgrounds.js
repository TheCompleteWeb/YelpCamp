var express= require('express');
var router = express.Router();
var Campground = require('../models/campground');
var middleware = require('../middleware');


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
router.post('/', middleware.isLoggedIn, function(req, res){
   var name = req.body.name;
   var image = req.body.image;
   var price = req.body.price;
   var desc = req.body.description;
   var author = {
       id: req.user._id,
       username : req.user.username
   }
   var newCampgound = {name:name, price:price, image:image, description: desc, author: author};
   console.log(req.user);
   
  /* campgrounds.push(newCampgound);*/
   //Create a new campground and save it into DB
   Campground.create(newCampgound, function(err, newlyCreated){
       if(err){
           req.flash("error", err.message);
       } else {
           //redirect back to campgrounds pagez
           console.log(newlyCreated);
           res.redirect("/campgrounds");
       }
   });
});

router.get('/new', middleware.isLoggedIn, function(req,res){
    res.render('campgrounds/new');
});

router.get('/:id', function(req,res){
    //find the campground with provided ID
    //
    Campground.findById(req.params.id).populate("comments").exec(function(err, foundCampground){
        if(err){
            req.flash("error", err.message);
        } else {
            console.log(foundCampground);
            res.render("campgrounds/show", {campground: foundCampground});
        }
    }); 
    
});

router.get('/:id/edit', middleware.checkCampgroundOwnership, function(req, res){
        
                Campground.findById(req.params.id, function(err, foundCampground){
                            
                            res.render("campgrounds/edit", {campground: foundCampground});
                            req.flash("error", "Campground not found!");
                });
});

router.put('/:id', middleware.checkCampgroundOwnership, function(req, res){
    var data = {name: req.body.name, image:req.body.image}
    Campground.findByIdAndUpdate(req.params.id, req.body.campground, function(err, updatedCampground){
        if(err){
            res.redirect('/campgrounds');
        } else {
            res.redirect('/campgrounds/'+ req.params.id);
        }
    });
});

router.delete('/:id', middleware.checkCampgroundOwnership, function(req, res){
    Campground.findByIdAndRemove(req.params.id, function(err){
        if(err){
            res.redirect("/campgrounds");
        } else {
            res.redirect("/campgrounds");
        }
    });
});

// function isLoggedIn(req, res, next){
//     if(req.isAuthenticated()){
//         return next();
//     }
//     res.redirect("/login")
// }

// function checkCampgroundOwnership(req, res, next){
//     if(req.isAuthenticated()){
//                 Campground.findById(req.params.id, function(err, foundCampground){
//                     if(err){
//                         res.redirect("back");
//                     } else {
//                         if(foundCampground.author.id.equals(req.user._id)){
//                             next();    
//                         } else {
//                             res.redirect('back');
//                         }
                        
//                     }
//                 });
//         } else {
//             console.log("You need to be logged in to do that");
//             res.redirect("back");
//         }
// }




// router.get('/', function(req, res){
    
//     Campground.find({}, function(err, allCampgrounds){
//         if(err){
//             console.log(err);
//         } else {
//             res.render("campgrounds/index", {campgrounds:allCampgrounds, currentUser: req.user});
//         }
//     });
//     /*res.render('campgrounds', {campgrounds: campgrounds});*/
// });
//create a new data to DB
// router.post('/', middleware.isLoggedIn, function(req, res){
//   var name = req.body.name;
//   var image = req.body.image;
//   var desc = req.body.description;
//   var author = {
//       id: req.user._id,
//       username : req.user.username
//   }
//   var newCampgound = {name:name, image:image, description: desc, author: author};
//   console.log(req.user);
   
//   /* campgrounds.push(newCampgound);*/
//   //Create a new campground and save it into DB
//   Campground.create(newCampgound, function(err, newlyCreated){
//       if(err){
//           req.flash("error", err.message);
//       } else {
//           //redirect back to campgrounds pagez
//           console.log(newlyCreated);
//           res.redirect("/campgrounds");
//       }
//   });
// });

// router.get('/new', middleware.isLoggedIn, function(req,res){
//     res.render('campgrounds/new');
// });

// router.get('/:id', function(req,res){
//     //find the campground with provided ID
//     //
//     Campground.findById(req.params.id).populate("comments").exec(function(err, foundCampground){
//         if(err){
//             req.flash("error", err.message);
//         } else {
//             console.log(foundCampground);
//             res.render("campgrounds/show", {campground: foundCampground});
//         }
//     }); 
    
// });

// router.get('/:id/edit', middleware.checkCampgroundOwnership, function(req, res){
        
//                 Campground.findById(req.params.id, function(err, foundCampground){
//                             // req.flash("error", "Campground not found!");
//                             res.render("campgrounds/edit", {campground: foundCampground});
//                 });
// });

// router.put('/:id', middleware.checkCampgroundOwnership, function(req, res){
//     var data = {name: req.body.name, image:req.body.image}
//     Campground.findByIdAndUpdate(req.params.id, req.body.campground, function(err, updatedCampground){
//         if(err){
//             res.redirect('/campgrounds');
//         } else {
//             res.redirect('/campgrounds/'+ req.params.id);
//         }
//     });
// });

// router.delete('/:id', middleware.checkCampgroundOwnership, function(req, res){
//     Campground.findByIdAndRemove(req.params.id, function(err){
//         if(err){
//             res.redirect("/campgrounds");
//         } else {
//             res.redirect("/campgrounds");
//         }
//     });
// });

// function isLoggedIn(req, res, next){
//     if(req.isAuthenticated()){
//         return next();
//     }
//     res.redirect("/login")
// }

// function checkCampgroundOwnership(req, res, next){
//     if(req.isAuthenticated()){
//                 Campground.findById(req.params.id, function(err, foundCampground){
//                     if(err){
//                         res.redirect("back");
//                     } else {
//                         if(foundCampground.author.id.equals(req.user._id)){
//                             next();    
//                         } else {
//                             res.redirect('back');
//                         }
                        
//                     }
//                 });
//         } else {
//             console.log("You need to be logged in to do that");
//             res.redirect("back");
//         }
// }

module.exports = router;