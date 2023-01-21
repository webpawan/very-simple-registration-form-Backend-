const express = require("express")
const path = require("path")
const app = express();
const port = process.env.PORT || 3000;
require("./db/conection")
const statisPath = path.join(__dirname,"../public")

app.use(express.static(statisPath))
// ------------------
// view engin ko set kar diya 

// -------------------

app.get("/",(req,res)=>{
    res.send("home")
})

app.listen(port,()=>{
    console.log("server start");
})