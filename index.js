const express=require("express");
const app=express();
let port=8080;
const path=require("path");
app.listen(port,()=>{
    console.log("Server Started!");
});
app.use(express.urlencoded({extended : true}));
app.set("view engine","ejs");
app.set("views",path.join(__dirname,"views"));
app.use(express.static(path.join(__dirname,"public")));
let posts=[
    {
        task:"Hamza",
        description:"play"
    },
    {
        task:"Mradul",
        description:"study"
    },
];
app.get("/posts",(req,res)=>{
    res.render("index.ejs",{posts});
});
app.get("/posts/new",(req,res)=>{
    res.render("form.ejs");
});
app.post("/posts",(req,res)=>{
    posts.push(req.body);
    res.redirect("/posts");
});