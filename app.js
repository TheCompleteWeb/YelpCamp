var express = require('express');
var app = express();


app.set('view engine', 'ejs');


app.get('/', function(req, res){
   res.render('landing');
});

app.get('/campgrounds', function(req, res){
    var campgrounds = [
        {name:'Salmon Creek', image:'https://pixabay.com/get/ea31b10929f7063ed1584d05fb1d4e97e07ee3d21cac104497f7c270a3ebb0be_340.jpg'},
        {name:'Granite Hill', image:'https://pixabay.com/get/ea36b70928f21c22d2524518b7444795ea76e5d004b0144392f3c87da1e8b3_340.jpg'},
        {name:'Mountain Goat Rest', image:'https://pixabay.com/get/ea36b40a2efd083ed1584d05fb1d4e97e07ee3d21cac104497f7c270a3ebb0be_340.jpg'}
    ]
    res.render('campgrounds', {campgrounds: campgrounds});
});


app.listen(process.env.PORT, process.env.IP, function(){
    console.log('Yelp camp server has started!')
});