const dbdriver = require("mysql2");

const con = dbdriver.createConnection({
    host:"localhost",
    user:"user",
    password:"password",
});

con.execute("CREATE DATABASE IF NOT EXISTS extrack",(err)=>{
    if(err)console.log(err);
});

con.execute("CREATE TABLE IF NOT EXISTS extrack.users(id INT PRIMARY KEY AUTO_INCREMENT, fullname TEXT, gender TEXT, dob DATE, email TEXT, username Text, password TEXT)",(err)=>{
    if(err)console.log(err);
});

module.exports = con;