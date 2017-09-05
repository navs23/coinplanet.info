(function(poller){
    
    
    
    poller.poll=function(param){
       
       setInterval(param.fn,param.interval);
  
    }
  
}(module.exports))
