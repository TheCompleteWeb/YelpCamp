var mongoose = require("mongoose")

var Campground = require("./models/campground");
var Comment  = require("./models/comment");


var data = [
        {
         name: "Cloud's rest",
         image : "https://images.pexels.com/photos/803226/pexels-photo-803226.jpeg",
         description:"Great scenary in the middle American continent"
        }
        ,
        {
         name: "Mount Everst",
         image : "https://images.pexels.com/photos/259804/pexels-photo-259804.jpeg",
         description:"Great scenary in Colorado River"
        }
        ,
        {
         name: "Tree walk",
         image : "https://images.pexels.com/photos/388303/pexels-photo-388303.jpeg",
         description:"Great rainforest in Georgia and South Carolina"
        }
        
    ]

function seedDB(){
        Campground.remove({}, function(err){
            if(err){
                console.log(err);
            } 
            console.log("removed campgrounds!");
            data.forEach(function(seed){
            Campground.create(seed, function(err,campground){
                if(err){
                    console.log(err)
                } else {
                    console.log("Added a campground");
                    Comment.create(
                        {
                            text: "This place is great, but I wish there was the Internet",
                            author:"Homer"
                        },function(err, comment){
                            if(err){
                                console.log(err);
                            } else {
                                campground.comments.push(comment);
                                campground.save();
                                console.log("Created a new comment!")
                            }
                                
                            });
                    }
                });
            });    
            
        });
        
}

module.exports = seedDB;