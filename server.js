// const express = require('express');
// const mongoose = require('mongoose');
// const bodyParser = require('body-parser');
// const app = express();
// const port = 3500;

// // Connect to MongoDB
// mongoose.connect('mongodb://127.0.0.1:27017/e-commerce', {
//     useNewUrlParser: true,
//     useUnifiedTopology: true
// }).then(() => {
//     console.log('Connected to MongoDB');
// }).catch(err => {
//     console.log('Failed to connect to MongoDB', err);
// });

// // Create a schema for the form data
// const UserDataSchema = new mongoose.Schema({
//     name: String,
//     email: String,
// });

// // Create a model for the form data 
// const UserData = mongoose.model('users', UserDataSchema);

// // Middleware
// app.use(bodyParser.urlencoded({ extended: true }));

// // Serve the HTML form
// app.get('/', (req, res) => {
//     res.sendFile(__dirname + '/index.html');
// });

// // Handle form submissions

// app.post('/submit-form', (req, res) => {
//     const newFormData = new UserData({
//         name: req.body.name,
//         email: req.body.email,
//     });

//     newFormData.save().then(() => {
//       console.log('Data:', newFormData); 
//         res.send('Data saved to MongoDB!');
//     }).catch(err => {
//         res.status(500).send('Failed to save data');
//     });
// });

// // Start the server
// app.listen(port, () => {
//     console.log(`Server is running on http://localhost:${port}`);
// });


// curd 2
// const express = require("express");
// const mongoose = require("mongoose");
// const bodyParser = require("body-parser");
// const app = express();
// import dotenv from '.env'; 

// app.use(bodyParser.json());
// dotenv.config();
// const PORT =process.env.PORT || 5000;
// const MONGOURL = process.env.MONGO_URL;

// mongoose.connect(MONGOURL)
// .then(()=> {
//     console.log("Database Connected Successful.");
//     app.listen(PORT, ()=> {
//       console.log(`Server is running on port ${PORT}`);
//     })
// })
// .catch((error)=> console.log(error));
  
// RESTFUL 


// // 1. Data ko insert kiya gya hai( body se ) by postman 

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
