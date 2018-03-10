/*
global localStorage
$
numeral
_
*/

$(document).ready(function(){
    $('#download-spinner').show();
    setTimeout(function() {
        renderTrades();
        
        $('table.display').DataTable({responsive:true});
        $('#download-spinner').hide();
        
    }, 10);
 

$('a.tabs').on('click',function(e){

    $('#download-spinner').show();
   var tab=$(this).attr('type');
   if ($('table.display').DataTable())
    $('table.display').DataTable().destroy();
    $('div.page-content').empty();

if(tab=="trades"){
    
    
    $('div.container').find('li').removeClass('active');
    $('#tabTrades').addClass('active');
    setTimeout(function(){
        renderTrades();
        $('table.display').DataTable({responsive:true});
        $('#download-spinner').hide();
    },1*500);
    
    
}
else if(tab=="orders"){
    
    $('div.container').find('li').removeClass('active');
    $('#tabOrders').addClass('active');
    setTimeout(function(){

        renderOrders();
        $('table.display').DataTable({responsive:true});
        $('#download-spinner').hide();

    },1*500);
    
    
}
else if(tab=="config"){
    //$('table.display').DataTable().destroy();
   $('div.container').find('li').removeClass('active');
    
   $('#config').addClass('active');
    setTimeout(function(){
        loadConfig('poloniex');
        
        $('#download-spinner').hide();
    },1*500);
    
    
}
//loadConfig


});

$('button.btn-tradeImport').on('click',function(){


  $('div.message').html('refresing data, please wait...');
 
  var param={}
  param.currencyPair= 'all'
  param.exchange=$('form#tradeImporter').find('select.exchange').val();
  param.history= $('form#tradeImporter').find('select.tradeDateRange').val();
  param.key=$('form#tradeImporter').find('input.apikey').val();
  param.secret=$('form#tradeImporter').find('input.apisecret').val();
  param.endpoint='/api/returnTradeHistory/';
  
  if (!param.history)
  {
    $('div.message').html('invalid trade import period');
      return false;
  }
  else if (!param.key || param.key.length<15)
  {
    $('div.message').html('invalid key/secret');
      return false;
  }
  else if (!param.key || param.key.length<15)
  {
    $('div.message').html('invalid key/secret');
      return false;
  }


  $.ajax({
  type: "POST",
  url: param.endpoint,
  data: param,
  success: function(data){
    
    if (data.error){
      console.log(data.error);

      $('div.message').html('<h3 class="text-danger"><i>'+ data.error +'</i></h3>');
     
    }
     else
     {
        
        $('div.message').html('<h3 class="text-success"><i>trades imported successfully</i></h3>');
            
            storage.saveItem(param.exchange,"tradeCurrencyPairs",data.currencyPairs);
            storage.saveItem(param.exchange,"trades",data.trades);
            //localStorage.setItem('tradeCurrencyPairs',JSON.stringify(data.currencyPairs));
            //localStorage.setItem('trades',JSON.stringify(data.trades));

            renderTrades();
            $('table.display').DataTable({responsive:true});
            
   }
    }
   
});
 return false;
  
});
// open orders
$('button.btn-openOrderImport').on('click',function(){


    $('div.message').html('refresing data, please wait...');
   
    var param={}
    param.exchange=$('div#importOpenOrders').find('select.exchange').val();
    param.currencyPair= 'all'
    param.key=$('form#openOrders').find('input.apikey').val();
    param.secret=$('form#openOrders').find('input.apisecret').val()
    param.endpoint='/api/returnOpenOrders/';
    
    if (!param.key || param.key.length<15)
    {
      $('div.message').html('invalid key/secret');
        return false;
    }
    else if (!param.key || param.key.length<15)
    {
      $('div.message').html('invalid key/secret');
        return false;
    }

    $.ajax({
    type: "POST",
    url: param.endpoint,
    data: param,
    success: function(data){
      console.log(data);
      if (data.error){
        console.log(data.error);
  
        $('div.message').html('<h3 class="text-danger"><i>'+ data.error +'</i></h3>');
       
      }
       else
       {
          $('div.message').html('<h3 class="text-success"><i>orders imported successfully</i></h3>');

            storage.saveItem(param.exchange,"orderCurrencyPairs",data.currencyPairs);
            storage.saveItem(param.exchange,"orders",data.openOders);
            /*  localStorage.setItem('orderCurrencyPairs',JSON.stringify(data.currencyPairs));
              localStorage.setItem('orders',JSON.stringify(data.openOders));
              */
              //orderNumber: "8513540944", type: "sell", rate: "0.00000060", startingAmount: "50000.00000000", amount: "50000.00000000", …}
              renderOrders();
              $('table.display').DataTable({responsive:true});
            
     }
      }
     
  });
   return false;
    
  });

//
$('input.btn-placeTrade').on('click',function(){


  $('div.message').html('placing your order, please wait...');
var market= $('form#buysell').find('td.buysell-market').text();
var asset= $('form#buysell').find('td.buysell-asset').text();

  var param={}
  //{ currencyPair, amount, rate, fillOrKill, immediateOrCancel, postOnly }
  param.exchange=$('form#buysell').find('select.exchange').val();
  param.tradeType=$('form#buysell').find('select.tradeType').val();
  
  param.currencyPair= market + '_' + asset;

  param.amount= $('form#buysell').find('input.buysell-qty').val();
  param.rate= $('form#buysell').find('input.buysell-rate').val();
  param.key=$('form#buysell').find('input.apikey').val();
  param.secret=$('form#buysell').find('input.apisecret').val();

  
  if (param.tradeType==='buy')
    param.endpoint='/api/buy/';
  else if (param.tradeType==='sell')
    param.endpoint='/api/sell/';

  if (!param.exchange || param.exchange==='')
  {
    $('div.message').html('invalid exchange');
      return false;
  }
  else if (!param.tradeType || param.tradeType==='')
  {
    $('div.message').html('invalid trade type');
      return false;
  }
  else if (!param.amount || param.amount<=0)
  {
    $('div.message').html('invalid quantity');
      return false;
  }
  else if (!param.key || param.key.length<15)
  {
    $('div.message').html('invalid key/secret');
      return false;
  }
  else if (!param.key || param.key.length<15)
  {
    $('div.message').html('invalid key/secret');
      return false;
  }
  console.log(param);
  // make ajax call
  //return;
  $.ajax({
  type: "POST",
  url: param.endpoint,
  data: param,
  success: function(data){
    console.log(data.error);
    if (data.error){
      
      $('div.message').html('<h3 class="text-danger"><i>'+ data.error +'</i></h3>');
     
    }
     else
     {
        $('div.message').html('<h3 class="text-success"><i>Order placed successfully</i></h3>');
            
            
   }
    }
   
});
 return false;
  
});
$('#importTrades').on('show.bs.modal', function(e) {
    $('div#importTrades').find('div.message').html('');
   populateApiKey(e);
         
    
});
$('#importOpenOrders').on('show.bs.modal', function(e) {
    $('div#importOpenOrders').find('div.message').html('');
    populateApiKey(e);
          
     
 });
$('#buysell').on('show.bs.modal', function(e) {

    //get data-id attribute of the clicked element
    $('div#buysell').find('div.message').html('');
    var trade = $(e.relatedTarget).data('trade');
    trade.price=$(e.relatedTarget).data('price');
     $(e.currentTarget).find('h4.buysell-title').html('You are about to place a sell order '+ trade.percText  );
    
    var market = trade.currencyPair.split('_')[0];
    var asset=trade.currencyPair.split('_')[1];
    $(e.currentTarget).find('td.buysell-market').html(market);
    //populate the textbox
    $(e.currentTarget).find('td.buysell-asset').html(asset);
    $(e.currentTarget).find('input.buysell-qty').val(trade.amount);
    $(e.currentTarget).find('input.buysell-rate').val(trade.price);
    $(e.currentTarget).find('i.buysell-total').html(trade.price * trade.amount);
    
    populateApiKey(e);
    
    
});

// 
$('input.buysell-qty').on('change',function(e){
    var qty=  $('input.buysell-qty').val();
    var price=$('input.buysell-rate').val();
    $('i.buysell-total').html(qty * price);

});




});

