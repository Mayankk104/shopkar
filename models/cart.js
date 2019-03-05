const fs    = require('fs');
      path  = require('path');

const Product = require('./product');

const pth = path.join(process.mainModule.filename,'..','data','cart.json')


module.exports = class Cart{
    static addToCart(id,productPrice){
        fs.readFile(pth,(err,content)=>{
            // var cart={products:[],totalPrice:0}
            if(!err){
                var cart= JSON.parse(content)
            }

            var exsistingProductIndex=cart.products.findIndex(prods => prods.id===id)
            if(exsistingProductIndex===-1){
                var updatedProduct ={id:id, qty:1};
                cart.products.push(updatedProduct)
                cart.totalPrice= cart.totalPrice+productPrice
            }else{
                    var exsistingProduct = cart.products.find(prods => prods.id===id)
                    updatedProduct = {...exsistingProduct};
                    updatedProduct.qty= updatedProduct.qty+1;
                    cart.products[exsistingProductIndex]=updatedProduct;
                    cart.totalPrice=cart.totalPrice+ +productPrice;
                }
                fs.writeFileSync(pth,JSON.stringify(cart))   
            }
        )
    }

    static removeFromCart(id,price){
        fs.readFile(pth,(err,content)=>{
            if(err){
                return;
            }else{
                var cart = {...JSON.parse(content)};
                var product = cart.products.find(prod=>prod.id===+id);
                var productPrice = product.qty*price;
                cart.totalPrice= cart.totalPrice - productPrice;
                cart.products = cart.products.filter(prod=> prod.id!==+id);
                fs.writeFileSync(pth,JSON.stringify(cart))
            }
        })
    }

    static getCart(cb){
        fs.readFile(pth,(err,content)=>{
            if(err){
                cb([]);
            }else{
                var cart= JSON.parse(content);
                if(cart.products.length===0){
                    cb([]);
                }else{
                    var cartList= [];
                    cart.products.forEach((prod)=>{
                        Product.findById(prod.id,(pro)=>{
                            cartList.push(pro)
                        })
                    })
                     cb(cartList);
                }
            }
        })
    }
}
