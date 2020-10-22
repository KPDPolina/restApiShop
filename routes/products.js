const { Router } = require('express')
const Product = require('../models/Product')  // импортируем сюда модель Product
const router = Router()

router.get('/', async (req, res) => {
    const products = await Product.find({})    //выводим все объекты модели Product

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
  
        title: req.body.title,            // передаем свойствам модели Product введеные в инпутах формы данные
        //// price: req.body.priceP,
        //// category: req.body.categoryP,
        //// supplier: req.body.supplierP,
    })
    await product.save()              // ждем сохранения нового объекта
    res.redirect('/')
  })

  module.exports = router