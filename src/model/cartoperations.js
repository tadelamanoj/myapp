const connection = require('../Utilities/connections');
let cart={}

cart.putToCart = async (email,product)=>{
    const cartCollection= await connection.getCartCollection()
    let addToCart= await cartCollection.updateOne(
        {"eCredentials.eEmail":email},
        {$addToSet:{"eCart":product}}
    )
    if(addToCart.nModified>0){
        return addToCart
    }else{
        let newAccount = await cartCollection.create({
            "eCredentials":{"eEmail":email},
            "eCart":[product],
        })
        return newAccount
    }
}

cart.getCart = async (email)=>{
    const cartCollection = await connection.getCartCollection()
    let getUserCart=await cartCollection.findOne({"eCredentials.eEmail":email})
    if(getUserCart)
        return getUserCart.eCart
    else
        return null
}

cart.orderCart = async (eEmail)=>{
    const cartArray = await connection.getCartCollection();
    let data = await cartArray.findOne({"eCredentials":eEmail})
    if(data)
        return data.eOrders
    else
        return null;
}

cart.checkOutCart=async(eEmail)=>{
    let cartArray= await connection.getCartCollection()
    let getcar = await cart.getCart(eEmail)
    getcar.forEach( async(proId) => {
        await cartArray.updateOne(
            {"eCredentials.eEmail":eEmail},
            {$push:{"eOrders":{"eProductId":proId,
                                "eDate":new Date()}
            }})
    });
    let pullCart=await cartArray.updateOne(
        {"eCredentials.eEmail":eEmail},
        {$pullAll:{"eCart":getcar}}
    )
}

cart.removeItem = async (eEmail,prodId)=>{
    let cartArray=await connection.getCartCollection();
    let delFromCart = await cartArray.updateOne(
        {"eCredentials.eEmail":eEmail},
        {$pullAll:{"eCart":[prodId]}}
    )
    if(delFromCart)
        return delFromCart
}

// async function k(){
//     const u=await cart.putToCart("dummy@gmail.com","3214")
//     const x = await cart.getCart("dummy@gmail.com")
//     console.log(u,x)
//     }
//     k()

module.exports=cart