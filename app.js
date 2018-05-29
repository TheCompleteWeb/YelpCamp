var express = require('express'),
    bodyParser = require('body-parser'),
    app = express(),
    mongoose = require('mongoose');
    
mongoose.connect('mongodb://localhost/yelp_camp');

app.use(bodyParser.urlencoded({extended: true}));

app.set('view engine', 'ejs');

//schema setup
var campgroundSchema = new mongoose.Schema({
    name: String,
    image: String,
    description: String
});

var Campground = mongoose.model('Campground', campgroundSchema);

/*Campground.create({name:'Granite Hill', 
                    image:'https://pixabay.com/get/ea36b70928f21c22d2524518b7444795ea76e5d004b0144392f3c87da1e8b3_340.jpg', 
                    description: "This is a huge mountain area, no bathroom, no water"}, 
                    function(err, campground) {
                        if(err) {
                            console.log(err);
                        } else {
                            console.log('newly created campground');
                            console.log(campground);
                        }
});*/

/*var campgrounds = [
        {name:'Salmon Creek', image:'https://pixabay.com/get/ea31b10929f7063ed1584d05fb1d4e97e07ee3d21cac104497f7c270a3ebb0be_340.jpg'},
        {name:'Granite Hill', image:'https://pixabay.com/get/ea36b70928f21c22d2524518b7444795ea76e5d004b0144392f3c87da1e8b3_340.jpg'},
        {name:'Mountain Goat Rest', image:'https://pixabay.com/get/ea36b40a2efd083ed1584d05fb1d4e97e07ee3d21cac104497f7c270a3ebb0be_340.jpg'},
        {name:'Salmon Creek', image:'https://pixabay.com/get/ea31b10929f7063ed1584d05fb1d4e97e07ee3d21cac104497f7c270a3ebb0be_340.jpg'},
        {name:'Granite Hill', image:'https://pixabay.com/get/ea36b70928f21c22d2524518b7444795ea76e5d004b0144392f3c87da1e8b3_340.jpg'},
        {name:'Mountain Goat Rest', image:'https://pixabay.com/get/ea36b40a2efd083ed1584d05fb1d4e97e07ee3d21cac104497f7c270a3ebb0be_340.jpg'},
        {name:'Salmon Creek', image:'https://pixabay.com/get/ea31b10929f7063ed1584d05fb1d4e97e07ee3d21cac104497f7c270a3ebb0be_340.jpg'},
        {name:'Granite Hill', image:'https://pixabay.com/get/ea36b70928f21c22d2524518b7444795ea76e5d004b0144392f3c87da1e8b3_340.jpg'},
        {name:'Mountain Goat Rest', image:'https://pixabay.com/get/ea36b40a2efd083ed1584d05fb1d4e97e07ee3d21cac104497f7c270a3ebb0be_340.jpg'}
    ];*/

app.get('/', function(req, res){
   res.render('landing');
});
//get a data from DB
app.get('/campgrounds', function(req, res){
    Campground.find({}, function(err, allCampgrounds){
        if(err){
            console.log(err);
        } else {
            res.render("index", {campgrounds:allCampgrounds});
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
    res.render('new.ejs');
});

app.get('/campgrounds/:id', function(req,res){
    //find the campground with provided ID
    //
    Campground.findById(req.params.id, function(err, foundCampground){
        if(err){
            console.log(err);
        } else {
            res.render("show", {campground: foundCampground});
        }
    });
    
});

app.listen(process.env.PORT, process.env.IP, function(){
    console.log('Yelp camp server has started!')
});