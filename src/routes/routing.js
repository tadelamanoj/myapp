const express = require( 'express' );
const router = express.Router();
const ProductsService = require("../service/services")

router.get( "/viewCart/:eEmail" ,async(req,res,next )=>{
    try{
        let procart = await ProductsService.viewCart(req.params.eEmail)
        if( procart )
            res.json( procart );
    }
    catch(err){
        next( err );
    }
}) 

router.put( "/viewCart",async( req,res,next)=>{
    
    let response = await ProductsService.addToCart( req.body.eEmail,req.body.prodId)
    res.json( response );
    next()
} )

router.get('/pullCart/:eEmail', async(req,res,next )=>{
    try{
        let response = await ProductsService.pullCart( req.params.eEmail);
        res.json( response)
    }catch(err){
        next(err);
    }
})

router.get('/orders/:eEmail', async(req,res,next)=>{
    try{
        let procart = await ProductsService.orderCart( req.params.eEmail)
        if(procart)
            res.json( procart )
    }catch(err){
        next(err)
    }
})

router.post('/viewCart', async(req,res,next)=>{
    try{
        let procart = await ProductsService.delCart( req.body.eEmail,req.body.productId)
        if(procart)
            res.json( procart )
    }catch(err){
        next(err)
    }
})

module.exports = router