function populateApiKey(e){
    var config;
    var exchange=$(e.currentTarget).find('select.exchange').val()||'poloniex';
    $(e.currentTarget).find('input.apikey').val('');
    $(e.currentTarget).find('input.apisecret').val('');
    var temp = storage.getItem(exchange,'config');
    if (typeof temp=="string")
    config=JSON.parse(temp);
    else
     config=[];



    if(config)
    {

        var item=_.find(config["configItems"],{"item":"apikey"});
        if (item)
            $(e.currentTarget).find('input.apikey').val(item.value);
        
        item=_.find(config["configItems"],{"item":"apisecret"});
        if (item)
            $(e.currentTarget).find('input.apisecret').val(item.value);
        
    }
}

function saveConfig(e){
    var config={}
    var tmp={ }
    
    var exchange=$('div#divConfig').find('select.exchange').val();

    //tmp.exchange =exchange
    tmp.configItems=[];
    if ($('div#divConfig').find('input.apikey').val())
    {
        tmp.configItems.push({
            item:"apikey",
            value:$('div#divConfig').find('input.apikey').val()

        });
    } 
    if ($('div#divConfig').find('input.apisecret').val())
    {
        tmp.configItems.push({
            item:"apisecret",
            value:$('div#divConfig').find('input.apisecret').val()

        });
    } 
    //config[exchange]=tmp;
    //localStorage.removeItem('config'); 
    //localStorage.setItem('config',JSON.stringify(config));
    storage.saveItem(exchange,'config',tmp)
    loadConfig(exchange);
}
function deleteConfig(e){
    var exchange=$('div#divConfig').find('select.exchange').val();
    //localStorage.removeItem('config');
    storage.removeItem(exchange,'config')
}

