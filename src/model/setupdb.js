const collection = require('../Utilities/connections');
const dummyData = [
    {
        "eCredentials":{
            "eEmail":"dummy@gmail.com"
        },
        "eCart":["1015"],
        "eOrders":[{
            "eProduct":"1101",
            "eDate":""
        }]
    },
    {
        "eCredentials":{
            "eEmail":"dummy2@gmail.com"
        },
        "eCart":["1012"],
        "eOrders":[{
            "eProduct":"1101",
            "eDate":""
        }]
    },
    {
        "eCredentials":{
            "eEmail":"dummy3@gmail.com"
        },
        "eCart":["1016"],
        "eOrders":[{
            "eProduct":"1102",
            "eDate":""
        }]
    }
]
let create = {}
create.setupDb= async ()=>{
    try{
        let userCollection = await collection.getCartCollection();
        let result = await userCollection.create(dummyData);
        if(result.length){
            return {message:"Database initialized"}
        }
        else{
            let err = new Error("Failed to connect")
            err.status=400;
            throw err
        }
    }
    catch(error){
        let err = new Error("Failed to connect")
        err.status=400;
        throw err
    }
}


// (async function h(){
//     let x=await create.setupDb()
//     console.log(x)
// })()

module.exports=create
