require("dotenv").config();
const express = require("express");
const path = require("path");
const hbs = require("hbs");
const bcrypt = require("bcryptjs");
const Register = require("./modules/register");
const app = express();
const port = process.env.PORT || 3000;
const cookieParser = require("cookie-parser");
const auth = require("./middleware/auth");
// https://supertokens.com/blog/what-is-jwt
// all about jwt (json tokken)----------------------------------------------------------

// cookies
// A cookie is a piece of data from a website that is stored within a web browser that the website can retrieve at a later time. Cookies are used to tell the server that users have returned to a particular website.

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
app.use(cookieParser());
app.use(express.urlencoded({ extended: false }));

app.get("/", (req, res) => {
  res.render("index");
});

app.get("/secret", auth, (req, res) => {
  res.render("secret");
  console.log(`my cookies value -> ${req.cookies.jwt}`);
});

app.get("/logout", auth, (req, res) => {
 try {

// req.user.tokens = req.user.tokens.filter((curElem)=>{
// return curElem  !== req.token
// })
// logout for single device 


req.user.tokens = [];
// this is logout for all devices 
  res.clearCookie("jwt");
  req.user.save();
  res.render("login")
 console.log("logout");
 } catch (error) {
  res.status.send(error)
 }
});

app.get("/regteisr", (req, res) => {
  res.render("register");
});

app.get("/login", (req, res) => {
  res.render("login");
});

app.post("/register", async (req, res) => {
  try {
    // res.status(200).send(req.body.firstname)

    // console.log(req.body.firstname);
    const userRegisterData = new Register({
      firstname: req.body.firstname,
      email: req.body.email,
      gender: req.body.gender,
      phone: req.body.phone,
      password: req.body.password,
      repassword: req.body.repassword,
    });

    // middleawar

    // jwt -------
    const token = await userRegisterData.genrateAuthToken();

    // the res.cookie( function is used to set the cookeis name to validateHeaderValue. the value parameter mey be a string or object converted to json )

    // syntax
    // res.cookie(name,value,[ options ])

    res.cookie("jwt", token, {
      expires: new Date(Date.now() + 600000),
      hpptOnly: true,
    });

    // --------------------
    const register = await userRegisterData.save();
    res.status(200).send("complete done !");
  } catch (error) {
    res.status(404).send(error);
  }
});

app.post("/login", async (req, res) => {
  try {
    const email = req.body.email;
    const password = req.body.password;

    const userEmail = await Register.findOne({ email: email });

    const isMatch = await bcrypt.compare(password, userEmail.password);

    const token = await userEmail.genrateAuthToken();

    res.cookie("jwt", token, {
      expires: new Date(Date.now() + 600000),
      hpptOnly: true,
      // secure:true
    });

    // if(userEmail.password === password){
    //   res.status(201).render("index")
    // }
    if (isMatch) {
      res.status(200).send("login complete");
    } else {
      res.status(404).send("wrong password");
    }

    // key and value same ha to niche bala bhi likh sakte ha -------------
    // Register.findOne({email})
    // --------------------------------------------------------------------------
    // fir bala email detabase ka email ha last bala email yaha ka email ha
  } catch (error) {
    res.status(404).send("envalid login details");
    console.log(error);
  }
});

// Hashing vs Encryption – Hashing refers to permanent data conversion into message digest while encryption works in two ways, which can encode and decode the data. Hashing helps protect the integrity of the information and Encryption is used to secure the data from the reach of third parties

app.listen(port, () => {
  console.log("server start");
});
