const con = require("../dbconnect");

class entryrepo{

    delete(table,entry,callback){

        const from1="DELETE FROM extrack.";
        const from2=" WHERE id=?";
        con.execute(from1+table+from2,[entry.id],(err,res)=>{
            if(err)
                return callback(err.code,null);
            else
                return callback(null,res.affectedRows);
        });
    }

    findAllByDate(table,callback){

        const select1="SELECT * FROM extrack.";
        const select2=" ORDER BY date DESC";
        con.query(select1+table+select2,(err,res)=>{
            if(err)
                return callback(err.code,null);
            else
                return callback(null,res);

        });
    }

    save(table,entry,callback){

        const into1="INSERT INTO extrack.";
        const into2="(id,date,amount,details,type) VALUES(:id,:date,:amount,:details,:type)"
        con.execute({namedPlaceholders:true,sql:into1+table+into2},entry,(err,res)=>{
            if(err)
                return callback(err.code,null);
            else
                return callback(null,res.insertId);
        });

    }
}

module.exports = entryrepo;