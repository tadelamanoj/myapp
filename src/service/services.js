const dbLayer = require('../model/cartoperations');

let user={}

user.addToCart = async( userId,productId)=>{
    let data = await dbLayer.putToCart(userId,productId)
    if(data)
        return "Product Added to Cart"
}

user.viewCart = async (userId)=>{
    let data = await dbLayer.getCart(userId);
    if(data)
        return data
    else{
        let err = new Error(" No item in cart")
        err.status = 404
        throw err
    }
}

user.orderCart = async ( userId )=>{
    let data = await dbLayer.orderCart(userId);
    if(data)
        return data
    else{
        let err = new Error("No item in cart")
        err.status=404
        throw err
    }
}

user.pullCart = async ( emailId)=>{
    let data = await dbLayer.checkOutcart(emailId)
    if(data)
        return data
    else{
        let err = new Error("No items")
        err.status=404
        throw err
    }
}

user.delCart = async(emailId,prodId)=>{
    let data = await dbLayer.removeItem(emailId,prodId)
    if(data)
        return user.viewCart(emailId)
    else{
        let err = new Error("Not deleted")
        err.status=404
        throw err
    }
}

module.exports = user;