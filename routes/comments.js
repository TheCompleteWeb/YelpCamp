var express= require('express');
var router = express.Router({mergeParams: true});
var Campground = require('../models/campground');
var Comment = require('../models/comment');
var middleware = require('../middleware');

// function isLoggedIn(req, res, next){
//     if(req.isAuthenticated()){
//         return next();
//     }
//     res.redirect("/login")
// }


router.get("/new", middleware.isLoggedIn, function(req, res){
    Campground.findById(req.params.id, function(err, campground){
        if(err){
            console.log(err);
        } else {
            res.render("comments/new", {campground: campground});
        }
    });
    
});

router.post("/", middleware.isLoggedIn, function(req, res){
    Campground.findById(req.params.id, function(err, campground){
        if(err){
            console.log(err);
            res.redirect("/campgrounds");
        } else {
            
            Comment.create(req.body.comment, function(err, comment){
                    if(err){
                        req.flash("error", "Something went wrong!");
                        console.log(err);
                    } else {
                        //add username and id to comment and save comment
                        console.log("New username ."+req.user.username);
                        comment.author.id = req.user._id;
                        comment.author.username = req.user.username;
                        comment.save();
                        campground.comments.push(comment);
                        campground.save();
                        console.log(comment);
                        
                        res.redirect("/campgrounds/" + campground._id);
                        req.flash("success", "Successfully added comment");
                    }
            }); 
        }
    });
});

router.get('/:comment_id/edit', middleware.checkCommentsOwnership, function(req,res){
    Comment.findById(req.params.comment_id, function(err, foundComment){
        if(err){
            
            res.redirect('back');
            req.flash("error", "comment not fount");
        } else {
            
            res.render('comments/edit', {campground_id: req.params.id, comment: foundComment});
            req.flash("success", "comment fount");
        }
    });
    
});

router.put('/:comment_id', middleware.checkCommentsOwnership, function(req, res){
    Comment.findByIdAndUpdate(req.params.comment_id, req.body.comment, function(err, updatedComment){
        if(err){
            res.redirect('back');
        } else {
            res.redirect('/campgrounds/'+ req.params.id);
        }
    });
});

router.delete("/:comment_id", middleware.checkCommentsOwnership, function(req, res){
    Comment.findByIdAndRemove(req.params.comment_id, function(err){
        if(err){
            res.redirect("back");
        } else {
            
            res.redirect("/campgrounds/" + req.params.id);
            req.flash("success","Comment deleted");
        }
    });
});


// function checkCommentsOwnership(req, res, next){
//     if(req.isAuthenticated()){
//                 Comment.findById(req.params.comment_id, function(err, foundComment){
//                     if(err){
//                         res.redirect("back");
//                     } else {
//                         if(foundComment.author.id.equals(req.user._id)){
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