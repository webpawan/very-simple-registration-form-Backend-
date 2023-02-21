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

require("./db/conection");

const statisPath = path.join(__dirname, "../public");

app.use(express.static(statisPath));
const TemplatePath = path.join(__dirname, "../template/views");
const PartialsPath = path.join(__dirname, "../template/partials");

hbs.registerPartials(PartialsPath);

app.set("view engine", "hbs");

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


req.user.tokens = [];

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
    res.cookie("jwt", token, {
      expires: new Date(Date.now() + 600000),
      hpptOnly: true,
    });

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
     
    });

   
    if (isMatch) {
      res.status(200).send("login complete");
    } else {
      res.status(404).send("wrong password");
    }

  } catch (error) {
    res.status(404).send("envalid login details");
    console.log(error);
  }
});

app.listen(port, () => {
  console.log("server start");
});
