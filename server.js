  
// RESTFUL_API

const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser")
const app = express();

mongoose.connect("mongodb://127.0.0.1:27017/Sample")
    // ,{userNewUrlParser:true,useUnifiedTopology:true})
.then(()=>{
 console.log("Connected with Mongodb")
}).catch((err)=>{
    console.log(err)
})

app.use(bodyParser.urlencoded({extended:false}));   // body perser 
app.use(express.json())
// Create schema 
const ProductSchema = new mongoose.Schema({   
    name:String,
    description:String,
    price:Number,
})
// Create a Model(collection)
const Product = new mongoose.model("Products",ProductSchema)
// CREATE API 

// 1. Create product 
app.post("/api/v1/product/new",async(req,res)=>{
    const product =await Product.create(req.body);     // req.body se information lene ke liye body parser used krna hoga 
     res.status(200).json({
        success:true,
        Product
     })
})
  // 2 Read product 
  app.get("/api/v1/products",async(req,res)=>{
     const products= await Product.find();
     res.status(200).json({success:true,
         products})
  })

 // 3 Update Product
 app.put("/api/v1/product/:id",async(req,res)=>{
    let product = await Product.findById(req.params.id);        //  dobara used hoga so here used let 
    if(!product){
        return res.status(500).json({
            success:false,
            message:"Product not found"
        })
    }
    product = await Product.findByIdAndUpdate(req.params.id,req.body,{
        new:true,
        useFindAndModify:false,
        runValidator:true
    })
    res.status(200).json({    //  create Api se id ko copy kr ke postman main url banaya 
        success:true,
        product})
 }) 
  // 4 Delete Product
  app.delete("/api/v1/product/:id",async(req,res)=>{
    const product = await Product.findById(req.params.id);
    if(!product){
        return res.status(500).json({
            success:false,
            message:"Product not found"
        })
    }
      await product.deleteOne();

      res.status(200).json({   
        success:true,
        message:"Product is deleted successfully"
    })

  })

app.listen(4500,()=>{
console.log("Server is working http://localhost:4500");
});
