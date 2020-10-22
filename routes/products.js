const { Router } = require('express')
const Product = require('../models/Product')  // импортируем сюда модель Product
const router = Router()

router.get('/', async (req, res) => {
    // const products = await Product.find({})      НЕ РАБОЧЕЕ!
    const products = await Product.find({}).lean()  //выводим все объекты модели Product

    res.render('index',{
        title: "Products",
        isIndex: true,
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
    const product = new Product({               //создаем объект с названием product   модели Product

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