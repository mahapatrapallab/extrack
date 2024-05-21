const userrepo = require("../crud/usercrud");
const express = require("express");
const jwt = require("jsonwebtoken");
const currentusers = require("./currentusers");
const activeuser = require("./activeuser");
const router = express.Router();
const crypt = require("bcryptjs");


router.get("/usernamecheck/:uname",(req,res)=>{
    username = req.params.uname;
    const user = new userrepo();

    user.findByUsername(username,(error,result)=>{
        if(error)
            res.status(500).send({message:error});
        else
            res.status(200).send({serial:result.length});
    });
});
router.post("/register",(req,res)=>{
    const user = new userrepo();

    user.createUser(req.body,(error,result)=>{
        if(error)
            res.status(500).send({message:error});
        else
            res.status(201).send({message:"Registered",affectedrows:result});
    });
});

router.post("/login",(req,res)=>{
    const user = new userrepo();

    user.findByUsername(req.body.username,(error,result)=>{
        if(error)
            res.status(500).send({message:error});
        else{
            if(result.length!==1)
                res.status(401).send({message:"Incorrect username"});
            else if(!crypt.compareSync(req.body.password,result[0].password))
                res.status(401).send({message:"Incorrect password"});
            else{
                let username = result[0].username;
                let id = result[0].id;
                currentusers[id]=username;
                
                tokenid=jwt.sign(result[0].id.toString(),"LegendsNeverDie")
                res.status(200).send({token:tokenid});
            }
        }
    });

    router.delete("/logout",(req,res)=>{
        let token = jwt.verify(req.headers.authorization,"LegendsNeverDie");
        if(currentusers[token]){
            currentusers.splice(token,1);
            if(activeuser.id===token){
                activeuser.id=null;
                activeuser.username="";
            }
            res.status(200).send({message:"Logout successful!"});
        }
        else
            res.status(401).send({message:"Unidentified user"});
    });
});

module.exports = router;