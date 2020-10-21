let express = require("express");
let app = express();

let artists = [
    {
        id: 1,
        name: "one",
    },
    {
        id: 2,
        name: "two",
    },
    {
        id: 3,
        name: "three",
    },
]

app.get('/', function(req, res) {
    res.send('Hello API');
})
app.get('/artists', function(req, res) {
    res.send(artists);
})
app.get('/artists/:id', function(req, res) {
    console.log(req.params);
    let artist
    res.send('tttttt');
})



app.listen(3012, function(){
    console.log('3012 app started');
})