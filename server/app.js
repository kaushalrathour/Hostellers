const express = require("express");
const ejs = require("ejs");
const app = express();

app.set("view engine", ejs);
app.set("ejs", {__dirname: "views"});

app.get("/", (req, res)=> {
    res.redirect("/home");
})

app.get("/home", (req,res) =>{
    res.render("home.ejs");
})



const PORT = process.env.PORT || 3000;
app.listen(PORT, ()=>{
    console.log("Server is running on PORT", PORT);
})