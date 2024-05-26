const con = require("../dbconnect");
const crypt = require("bcryptjs");

class userrepo{

    findByUsername(uname,callback){

        const qr = "SELECT * FROM extrack.USERS WHERE username LIKE '"+uname+"%'";
            
        con.query(qr,(err,res)=>{
            if(err)
                callback(err.code,null);
            else
                callback(null,res);
        });

    }

    createUser(user,callback){
        crypt.hash(user.password,15)
        .then((hashed)=>{
            user.password=hashed;

            const create1 = "CREATE TABLE IF NOT EXISTS extrack.";
            const create2 = "(id BIGINT PRIMARY KEY AUTO_INCREMENT,date Text,amount INT,details TEXT,type TEXT)";
        
            const into = "INSERT INTO extrack.users(id,fullname,gender,dob,email,username,password) VALUES(:id,:fullname,:gender,:dob,:email,:username,:password)";
            con.execute({namedPlaceholders:true,sql:into},user,(err,res)=>{
                if(err)
                    callback(err.code,null);
                else{
                    con.execute(create1+user.username+"_in"+create2);
                    con.execute(create1+user.username+"_out"+create2);
                    callback(null,res.affectedRows);
                }
            });
        });
    }

}

module.exports = userrepo;