let express = require("express");
let bodyParser = require('body-parser');
let MongoClient = require('mongodb').MongoClient;

let app = express();
let db ;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


let products = [
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
app.get('/products', function(req, res) {
    res.send(products);
})
app.get('/products/:id', function(req, res) {
    console.log(req.params);
    let product = products.find(function(product){
        return product.id === Number(req.params.id)
    });
    if(product == null){res.send("Not find")}
    res.send(product);
})

app.post('/products', function (req, res) {
    let product ={ 
        id: Date.now(),
        name: req.body.name
    };
    products.push(product);
    res.send(product);
})

app.put('/products/:id', function (req, res) {
    let product = products.find(function(product){
        return product.id === Number(req.params.id)
    });
    product.name = req.body.name;
    res.sendStatus(200);
})

app.delete('/products/:id', function (req, res) {
    products = products.filter(function (product) {
        return product.id !== Number(req.params.id);
    });
    res.sendStatus(200);
})

MongoClient.connect('mongodb://localhost:27017/apiShop', function (err, database) {
    if(err){
        return console.log(err);
    }
    db = database;
    app.listen(3012, function(){
    console.log('3012 app started');
})    
})

