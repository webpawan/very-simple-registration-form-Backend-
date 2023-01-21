const express = require("express");
const path = require("path");
const hbs = require("hbs");
const Register = require("./modules/register");
const app = express();
const port = process.env.PORT || 3000;

require("./db/conection");

const statisPath = path.join(__dirname, "../public");

app.use(express.static(statisPath));
const TemplatePath = path.join(__dirname, "../template/views");
const PartialsPath = path.join(__dirname, "../template/partials");
// -----------------------------------
hbs.registerPartials(PartialsPath);
// partial ko add karna ho uska liya
// --------------------------
// ------------------
// view engin ko set kar diya
app.set("view engine", "hbs");
// yadi view folder root folder me ni ha kisi dusre folder ma ha to
// path change karna padega
app.set("views", TemplatePath);
// -------------------

app.use(express.urlencoded({extended:false}))

app.get("/", (req, res) => {
  res.render("index");
});

app.get("/register", (req, res) => {
  res.render("register");
});

app.post("/register", async (req, res) => {
  try {
    // res.status(200).send(req.body.firstname)

    // console.log(req.body.firstname);
    const userRegisterData = new Register({
      firstname : req.body.firstname,
      email:req.body.email,
      gender:req.body.gender,
      phone:req.body.phone,
      password:req.body.password,
      repassword:req.body.repassword
    }) 

    const register = await userRegisterData.save();
    res.status(200).send(register)

  } catch (error) {
    res.status(404).send(error);
  }
});

app.listen(port, () => {
  console.log("server start");
});
