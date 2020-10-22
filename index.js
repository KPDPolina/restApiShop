require('dotenv').config();
const express = require("express")
const mongoose = require("mongoose")
const exphbs = require("express-handlebars")
const productRoutes = require('./routes/products')

const PORT = 3000 //process.env.PORT || 3000
const DB_CONN = process.env.DB_CONN

const app = express();
const hbs = exphbs.create({
    defaultLayout: 'main',
    extname: 'hbs'
})

app.engine('hbs', hbs.engine)
app.set('view engine', 'hbs')
app.set('views', 'views')

app.use(express.urlencoded({ extended: true }))
// app.use(express.static(path.join(__dirname, 'public')))

app.use(productRoutes)

async function start() {
    try{
        await mongoose.connect(DB_CONN,{
            useNewUrlParser: true,
            useFindAndModify: false
        })
        app.listen(PORT, ()=>{
            console.log("Server started...");
        })
    }catch (e) {
        console.log(e)
    }
}


start()




















// let bodyParser = require('body-parser');
// const MongoClient = require("mongodb").MongoClient;

// let app = express();
// let db ;

// app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({ extended: true }));


// let products = [
//     {
//         id: 1,
//         name: "one",
//     },
//     {
//         id: 2,
//         name: "two",
//     },
//     {
//         id: 3,
//         name: "three",
//     },
// ]

// app.get('/', function(req, res) {
//     res.send('Hello API');
// })
// app.get('/products', function(req, res) {
//     res.send(products);
// })
// app.get('/products/:id', function(req, res) {
//     console.log(req.params);
//     let product = products.find(function(product){
//         return product.id === Number(req.params.id)
//     });
//     if(product == null){res.send("Not find")}
//     res.send(product);
// })

// app.post('/products', function (req, res) {
//     let product ={ 
//         name: req.body.name
//     };

//     db.collection('products').insert(product, function(err, result) {
//         if(err){
//             console.log(err);
//             return res.sendStatus(500);
//         }
//         res.send(product);
//     })

//     products.push(product);
//     res.send(product);
// })

// app.put('/products/:id', function (req, res) {
//     let product = products.find(function(product){
//         return product.id === Number(req.params.id)
//     });
//     product.name = req.body.name;
//     res.sendStatus(200);
// })

// app.delete('/products/:id', function (req, res) {
//     products = products.filter(function (product) {
//         return product.id !== Number(req.params.id);
//     });
//     res.sendStatus(200);
// })

// // MongoClient.connect('mongodb://localhost/apiShop', function (err, database) {
// //   if (err) {
// //     return console.log(err)
// //   }
// //   db = database.db('apiShop');

// //   app.listen(3012, function () {
// //     console.log('API app start')
// //   })
// // })

// // создаем объект MongoClient и передаем ему строку подключения
// const mongoClient = new MongoClient("mongodb://localhost:27017/", { useNewUrlParser: true });

// mongoClient.connect(function(err, client){
 
//     const db = client.db("apiShop");
//     const collection = db.collection("products");
//     let user = {name: "Monitor"};
//     collection.insertOne(user, function(err, result){
          
//         if(err){ 
//             return console.log(err);
//         }
//         app.listen(3012, function () {
//             console.log('API app start')
//         })
//         console.log(result.ops);
//         client.close();
// });
// })

