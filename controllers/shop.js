const Product = require('../models/product'),
      Cart    = require('../models/cart')



exports.getProduct = (req, res, next) => {
    var products = Product.featchAll()
    res.render('shop/index', {
      prods: products,
      pageTitle: 'Products',
      path: '/products'
    });
  }
  exports.getIndex=(req,res,next)=>{
    var products = Product.featchAll()
    res.render('shop/product-list',
    {pageTitle: 'index',
     path:'/',
     prods:products
    })
  }
  exports.getCart=(req,res,next)=>{
    Cart.getCart((cartlist)=>{
      res.render('shop/cart',{
        pageTitle: 'cart',
        path:'/cart',
        cartlist: cartlist
    })
    });
    
  }
  exports.postAddToCart=(req,res)=>{  
    Cart.addToCart(parseFloat(req.body.id),parseFloat(req.body.price))
    res.redirect('/')
  }
  
exports.getCheckout=(req,res,next)=>{
   res.render('shop/index',
  {pageTitle: 'checkout',
   path:'/checkout'
  })
}
exports.getProductDetails= (req,res)=>{
    Product.findById(req.params.productId,(product)=>{
        res.render('shop/product-details',{pageTitle:'product-detail',path:'/sdfsdf',product:product})
    })    
}
  exports.getOders = (req,res)=>{
      res.render('shop/oders',{pageTitle:'Oders',path:'/oders'})
  }