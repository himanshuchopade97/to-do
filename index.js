const express=require("express");
const app=express();
let port=8080;
const path=require("path");
const over=require("method-override");
app.use(over("_method"));
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
app.get("/posts/:id",(req,res)=>{
    let {id}=req.params;
    let ind=parseInt(id);
    posts.splice(ind,1);
    res.redirect("/posts");
});
app.get("/posts/edit/:id",(req,res)=>{
    let {id}=req.params;
    let ind=parseInt(id);
    let taask=posts[ind];
    changing=ind;
    res.render("edit.ejs",{taask,ind});
});
app.patch("/posts/:id",(req,res)=>{
    let {id}=req.params;
    posts[id].task=req.body.krn;
    posts[id].description=req.body.hehe;
    res.redirect("/posts");
});