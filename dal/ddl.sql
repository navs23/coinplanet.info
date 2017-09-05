create table price_feed(

id int primary key auto_increment (1),
dated timestamp default current_timestamp,
deleted_datetime timestamp ,
position int ,
symbol varchar(15),
name varchar(15),
time int,
usdPrice float(25,3),
btcPrice float(50,20),,
usdVolume  float(20,3),,
mktcap: usdPrice float(20,3),
supply int,
change24 float(15,2)

);



CREATE TABLE User (
id int primary key AUTO_INCREMENT, 
dated timestamp default current_timestamp,
last_loggedIn_datetime timestamp  ,
active bit(1) 
first_name varchar(100) 
surname    varchar(100) 
username   varchar(15)  
password   varchar(15)  

)