function downloadCSV(args) {  
        var data, filename, link;
       
        if (args.csv == null) return;

        filename = args.filename || 'coins.csv';

        if (!args.csv.match(/^data:text\/csv/i)) {
            args.csv = 'data:text/csv;charset=utf-8,' + args.csv;
        }
        data = encodeURI(args.csv);

        link = document.createElement('a');
        link.setAttribute('href', data);
        link.setAttribute('download', filename);
        link.click();
    }

    function renderTrades(){
        var currencyPairs,trades ;
        //var currencyPairs = JSON.parse(localStorage.getItem('tradeCurrencyPairs'))||[];
        var temp =storage.getItem("poloniex",'tradeCurrencyPairs') ;
        if (typeof(temp)=='string')
        {
            var currencyPairs = JSON.parse(temp);
        }
        else
        currencyPairs =[];
        temp =storage.getItem("poloniex",'trades') ;
        if (typeof(temp)=='string')
        {
            var trades = JSON.parse(temp);
        }
        else
         trades =[];
        
       // var currencyPairs = JSON.parse(temp);
        //var trades = JSON.parse(localStorage.getItem('trades'));
        //var trades = JSON.parse(storage.getItem("poloniex",'trades'))||[];
        //console.log(currencyPairs);
        $('div.page-content').empty();

        $('div.page-content').append(`<button class="btn btn-primary" id="aTraderImporter" data-toggle="modal" data-target="#importTrades" 
        style="margin-left:20px;margin-top:10px;margin-bottom:20px;">Import Trades</button>`); 
     
        var html =` <table id="dtTable" class="display" width="100%" >
        <colgroup>
        <col class="grey" span="10"/>
        <col class="profit" span="3" />
        
        </colgroup>
        <thead>
        <tr>
        <th></th>
        <th></th>
        <th></th>
        <th></th>
        <th></th>
        <th></th>
        <th></th>
        <th></th>
        <th></th>
        <th></th>
        <th colspan="3" style="text-align: center;">Profit projection</th>                
    </tr>
            <tr>
            <th>Currency</th>
            <th>Date</th>
            <th>Type</th>
            <th>Category</th>
            <th>TradeID</th>
            <th>Order Number</th>
            <th>Rate</th>
            <th>Qty</th>
            <th>Fee</th>
            <th>Total</th>
            <th>@10%</th>
            <th>@20%</th>
            <th>@30%</th>
            

        </tr>
        
        </thead>
        <tfoot>
            <tr>
                <th>Currency</th>
                <th>Date</th>
                <th>Type</th>
                <th>Category</th>
                <th>TradeID</th>
                <th>Order Number</th>
                <th>Rate</th>
                <th>Qty</th>
                <th>Fee</th>
                <th>Total</th>
                <th>@10%</th>
                <th>@20%</th>
                <th>@30%</th>             
            </tr>
        </tfoot>
        <tbody>

        </tbody>
        </table>
`
$('div.page-content').append(html);
        
         currencyPairs.map(function(cp){
        
                trades[cp].map(function(item){
                var trade=item;
                trade.currencyPair=cp;
                trade.percText="@10% profit";
                var perc=(item.rate * 1.1).toFixed(8);
                trade.valueAt10P=perc;
                var at10PHtml=`
                <a 
                class="buysell" 
                href="#" 
                data-toggle="modal" 
                data-price="${perc}" 
                data-trade='${JSON.stringify(trade)}' 
                data-target="#buysell">
                ${trade.valueAt10P}
                </a>`;
                
             
                perc=(item.rate * 1.2).toFixed(8);
                
                trade.valueAt20P=perc;
                trade.percText="@20% profit";
                var at20PHtml=`
                <a 
                class="buysell" 
                href="#" 
                data-toggle="modal" 
                data-price="${perc}" 
                data-trade='${JSON.stringify(trade)}' 
                data-target="#buysell">
                ${trade.valueAt20P}
                </a>`;
                
                 perc=(item.rate * 1.3).toFixed(8);
                
                trade.valueAt30P=perc;
                trade.percText="@30% profit";
                var at30PHtml=`
                <a 
                class="buysell" 
                href="#" 
                data-toggle="modal" 
                data-price="${perc}" 
                data-trade='${JSON.stringify(trade)}' 
                data-target="#buysell">
                ${trade.valueAt30P}
                </a>`;
                
                
               
              
               
                $('table.display tbody').append(`
                <tr>
                <td>${cp}</td>
                <td>${trade.date}</td>
                <td>${trade.type}</td>
                <td>${trade.category}</td>
                <td>${trade.tradeID}</td>
                <td>${trade.orderNumber}</td>        
                
                <td>${trade.rate}</td>
                <td>${trade.amount}</td>        
                <td>${trade.fee}</td>
                <td>${trade.total}</td>
                <td class="profit">${at10PHtml}</td>
                <td class="profit">${at20PHtml}</td>
                <td class="profit">${at30PHtml}</td>
                
              </tr>
                `);
          }) 

            }) 
        
    }

