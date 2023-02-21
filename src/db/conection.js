const mongoose = require("mongoose");
mongoose.set('strictQuery', false);
 
mongoose.connect("mongodb://localhost:27017/firstForm").then(()=>{
    console.log("connect to mongodb detabase");
}).catch((e)=>{
    console.log(e);
})