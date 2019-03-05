const Product = require('../models/product'),
      Cart    = require('../models/cart')

exports.getAddProduct= (req, res, next) => {
    res.render('admin/edit-product', {
      pageTitle: 'Add Product',
      path: '/admin/add-product',
      editing: false
    });
  }
exports.postAddProduct = (req, res, next) => {
    const title= req.body.title;
    const imageUrl= req.body.imageUrl;
    const price= +req.body.price;
    const discription= req.body.discription;
    var product = new Product(null,title,imageUrl,price,discription)
    product.save();
    res.redirect('/');
  }
  
exports.postDeleteProduct = (req,res)=>{
  Product.delete(req.body.id);
  res.redirect('/')

}
exports.getEditProduct = (req,res)=>{
  Product.findById(req.params.productId,product=>{
    if(!product){
      return redirect('/')
    }
  res.render('admin/edit-product',{pageTitle:'Edit',product:product,path:'admin/edit-product',editing:true})
  })
}

exports.postEditProduct= (req,res)=>{
  var id=+req.body.id;
  var title=req.body.title;
  var imageUrl=req.body.imageUrl
  var price=+req.body.price;
  var discription=req.body.discription;
  var product = new Product(id,title,imageUrl,price,discription);
  console.log(product)
  product.save();
  res.redirect('/');
}
  exports.getProduct = (req,res,next)=>{
      var product= Product.featchAll()
      res.render('admin/products',{pageTitle:'Admin Product',path:"/admin/product",prods:product})
  }

  