
const fs=require('fs')
let reqestLogger= (req,res,next)=>{
    let logMessage = ""+ new Date() + " " +req.method + " " +req.url + "\n";
    fs.appendFile('./requestLogger.txt', logMessage,(err)=>{
        if(err) return next( err );
        else next();
    })
}

module.exports = reqestLogger