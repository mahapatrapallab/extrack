const entryrepo = require("../crud/entrycrud");
const express = require("express");
const activeuser = require("./activeuser");
const router = express.Router();

const entry = new entryrepo();

router.get("/loadall/:id",(req,res)=>{
    
    table = activeuser.username+"_"+req.params.id;
    entry.findAllByDate(table,(error,result)=>{
        if(error)
            res.status(500).send({message:error});
        else
            res.status(200).send(result);
    });
});

router.post("/save/:id",(req,res)=>{
    table = activeuser.username+"_"+req.params.id;
    entry.save(table,req.body,(error,result)=>{
        if(error)
            res.status(500).send({message:error});
        else
            res.status(201).send({id:result});

    });
});

router.delete("/delete/:id",(req,res)=>{
    table = activeuser.username+"_"+req.params.id;
    entry.delete(table,req.body,(error,result)=>{
        if(error)
            res.status(500).send({message:error});
        else
            res.status(200).send({message:"Deleted",affectedrows:result});
    });
});

module.exports = router;