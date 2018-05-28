var express = require('express');
var bodyParser = require('body-parser');
var app = express();


    
app.use(bodyParser.urlencoded({extended: true}));

app.set('view engine', 'ejs');

var campgrounds = [
        {name:'Salmon Creek', image:'https://pixabay.com/get/ea31b10929f7063ed1584d05fb1d4e97e07ee3d21cac104497f7c270a3ebb0be_340.jpg'},
        {name:'Granite Hill', image:'https://pixabay.com/get/ea36b70928f21c22d2524518b7444795ea76e5d004b0144392f3c87da1e8b3_340.jpg'},
        {name:'Mountain Goat Rest', image:'https://pixabay.com/get/ea36b40a2efd083ed1584d05fb1d4e97e07ee3d21cac104497f7c270a3ebb0be_340.jpg'},
        {name:'Salmon Creek', image:'https://pixabay.com/get/ea31b10929f7063ed1584d05fb1d4e97e07ee3d21cac104497f7c270a3ebb0be_340.jpg'},
        {name:'Granite Hill', image:'https://pixabay.com/get/ea36b70928f21c22d2524518b7444795ea76e5d004b0144392f3c87da1e8b3_340.jpg'},
        {name:'Mountain Goat Rest', image:'https://pixabay.com/get/ea36b40a2efd083ed1584d05fb1d4e97e07ee3d21cac104497f7c270a3ebb0be_340.jpg'},
        {name:'Salmon Creek', image:'https://pixabay.com/get/ea31b10929f7063ed1584d05fb1d4e97e07ee3d21cac104497f7c270a3ebb0be_340.jpg'},
        {name:'Granite Hill', image:'https://pixabay.com/get/ea36b70928f21c22d2524518b7444795ea76e5d004b0144392f3c87da1e8b3_340.jpg'},
        {name:'Mountain Goat Rest', image:'https://pixabay.com/get/ea36b40a2efd083ed1584d05fb1d4e97e07ee3d21cac104497f7c270a3ebb0be_340.jpg'}
    ];

app.get('/', function(req, res){
   res.render('landing');
});

app.get('/campgrounds', function(req, res){
    
    res.render('campgrounds', {campgrounds: campgrounds});
});

app.post('/campgrounds', function(req, res){
   var name = req.body.name;
   var image = req.body.image;
   var newCampgound = {name:name, image:image}
   campgrounds.push(newCampgound);
   res.redirect('/campgrounds');
   
});

app.get('/campgrounds/new', function(req,res){
    res.render('new.ejs');
});


app.listen(process.env.PORT, process.env.IP, function(){
    console.log('Yelp camp server has started!')
});