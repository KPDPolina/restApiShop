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


//________________________ СТРАНИЦА СПИСОК ИЗМЕНЕНИЯ ПРОДУКТОВ _______________________
router.get('/updateList', async (req, res) => {
  const products = await Product.find({}).lean()  //выводим все объекты модели Product

  res.render('updateList',{
      title: "Update products",
      isUpdate: true,
      products
  })
})


//________________________ ДЕЙСТВИЕ - ВЫБОР ПРОДУКТА ИЗ СПИСКА ИЗМЕНЕНИЯ ПРОДУКТОВ _______________________
router.post('/updateList', async (req, res) => {
  const product = await Product.findById(req.body.id, function (err, docs) { 
    if (err){ 
        console.log(err); 
    } 
    else{ 
        console.log("Result : ", docs); 
    }
  })
console.log(product)
  res.render('update',{
      title: "Update product",
      isUpdate: false,
      product
  })
})


//________________________ СТРАНИЦА ИЗМЕНЕНИЯ ОДНОГО ПРОДУКТА _______________________
router.get('/update', async (req, res) => {
  const products = await Product.find({}).lean()  //выводим все объекты модели Product

  res.render('update',{
      title: "Update products",
      isUpdate: true,
      products
  })
})

//________________________ ДЕЙСТВИЕ - ИЗМЕНЕНИЕ ОДНОГО ПРОДУКТА ________!!!!!!________
router.post('/update', async (req, res) =>{
//   await Product.findByIdAndDelete(req.body.id, function (err, docs) { 
//     if (err){ 
//         console.log(err) 
//     } 
//     else{ 
//         console.log("Update : ", docs); 
//     } 
// })
  const products = await Product.find({}).lean()
  res.render('index',{
    title: "Products",
    isIndex: true,
    products
})
})

//________________________ СТРАНИЦА УДАЛЕНИЯ ОДНОГО ПРОДУКТА _______________________
router.get('/delete', async (req, res) => {
  const products = await Product.find({}).lean()  //выводим все объекты модели Product
  res.render('delete',{
      title: "Delete products",
      isDelete: true,
      products
  })
})

//________________________ ДЕЙСТВИЕ - УДАЛЕНИЕ ОДНОГО ПРОДУКТА _______________________
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

  module.exports = router