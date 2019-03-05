const fs    = require('fs'),
      path  = require('path');

const Cart  = require('./cart')

const pth     = path.join(process.mainModule.filename,'..','data','product.json')


module.exports = class Product{
    constructor(id,title,imageUrl,price,discription){
        this.id = id,
        this.title=title,
        this.imageUrl=imageUrl,
        this.price=price,
        this.discription=discription
    }
    save(){
        fs.readFile(pth,(err,content)=>{
            if(err){
                console.log(err)
            }else{
                if(this.id){
                    console.log('editing a product')
                    var products = JSON.parse(content)
                    var exsistingProductIndex = products.findIndex(prod=> prod.id===parseFloat(this.id))
                    var exsistingProduct = this;
                    products[exsistingProductIndex]=exsistingProduct;
                    fs.writeFile(pth,JSON.stringify(products))
                }else{
                    console.log('adding a product')
                    this.id  = Math.random()
                    let data = JSON.parse(content);
                    data.push(this);
                    fs.writeFileSync(pth,JSON.stringify(data));
                }
            }
        })
    }
            // fs.readFile(pth,(err,data)=>{
            //     if(err){
            //         console.log(err)
            //     }else{
    
    //         }
                
    //             })
    //     }
        
    // }
    static delete(id){
        fs.readFile(pth,(err,content)=>{
            if(err){
                console.log(err)
            }else{
                var products = JSON.parse(content);
                var productIndex = products.findIndex(prod=> prod.id===parseFloat(id));
                var price = products[productIndex].price
                if(productIndex!==-1){
                    products.splice(productIndex);
                    fs.writeFile(pth,JSON.stringify(products),err=>{
                        if(!err){
                            console.log('removing element');
                            Cart.removeFromCart(id,price)
                        }
                    })
                }
            }
        })
    }
    static findById(id,cb){
        fs.readFile(pth,(err,content)=>{
            if(err){
                console.log(err)
            }else{
                if(!content){
                    cb({title:'NO SUCH ITEM'})
                }else{
                    var arr = JSON.parse(content);
                    var obj = arr.find(product=> product.id === parseFloat(id))
                    if(obj){
                        cb(obj)
                    }else{
                        cb({title:'no such item exsist'})
                    }
                }
            }
        })
    }

    static featchAll(){
        return JSON.parse(fs.readFileSync(pth))
    }
}