/// load orders
function renderOrders(){
    var currencyPairs,orders;   
    var temp =storage.getItem("poloniex",'orderCurrencyPairs') ;
    if (typeof(temp)=='string')
    {
        var currencyPairs = JSON.parse(temp);
    }
    else
    currencyPairs =[];
   // var currencyPairs = JSON.parse(storage.getItem('poloniex','orderCurrencyPairs')||'[]');
    temp =storage.getItem("poloniex",'orders') ;
    if (typeof(temp)=='string')
    {
        data = JSON.parse(temp);
    }
    else
    data =[];
   
   // var data = JSON.parse(storage.getItem('poloniex','orders')||'[]');
    //orderNumber: "8513540944", type: "sell", rate: "0.00000060", startingAmount: "50000.00000000", amount: "50000.00000000", …}
    $('div.page-content').empty();
    
    $('div.page-content').append(`<button class="btn btn-primary" id="aOrderImporter" data-toggle="modal" data-target="#importOpenOrders" style="margin-left:20px;margin-top:10px;margin-bottom:20px;">Import Orders</button>`);
    var html =`<table id="dtTable" class="display" width="100%" >
    <thead>
        <tr>
            <th>Currency</th>
            <th>Order Number</th>
            <th>Date</th>
            <th>Type</th>
            <th>Rate</th>                                    
            <th>Qty</th>            
            <th>Total</th>
           

        </tr>
    </thead>
    <tfoot>
        <tr>
        <th>Currency</th>
        <th>Order Number</th>
        <th>Date</th>
        <th>Type</th>
        <th>Rate</th>                                    
        <th>Qty</th>            
        <th>Total</th>
        </tr>
    </tfoot>
    <tbody>

    </tbody>
    </table>
`
$('div.page-content').append(html);
//{"orderNumber":"38054813155","type":"sell","rate":"0.00031576","startingAmount":"100.00000000","amount":"100.00000000","total":"0.03157600","date":"2018-03-01 08:41:34","margin":0}
     currencyPairs.map(function(cp){
    
            data[cp].map(function(item){
            var order=item;
            order.currencyPair=cp;                                 
            $('table.display tbody').append(`
            <tr>
            <td>${cp}</td>
            <td>${order.orderNumber}</td>        
            <td>${order.date}</td>
            <td>${order.type}</td>                        
            
            
            <td>${order.rate}</td>            
            <td>${order.amount}</td>
            <td>${order.total}</td>
                        
          </tr>
            `);
      }) ;

        }) ;
    
}

