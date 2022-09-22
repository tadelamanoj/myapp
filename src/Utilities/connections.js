const mongoose = require('mongoose');
const cartSchema = mongoose.Schema({
    eCredentials:{
        eEmail:{ type: String, required:[true,'Mail is required']}
    },
    eCart:[],
    eOrders:[{
        eProducts:{type:String},
        eDate:{type:Date}
    }],
},{collection:"cart",timestamps:true})

let connection = {}
const url="mongodb://localhost:27017/cartDb"

// these are depricated .connection.now the default values are set buy the mongo itself so no need to place these options
// const connectionOptions={
//     useNewUrlParser:true,
//     useUnifiedTopology:true,
//     useCreateIndex:true
// }

connection.getCartCollection = async ()=>{
    // let database=await mongoose.connect(url,connectionOptions);
    let database=await mongoose.connect(url);
    let cartModel= await database.model("Cart",cartSchema);
    return cartModel;
}

// async function k(){
// const u=await connection.getCartCollection()
// console.log(u)
// }
// k()

module.exports=connection;