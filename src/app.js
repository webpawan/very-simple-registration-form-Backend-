const express = require("express")
const path = require("path")
const hbs = require("hbs");
const app = express();
const port = process.env.PORT || 3000;
require("./db/conection")
const statisPath = path.join(__dirname,"../public")

app.use(express.static(statisPath))
const TemplatePath = path.join(__dirname,"../template/views")
const PartialsPath = path.join(__dirname,"../template/partials")
// -----------------------------------
hbs.registerPartials(PartialsPath)
// partial ko add karna ho uska liya 
// --------------------------
// ------------------
// view engin ko set kar diya 
app.set("view engine","hbs")
// yadi view folder root folder me ni ha kisi dusre folder ma ha to 
// path change karna padega 
app.set("views",TemplatePath)
// -------------------


app.get("/",(req,res)=>{
    res.render("index")
})

app.listen(port,()=>{
    console.log("server start");
})