function loadConfig(exchange){
    //var config=localStorage.getItem('config') ;
  
   // var exchange=$('div#divConfig').find('select.exchange').val();
    var config=storage.getItem(exchange,'config') ;
    console.log(config);
    var showConfig=(config==null)?'style="display:none;"':'';
    console.log(showConfig);
  $('div.page-content').empty();
    var html =`
    <br/>
  <div class="container">
  <div class="row">
    <div class="col-md-9">

    <div id="divConfig">

    <div class="row">
      <div class="col-md-3"><strong>Item</strong></div>
      <div class="col-md-3"><strong>Value</strong></div>
    </div>
    <div class="row">
      <div class="col-md-3">Exchange</div>
      <div class="col-md-3">
      <select class="exchange" style="width:100%">
      <option value="poloniex">Poloniex</option>
  
      </select></div>
    </div>
    <div class="row">
      <div class="col-md-3">Api Key</div>
      <div class="col-md-3"> <input type="text" class="apikey" placeholder="enter api key" style="width:100%"/></div>
    </div>
    <div class="row">
      <div class="col-md-3">Secret</div>
      <div class="col-md-3"><input type="text" class="apisecret"  placeholder="enter api key secret" style="width:100%" /></div>
    </div>
    <div class="row">
    <div class="col-md-3">
      <button type="button" class="btn btn-success btn-saveConfig" id="btnSaveConfig" onClick="return saveConfig(this);">Save Config</button>
    </div>
    <div class="col-md-3">
      <button type="button" class="btn btn-danger btn-removeConfig" id="btnDeleteConfig" onClick="return deleteConfig(this);">Delete Data</button>
    </div>
    </div>
    
  </div>
    
    </div>
    <div class="col-md-3">

   <pre>
    <code>${config}</code>
    </pre>
    </div>

  
  </div>  
  <div class="row">
  <p>

</p>
  </div>
</div>

`;

$('div.page-content').append(html);

renderConfig();

}

function renderConfig(){

   // var config = localStorage.getItem('orders');
   // console.log(config);
  //  $('div.page-content').append('<div class="text-right">hi</div>');

}
// extension method
$.fn.switchClass = function(a, b){
    var t = $(this).hasClass(a);
      $(this).addClass( t ? b : a ).removeClass( t ? a : b );
  }