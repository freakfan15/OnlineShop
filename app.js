const express = require('express');
const app = express();
const mongoose = require('mongoose');
const Product = require('./models/product');
const seedDB = require('./seed');
require('dotenv').config();
const cookieParser = require('cookie-parser');
const path = require('path');
app.use(express.static(path.join(__dirname, 'frontend/build')));

const cors = require("cors");
app.use(cors());

const mongo_pass = process.env.MONGO_PASS;
mongoose.connect('mongodb+srv://admin-vivek:' + mongo_pass +  '@todolist.zaeke.mongodb.net/shopping-app?retryWrites=true&w=majority', 
    {
        useNewUrlParser: true, 
        useUnifiedTopology: true,
        useFindAndModify:false,
        useCreateIndex:true
    }).then(()=>console.log("DB Connected Successfully"))
    .catch((err)=>console.log(err));


seedDB();
// Routes 

const productRoutes = require('./routes/productRoutes');
const authRoutes = require('./routes/authRoutes');

app.use(express.json());
app.use(cookieParser());

app.get('/hello',(req,res)=>{
    res.status(200).send("Hello From Server");
})


app.use(productRoutes);
app.use(authRoutes);

let port = process.env.PORT;
if (port == null || port == "") {
  port = 3004;
}
app.listen(port, function () {
    console.log("Server started at port successfully");
})