const { Router } = require('express')
const Product = require('../models/Product')  // импортируем сюда модель Product
const router = Router()

//____________________________ ГЛАВНАЯ _______________________________________________
router.get('/', async (req, res) => {
    const products = await Product.find({}).lean()  //выводим все объекты модели Product
    res.render('index',{
        title: "Products",
        isIndex: true,
        products
    })
})

//________________________ СТРАНИЦА УДАЛЕНИЯ ПРОДУКТА _______________________
router.get('/delete', async (req, res) => {
  const products = await Product.find({}).lean()  //выводим все объекты модели Product
  res.render('delete',{
      title: "Delete products",
      isDelete: true,
      products
  })
})

//________________________ ДЕЙСТВИЕ - УДАЛЕНИЕ ПРОДУКТА _______________________
router.post('/delete', async (req, res) =>{
  await Product.findByIdAndDelete(req.body.id, function (err, docs) { 
    if (err){ 
        console.log(err) 
    } 
    else{ 
        console.log("Deleted : ", docs); 
    } 
})
  const products = await Product.find({}).lean()
  res.render('delete',{
    title: "Delete products",
    isDelete: true,
    products
})
})

//________________________ СТРАНИЦА СОЗДАНИЯ ОДНОГО ПРОДУКТА _______________________
router.get('/create', (req, res) => {
  res.render('create',{
      title: "Create product",
      isCreate: true
  })
})

//________________________ ДЕЙСТВИЕ - СОЗДАНИЕ ОДНОГО ПРОДУКТА _______________________
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

//__________________________ СТРАНИЦА СПИСОК ПРОДУКТОВ (ДЛЯ ИЗМЕНЕНИЯ) ________________________
router.get('/updateList', async (req, res) =>{
  const products = await Product.find({}).lean()

  res.render('updateList', {
    title: "Update list",
    isUpdate: true,
    products
  })
})

//_______________________ ДЕЙСТВИЕ - ВЫБОР ПРОДУКТА (ДЛЯ ИЗМЕНЕНИЯ) _____________________
router.post('/updateList', async (req, res) =>{
  const product = await Product.findById(req.body.id, function (err, docs) { 
    if (err){ 
        console.log(err) 
    } 
    else{ 
        console.log("Choose : ", docs); 
    }
  })
  res.render('update', {
    title: "Update product",
    isUpdate: false,
    id: product.id,
    name: product.name,
    price: product.price,
    category: product.category,
    supplier: product.supplier
  })
})

//______________________________ДЕЙСТВИЕ - ИЗМЕНЕНИЕ ПРОДУКТА ______________________
router.post('/update', async (req, res) => {
  let product = await Product.findByIdAndUpdate(req.body.id, {
    name: req.body.name,
    price: req.body.price,
    category: req.body.category,
    supplier: req.body.supplier,
  }, function (err, docs) { 
    if (err){ 
        console.log(err) 
    } 
    else{ 
        console.log("Update : ", docs);
    }
  })
product.save()
const products = Product.find({}).lean()
res.redirect('/')
})

  module.exports = router