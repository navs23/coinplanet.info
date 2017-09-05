(function(helper){
    
    helper.getData = function(params){
    return new Promise((resolve,reject)=>{
       
        
    let res=params.res;
    let contentType = params.contentType || 'html';//
    let contentTypeRegEx;
    
    if (contentType == "json")
        contentTypeRegEx = /^application\/json/;
    else if (contentType == "html")
        contentTypeRegEx = /^text\/html/;
    
    const { statusCode } = res;
    const headerContentType = res.headers['content-type'];

    let error;
    
    if (statusCode !== 200) {
    
    error = new Error('Request Failed.\n' +
                      `Status Code: ${statusCode}`);
                      
  } else if (!contentTypeRegEx.test(headerContentType)) {
      
    error = new Error('Invalid content-type.\n' +
                      `Expected application/json but received ${contentType}`);
  }
  
  if (error) {
  
    console.error(error.message);
   
    // consume response data to free up memory
    res.resume();
    reject(error);
    return;
  }

  res.setEncoding('utf8');
  
  let rawData = '';
  
  res.on('data', (chunk) => { rawData += chunk; });
  
  res.on('end', () => {
    try {
        var data;
        
        if (contentType == "json")
        data = JSON.parse(rawData);
      else 
        data = rawData
      resolve(data);
       // console.log(data);
    } catch (e) {
         console.error(e.message);
         reject(e);
      
    }
        
        
        
        
    }); 
  
        
    });
        
    };
    
}(module.exports))