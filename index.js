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
const mysql = require('mysql2');
const { count } = require("console");
const connection=mysql.createConnection({
host: 'localhost',
user: 'root',
database: 'info',
password: 'Hamzalfs@7086'
});
let per_user="";
let q="USE info";
try{
    connection.query(q,(err,res)=>{
        if(err)
        {
            throw err; 
        }
    });
} catch{
    console.log("eRROR");
}
let ers="";
app.get("/",(req,res)=>{
    res.render("home.ejs",{ers});
});
app.post("/dash",(req,res)=>{
    console.log(req.body.user);
    per_user=req.body.user;
    let pass=req.body.pass;
    let q=`SELECT * FROM cred WHERE username="${per_user}"`;
    try{
        connection.query(q,(err,resp)=>{
            if(err)
            {
                throw err; 
            }
            if(resp.length==0)
            {
                ers="No User Found! Try Again.";
                res.redirect("/");
            }
            else
            {
                if(pass!=resp[0].password)
                {
                    ers="Wrong Password! Try Again.";
                    res.redirect("/");
                }
            }
        });
    } catch{
        console.log("eRROR");
    }
    let tasks=`SELECT * FROM task WHERE username="${per_user}"`;
    try{
        connection.query(tasks,(err,resp)=>{
            if(err)
            {
                throw err; 
            }
            let task=resp;
            res.render("index.ejs",{task});
        });
    } catch{
        console.log("eRROR");
    }
});
let task=0;
app.get("/dash",(req,res)=>{
    let tasks=`SELECT * FROM task WHERE username="${per_user}"`;
    try{
        connection.query(tasks,(err,resp)=>{
            if(err)
            {
                throw err; 
            }
            task=resp;
            res.render("index.ejs",{task});
        });
    } catch{
        console.log("eRROR");
    }
});
app.post("/new_signup",(req,res)=>{
    let use_=req.body.user;
    let pess=req.body.pass;
    let tasks=`SELECT * FROM cred WHERE username="${use_}"`;
    try{
        connection.query(tasks,(err,resp)=>{
            if(err)
            {
                throw err; 
            }
            if(resp.length!=0)
            {
                ers="Account already exist!";
                res.redirect("/");   
            }
            else
            {
                let q=`INSERT INTO cred (username,password) VALUES ("${use_}","${pess}")`;
                try{
                    connection.query(q,(err,resp)=>{
                    if(err)
                    {
                        throw err; 
                    }
                    per_user=use_;
                    res.redirect("/dash");
                    });
                } catch{
                console.log("eRROR");
                }
            }
        });
    } catch{
        console.log("eRROR");
    }
});
app.get("/signup",(req,res)=>{
    res.render("signup.ejs");
});
app.get("/new",(req,res)=>{
    res.render("new.ejs");
});
app.post("/add",(req,res)=>{
    let task_=req.body.task;
    let desc=req.body.description;
    let q=`INSERT INTO task (username,task,description) VALUES ("${per_user}","${task_}","${desc}")`;
    try{
        connection.query(q,(err,resp)=>{
            if(err)
            {
                throw err; 
            }
            res.redirect("/dash");
        });
    } catch{
        console.log("eRROR");
    }
});
app.get("/delete/:id",(req,res)=>{
    let {id}=req.params;
    let ind=id;
    console.log(ind);
    let q=`DELETE FROM task WHERE task="${ind}"`;
    try{
        connection.query(q,(err,resp)=>{
            if(err)
            {
                throw err; 
            }
            res.redirect("/dash");
        });
    } catch{
        console.log("eRROR");
    }
});
app.get("/logout",(req,res)=>{
    res.redirect("/");
});
app.get("/edit/:id",(req,res)=>{
    let {id}=req.params;
    let ind=id;
    let qt=`SELECT * FROM task WHERE task="${ind}"`;
    try{
        connection.query(qt,(err,resp)=>{
            if(err)
            {
                throw err; 
            }
            let ar=resp;
            res.render("edit.ejs",{ar});
        });
    } catch{
        console.log("eRROR");
    }
});
app.patch("/edited/:us/:id",(req,res)=>{
    let {id}=req.params;
    let {us}=req.params;
    let ink=id;
    let usk=us;
    let new_task=req.body.tsk;
    let new_des=req.body.desc;
    let new_q=`UPDATE task SET description= "${new_des}", task= "${new_task}" WHERE task="${ink}"`;
    try{
        connection.query(new_q,(err,resp)=>{
            if(err)
            {
                throw err; 
            }
        });
    } catch{
        console.log("eRROR");
    }
    per_user=usk;
    res.redirect("/dash");
});






































// app.get("/edit/:id",(req,res)=>{
//     let {id}=req.params;
//     let ind=id;
//     let q=`SELECT * FROM task WHERE task="${ind}"`;
//     let ar="";
//     try{
//         connection.query(q,(err,resp)=>{
//             if(err)
//             {
//                 throw err; 
//             }
//             const ar=Object.keys(resp[0]);
//             console.log(ar);
//             let artask=ar[1];
//             let aruser=ar[0];
//             let ardes=ar[2];
//             console.log(artask);
//             res.render("edit.ejs",{artask,aruser,ardes});
//         });
//     } catch{
//         console.log("eRROR");
//     }
// });

// app.patch("/edited/:us/:id",(req,res)=>{
//     let {id}=req.params;
//     let ink=id;
//     console.log(ink);
//     let new_task=req.body.tsk;
//     let new_des=req.body.desc;
//     let new_q=`UPDATE task
//     SET task= "${new_task}",description= "${new_des}",
//     WHERE task="${ink}"`;
//     try{
//         connection.query(q,(err,resp)=>{
//             if(err)
//             {
//                 throw err; 
//             }
//         });
//     } catch{
//         console.log("eRROR");
//     }
//     res.redirect("/dash");
// });
// app.get("/posts/new",(req,res)=>{
//     res.render("form.ejs");
// });
// app.post("/posts",(req,res)=>{
//     posts.push(req.body);
//     res.redirect("/posts");
// });
// app.get("/posts/:id",(req,res)=>{
//     let {id}=req.params;
//     let ind=parseInt(id);
//     posts.splice(ind,1);
//     res.redirect("/posts");
// });
// app.get("/posts/edit/:id",(req,res)=>{
//     let {id}=req.params;
//     let ind=parseInt(id);
//     let taask=posts[ind];
//     changing=ind;
//     res.render("edit.ejs",{taask,ind});
// });
// app.patch("/posts/:id",(req,res)=>{
//     let {id}=req.params;
//     posts[id].task=req.body.krn;
//     posts[id].description=req.body.hehe;
//     res.redirect("/posts");
// });