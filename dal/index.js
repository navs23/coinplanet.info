(function(db){
    
    
var mysql = require('mysql');


 
 var  dbConfig = {
  host: "localhost",
  user: "kerrjp",
  password: "",
  database:"KodeCom",
  multipleStatements: true
};
   
db.connect=function(){
   
    var con = mysql.createConnection(dbConfig);
    
    con.connect(function(err) {
    if (err) throw err;
        console.log("Connected!");
    });

} 

db.run=function(param,cb){
    var con = mysql.createConnection(dbConfig);
    
    con.connect();
    
    con.query(param.sql, function (error, results, fields) {
        if (error) return cb(error);
        cb(null,results);
       
});

con.end();
   

}

db.runWithValues=function(param,cb){
        var con = mysql.createConnection(dbConfig);
        con.connect();
        console.log(param);
        con.query(param.sql, param.values, function (error, results, fields) {
            if (error) 
                return cb(error);
            else
                cb(null,'ok');
});
 
con.end();
       

   }
    
}(module.exports));


