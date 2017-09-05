(function(dal){

var db = require('./index.js'),
    util= require("util"),
    _=require("underscore"),
    config = require('config')

dal.save=function(param){

    var sql ='';
   
  
    if (!param.id)
    {
        
    sql = _.where(config,{name:"save_price_feed"});
    
    sql += util.format(sql,param.cid ,param.companyName,	param.firstName,	param.surname,	param.address,	param.town,	param.county,	param.postCode,	param.phone );
    
    }
    
    else
    {
        sql = "update KodeCom.SubContractor set ";
        sql += util.format("company_name='%s',",param.companyName);
        sql += util.format("first_name='%s',",param.firstName);
        sql += util.format("surname='%s',",param.surname);
        sql += util.format("address='%s',",param.address);
        sql += util.format("town='%s',",param.town);
        sql += util.format("county='%s',",param.county);
        sql += util.format("postCode='%s',",param.postCode);
        sql += util.format("phone='%s',",param.phone);
        sql += util.format("mobile='%s',",param.mobPhone);
        sql += util.format("fax='%s',",param.fax);
        sql += util.format("email='%s',",param.email);
        sql += util.format("utr='%s',",param.utr);
        sql += util.format("nino='%s',",param.nino);
        sql += util.format("verification_no='%s',",param.verificationNo);
        sql += util.format("deduction_rate='%s',",param.deductionRate);
        sql += util.format("vat_rate='%s',",param.vatRate);
        sql += util.format("services='%s',",param.services);
        sql += util.format("active='%s',",param.active);
        sql += util.format("contract_recd='%s'",param.contractRecd);
	    
	    sql += util.format(" where id=%d",param.id);
        
    }
    console.log("db script: %s",sql);
    
     return new Promise(function(resolve,reject){
        db.run({sql:sql},function(err,result){
              if(err) return reject(err);
              return resolve("ok");
            });
       
   });
   

}


dal.get=function(param){

    var sql ='';
    sql = util.format("select * from coin.price_feed where dated = %s;", param.id);

    
    
     return new Promise(function(resolve,reject){
        
        db.run({sql:sql},function(err,result){
              if(err) return reject(err);
              return resolve(result);
            });
       });
    
    
}








}

(module.exports));