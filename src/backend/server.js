const express = require("express");
const cors = require("cors");
const jwt = require("jsonwebtoken");
require("./dbconnect");
const userroute = require("./routes/userroutes");
const entryroute = require("./routes/entryroutes");
const currentusers = require("./routes/currentusers");
const activeuser = require("./routes/activeuser");
const { log } = require("console");

const port = 3200;

const extrack = express();
extrack.use(cors());
extrack.use(express.json());

extrack.listen(port,()=> console.log("server running on port 3200"));
extrack.get("/",(req,res)=>res.send("server running ...."));

extrack.use("/Extrack/User",userroute);

extrack.use("/Extrack/Entry",(req,res,next)=>{
    let id = jwt.decode(req.headers.authorization);
    
    if(currentusers[id]){
        jwt.verify(req.headers.authorization,currentusers[id].key);
        activeuser.id=id;
        activeuser.username=currentusers[id].username;
        next();
    }
    else
        res.status(401).send({message:"Unidentified user"});
    },entryroute);


    