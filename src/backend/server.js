const express = require("express");
const cors = require("cors");
const jwt = require("jsonwebtoken");
require("./dbconnect");
const userroute = require("./routes/userroutes");
const entryroute = require("./routes/entryroutes");
const currentusers = require("./routes/currentusers");
const activeuser = require("./routes/activeuser");

const port = 3200;

const extrack = express();
extrack.use(cors());
extrack.use(express.json());

extrack.listen(port,()=> console.log("server running on port 3200"));
extrack.get("/",(req,res)=>res.send("server running ...."));

extrack.use("/Extrack/User",userroute);

extrack.use("/Extrack/Entry",(req,res,next)=>{
    let token = jwt.verify(req.headers.authorization,"LegendsNeverDie");
    if(currentusers[token]){
        activeuser.id=token;
        activeuser.username=currentusers[token];
        next();
    }
    else
        res.status(401).send({message:"Unidentified user"});
    },entryroute);


    