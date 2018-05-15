var storage = function(){

    var db_name='coinplanetDb';

    return {
        saveItem:function(exchange,key,value){
            var db=localStorage.getItem(db_name) || '{}';
            data=JSON.parse(db);      

            if (!data[exchange]){
                data[exchange]={}
            }
            data[exchange][key]=JSON.stringify(value);
            //data[exchange][key]=JSON.stringify(value);
            
            // save to local storage
            localStorage.setItem(db_name,JSON.stringify(data)) ;           
         },
        removeItem:function(exchange,key){
            var db=localStorage.getItem(db_name) || '{}'

            var data=JSON.parse(db);

            delete data[exchange][key];
            localStorage.setItem(db_name,JSON.stringify(data)) ;           
            //return db[key];
           },
        getItem:function(exchange,key){  
            var db=localStorage.getItem(db_name); 
            var temp;            
            var data;
            try{
               
                if (typeof(db)=='string')
                    data=JSON.parse(db);
                    temp= data[exchange][key]
            }catch(e){
                  
            };

            if (temp =="undefined") 
                return []
    
            if (typeof(temp)=='string')
                return JSON.parse(temp);
            
            return [];
                
              },
        removeAll:function(){
            localStorage.removeItem(db_name)
        }


    }

}();