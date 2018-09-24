var express = require('express'),
    bodyParser = require('body-parser'),
    app = express(),
    mongoose = require('mongoose'),
    Campground = require("./models/campground"),
    Comment = require("./models/comment"),
    // User = require("./models/user")
    
    seedDB = require("./seeds");
    
    
    
seedDB();

mongoose.connect('mongodb://localhost/yelp_camp');

app.use(bodyParser.urlencoded({extended: true}));

app.set('view engine', 'ejs');
app.use(express.static(__dirname + "/public"));
console.log(__dirname);



app.get('/', function(req, res){
   res.render('landing');
});
//get a data from DB
app.get('/campgrounds', function(req, res){
    Campground.find({}, function(err, allCampgrounds){
        if(err){
            console.log(err);
        } else {
            res.render("campgrounds/index", {campgrounds:allCampgrounds});
        }
    });
    /*res.render('campgrounds', {campgrounds: campgrounds});*/
});
//create a new data to DB
app.post('/campgrounds', function(req, res){
   var name = req.body.name;
   var image = req.body.image;
   var desc = req.body.description;
   var newCampgound = {name:name, image:image, description: desc};
  /* campgrounds.push(newCampgound);*/
   //Create a new campground and save it into DB
   Campground.create(newCampgound, function(err, newlyCreated){
       if(err){
           console.log(err);
       } else {
           //redirect back to campgrounds page
           res.redirect("/campgrounds");
       }
   });
});

app.get('/campgrounds/new', function(req,res){
    res.render('campgrounds/new');
});

app.get('/campgrounds/:id', function(req,res){
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

app.get("/campgrounds/:id/comments/new", function(req, res){
    Campground.findById(req.params.id, function(err, campground){
        if(err){
            console.log(err);
        } else {
            res.render("comments/new", {campground: campground});
        }
    });
    
});

app.post("/campgrounds/:id/comments", function(req, res){
    Campground.findById(req.params.id, function(err, campground){
        if(err){
            console.log(err);
            redirect("/campgrounds");
        } else {
            
            Comment.create(req.body.comment, function(err, comment){
                    if(err){
                        console.log(err);
                    } else {
                        campground.comments.push(comment);
                        campground.save();
                        res.redirect("/campgrounds/" + campground._id);
                    }
            }); 
        }
    });
});

app.listen(process.env.PORT, process.env.IP, function(){
    console.log('Yelp camp server has started!')
});