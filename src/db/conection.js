const mongoose = require("mongoose");
mongoose.set('strictQuery', false);
// line no 2 me jo likha ha ussa ye error ni atat ha 
mongoose.connect("mongodb://localhost:27017/firstForm").then(()=>{
    console.log("connect to mongodb detabase");
}).catch((e)=>{
    console.log(e);
})