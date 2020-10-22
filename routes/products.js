const { Router } = require('express')
const Product = require('../models/Product')  // импортируем сюда модель Product
const router = Router()

router.get('/', async (req, res) => {
    let products = await Product.find({}).lean()  //выводим все объекты модели Product

    res.render('index',{
        title: "Products",
        isIndex: true,
        products
    })
})

router.get('/delete', async (req, res) => {
  let products = await Product.find({}).lean()  //выводим все объекты модели Product

  res.render('delete',{
      title: "Delete products",
      isDelete: true,
      products
  })
})

router.post('/delete', async (req, res) =>{
  await Product.findByIdAndDelete(req.body.id, function (err, docs) { 
    if (err){ 
        console.log(err) 
    } 
    else{
        console.log("Deleted : ", docs); 
    } 
})

  let products = await Product.find({}).lean()

  res.render('delete',{
    title: "Delete products",
    isDelete: true,
    products
})
})

router.get('/create', (req, res) => {
    res.render('create',{
        title: "Create product",
        isCreate: true
    })
}) 

router.post('/create', async (req, res) => {
    let product = new Product({               //создаем объект с названием product   модели Product

      // передаем свойствам модели Product введеные в инпутах формы данные
        name: req.body.name,            
        price: req.body.price,
        category: req.body.category,
        supplier: req.body.supplier,
    })
    await product.save()              // ждем сохранения нового объекта
    res.redirect('/')
})



  module.exports = router