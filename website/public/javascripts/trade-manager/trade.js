/*
global localStorage
$
numeral
_
*/
var _exchanges=[{
    name:"bittrex",
    columns:["OrderUuid","Exchange","Type","Quantity","Limit","CommissionPaid","Price","Opened","Closed"]
},
{
    name:"polo",
    columns:["Date","Market","Category","Type","Price","Amount","Total","Fee","Order Number","Base Total Less Fee","Quote Total Less Fee"]
}];
var g_data;
$(document).ready(function(){

    $('#download-spinner').show();
    $('form#tradeImporter').find('.import-file').hide();

    wireSwitchImportModeEvent('trade');
    
    setTimeout(function() {

        renderTrades(_exchanges,'div.page-content');
                      
    }, 10);
 

$('a.tabs').on('click',function(e){
    switchTabs($(this).attr('type'));
});

$('button.btn-tradeImport').on('click',function(){

 $('div.message').html('refresing data, please wait...');

 var mode = $('form#tradeImporter').find('select.import-mode').val();
 //console.log(mode);
 if (mode==="manual")
    return importTradeManually();
 else if (mode==="auto")
    return importTrade();
 
  
});
// open orders
$('button.btn-openOrderImport').on('click',function(){

    return importOpenOrders();
   
    
  });

//
$('input.btn-placeTrade').on('click',function(){

    return placeTrade();
  
  
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

  populateBuySellModalForm(e);
    
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

    function renderTrades(exchanges,element){

        $(element).empty();
                
        renderTableHeaderMarkup('trade',$(element));
        var currencyPairs,trades;
        var subTotalArr=[];
        // loop throug each exchange
        exchanges.map(function(exchange){

            currencyPairs =storage.getItem(exchange.name,'tradeCurrencyPairs');
            if (currencyPairs.length==0) return;
          
            trades =storage.getItem(exchange.name,'trades') ;
            
            var subTotal=null;
            var rowId=1;
            //loop through each currency pair
            currencyPairs.map(function(cp){

                subTotal={currencyPair:cp,qty:0.00,total:0.0000000}

                if (!trades[cp]) return;

                trades[cp].map(function(trade){
                    trade.currencyPair=cp;
                    // rows
                    rowId++;
                    trade.rowId=rowId;
                    // render table row
                    renderTableRow(trade);
                    // subtotal
                    subTotal.currencyPair=cp;
                    subTotal.rowId=rowId;
                    subTotal.qty +=parseInt(trade.amount);
                    subTotal.total +=parseFloat(trade.total);
                  
                  
              });
            
                subTotalArr.push(subTotal);
              
                }); 
            //   //  console.log(subTotalArr);
            //   subTotalArr.map(function(st){
            //     $('table.display tbody').append(`
            //     <tr class="subtotal">
            //     <td>Total</td>
            //     <td></td>
            //     <td></td>
            //     <td></td>
                
            //     <td></td>        
                
            //     <td></td>
            //     <td>${st.qty}</td>        
            //     <td></td>
            //     <td>${st.total}</td>
            //     <td></td>
            //     <td></td>
            //     <td></td>
                
            //   </tr>

            //     `);
            //   });
                
                
                

               // },500);
        });
      
        $('table.display').DataTable({responsive:true});
        $('#download-spinner').hide();
    }

/// load orders
function renderOrders(exchanges,element){
   // var currencyPairs,orders;   
    
    renderTableHeaderMarkup('trade',$(element));

    
   // var currencyPairs = JSON.parse(storage.getItem('poloniex','orderCurrencyPairs')||'[]');
    //temp =storage.getItem("poloniex",'orders') ;
    var data, currencyPairs;
    exchanges.map(function(exchange){
            currencyPairs= storage.getItem(exchange.name,'orderCurrencyPairs');
            // each currency pair
            currencyPairs.map(function(cp){
                data =storage.getItem(exchange.name,'orders');
                data[cp].map(function(order){

                //var order=item;
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

    })
   
   // var data = JSON.parse(storage.getItem('poloniex','orders')||'[]');
    //orderNumber: "8513540944", type: "sell", rate: "0.00000060", startingAmount: "50000.00000000", amount: "50000.00000000", …}
    
    //{"orderNumber":"38054813155","type":"sell","rate":"0.00031576","startingAmount":"100.00000000","amount":"100.00000000","total":"0.03157600","date":"2018-03-01 08:41:34","margin":0}
    
    
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



}


// extension method
$.fn.switchClass = function(a, b){
    var t = $(this).hasClass(a);
      $(this).addClass( t ? b : a ).removeClass( t ? a : b );
  }


function importTrade()  
{
   var exchange= $('form#tradeImporter').find('select.exchange').val();
    if (exchange==='polo')
    {
        poloniexImport()
    }
    return flase;

}

function poloniexImport(){
    var param={}
    param.currencyPair= 'all'
    param.exchange='polo';
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
             
  
              renderTrades(_exchanges,'div.page-content');
              $('table.display').DataTable({responsive:true});
              
     }
      }
     
  });
return false;
}
function importTradeManually(){
    var exchange = $('div#importTrades').find('select.exchange').val();
    var exchange_desc = $('div#importTrades').find('select.exchange').text();
    var files =document.getElementById('tradeFiles').files;

    $('form#tradeImporter').find('input.apikey').val();
    console.log(exchange);
    
    var param={};
    param.exchange=exchange;
    var cols=_.find(_exchanges,{name:exchange}).columns
                        .join()
                        .toLowerCase();
   

    readTextFile(files)
    .then(function(fileData){
        var expectedCols = fileData[0]
                                    .join()
                                    .toLowerCase();
        
        if (cols.toString().trim() !== expectedCols.trim())
        {
            console.log(cols);
            console.log(expectedCols);
              
            $('div.message').html(`
            <p class="text-danger"><i>invalid header columns ${cols}</i>
            </p>
            <p class="text-warning"><i>should be - ${expectedCols}</i>
            </p>`);
            return false;
        }
        var trades=_.last(fileData, fileData.length -1 ) ;        
        //g_data=fileData;
       // console.log(trades);
        tradeMapper(exchange,trades)
        .then(function(result){


            var groupedTrade=_.groupBy(result.trades,function(t){return t.currencyPair});
    
            storage.saveItem(param.exchange,"tradeCurrencyPairs",result.currencyPairs);
            storage.saveItem(param.exchange,"trades",groupedTrade);
            console.log('end');
        

        })

      
       

    })
    .catch(function(err){

        console.log(err);
    })

    


    return false;
}

function readTextFile(files,opt_startByte, opt_stopByte) {
    var resolve =(data)=>{};
    var reject =(err)=>{};
return new Promise(function(resolve,reject){
    var file = files[0];
    var start = parseInt(opt_startByte) || 0;
    var stop = parseInt(opt_stopByte) || file.size - 1;

    var reader = new FileReader();
    var fileData=[];
    // If we use onloadend, we need to check the readyState.
    reader.onloadend = function(evt) {
      if (evt.target.readyState == FileReader.DONE) { // DONE == 2
        var text = evt.target.result;
        //console.log(evt.target.result);
        var lines = text.split(/[\r\n]+/g); // tolerate both Windows and Unix linebreaks
        
        lines.map(function(row) { 
           
            var data = row.trim().split(',');
            //console.log(data); 
            fileData.push(data);
        
        });
         resolve(fileData);
      }
    };
    reader.onerror=()=>{
        reject(err);
    }
    var blob = file.slice(start, stop + 1);
    reader.readAsBinaryString(blob);

});
    
  }

  var tradeMapper = function(exchange,trades){
    
    return new Promise(function(resolve,reject){
    /*
     name:"bittrex",
    columns:["OrderUuid","Exchange","Type","Quantity","Limit","CommissionPaid","Price","Opened","Closed"]
    name:"polo",
    columns:["Date","Market","Category","Type","Price","Amount","Total","Fee","Order Number","Base Total Less Fee","Quote Total Less Fee"]
    */
    var result={currencyPairs:[],
        trades:[]
    }
  
    var trade,cp,arr;
    var currencyPair;
    var t=''
    trades.map(function(item){
        
        trade;
        if (exchange =="bittrex"){
            
            trade={}
            trade.date=item[7];
            
            trade.currencyPair=item[1];
    
            trade.category='Bittrex';
           
            trade.type=new String(item[2]).replace('LIMIT_','').toLowerCase().replace(/\b(\w)/g, s => s.toUpperCase());
            trade.rate=item[4];
            trade.amount=item[3];
            trade.total=item[6];
            trade.fee=item[5];
            trade.orderNumber=item[0];
            trade.baseTotalLessFee=item[6]-item[5];
            trade.quoteTotalLessFee=0.00
            console.log(trade);
           
        }
        else if (exchange =="polo"){
            trade={}
            cp='';
            trade.date=item[0];
            cp = item[1];
            arr = cp.split('/');
    
            currencyPair=arr[1]+ '_' + arr[0];
            trade.currencyPair=item[1];
    
            trade.category="Poloniex";
            trade.type=item[3];
            trade.rate=item[4];
            trade.amount=item[5];
            trade.total=item[6];
            trade.fee=item[7];
            trade.orderNumber=item[8];
            trade.baseTotalLessFee=item[9];
            trade.quoteTotalLessFee=item[10];

           
        }
        if (trade){
            result.trades.push(trade);
            // add if doesn't exists
            if(!_.find(result.currencyPairs,function(c){return c===trade.currencyPair}))
                result.currencyPairs.push(trade.currencyPair);
        }
    });
    setTimeout(function(){
        resolve(result);

    },1*1000);

});

  }


// database extension methods for custom filtering
  $.fn.dataTable.ext.search.push(
    function( settings, data, dataIndex ) {
        var min = parseInt( $('#min').val(), 10 );
        var max = parseInt( $('#max').val(), 10 );
        var qty = parseFloat( data[6] ) || 0; // use data for the qty column
 
        if ( ( isNaN( min ) && isNaN( max ) ) ||
             ( isNaN( min ) && qty <= max ) ||
             ( min <= qty   && isNaN( max ) ) ||
             ( min <= qty   && qty <= max ) )
        {
            return true;
        }
        return false;
    }
);


function filter(){
    var table = $('#dtTable').DataTable();
    table.draw();    
}

function percentageMarkup(trade,percentageValue){
    var temp=trade;
    var perc;
    if (percentageValue==10){
        perc=(temp.rate * 1.1).toFixed(8);
        temp.percText="@10% profit";
    }
    
    else if (percentageValue==20){
        perc=(temp.rate * 1.2).toFixed(8);
        temp.percText="@20% profit";
    }
    
    else if (percentageValue==30){
        perc=(temp.rate * 1.3).toFixed(8);
        temp.percText="@30% profit";
    }
    
    else{
        temp.percText="@10% profit";
    }

    var perc=(temp.rate * 1.1).toFixed(8);
    temp.valueAt10P=perc;

    return `
    <a 
    class="buysell" 
    href="#" 
    data-toggle="modal" 
    data-price="${perc}" 
    data-trade='${JSON.stringify(temp)}' 
    data-target="#buysell">
    ${temp.valueAt10P}
    </a>`;
}
function renderTableHeaderMarkup(type,e){
    if(type=='trade'){
        e.append(`
            <div class="row">
            <div>
            <button class="btn btn-primary" id="aTraderImporter" data-toggle="modal" data-target="#importTrades" style="margin-left:20px;margin-top:10px;margin-bottom:20px;">
            Import Trades
            </button>

            </div>

            </div>`
        );
        e.append(` <table id="dtTable" class="display" width="100%" >
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
        <th colspan="3" style="text-align: center;">Profit Projection</th>                
    </tr>
            <tr>
            <th>Currency</th>
            <th>Date</th>
            <th>Type</th>
            <th>Category</th>
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
    `);
    }
    else if (type=="order"){
        e.append(`<button class="btn btn-primary" id="aOrderImporter" data-toggle="modal" data-target="#importOpenOrders" style="margin-left:20px;margin-top:10px;margin-bottom:20px;">Import Orders</button>`);
        e.append(`<table id="dtTable" class="display" width="100%" >
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
    `);
    //$('div.page-content').append(html);
    }
}

function renderTableRow(trade){
    var at10PHtml=percentageMarkup(trade,10);
    var at20PHtml=percentageMarkup(trade,20);
    var at30PHtml=percentageMarkup(trade,30);

    $('table.display tbody').append(`
                <tr id="row_${trade.rowId}">
                <td>${trade.currencyPair}</td>
                <td>${trade.date}</td>
                <td>${trade.type}</td>
                <td>${trade.category}</td>
                
                <td>${trade.rate}</td>
                <td>${trade.amount}</td>        
                <td>${trade.fee}</td>
                <td>${trade.total}</td>
                <td class="profit">${at10PHtml}</td>
                <td class="profit">${at20PHtml}</td>
                <td class="profit">${at30PHtml}</td>                    
                </tr>
                `);
}

function wireSwitchImportModeEvent(type){
    var $formElement;
    if(type=='trade')
    $formElement=$('form#tradeImporter')
    else if(type=='order')
    $formElement=$('form#orderImporter')

    $('.import-mode').on('change',function(e){
      
        if (e.target.value==="manual")
        {
         
        $formElement.find('select.exchange').empty();
        $formElement.find('select.exchange').append(`<option value="polo">Poloniex</option>`);
        $formElement.find('select.exchange').append(`<option value="bittrex">Bittrex</option>`);
        $formElement.find('.import-file').show();
        $formElement.find('.import-auto').hide();        
        }
        else if (e.target.value==="auto")
        {
            $formElement.find('select.exchange').empty();
            $formElement.find('select.exchange').append(`<option value="polo">Poloniex</option>`);
            $formElement.find('.import-file').hide();
            $formElement.find('.import-auto').show();
        }
     });
}

// show tabs
function switchTabs(tab){

    $('#download-spinner').show();
    $('div.page-content').empty();
    if ($('table.display').DataTable())
        $('table.display').DataTable().destroy();

     //$('div.page-content').empty();

    if(tab=="trades"){
    
        $('div.container').find('li').removeClass('active');
        $('#tabTrades').addClass('active');
        setTimeout(function(){
            renderTrades(_exchanges,'div.page-content');
            //$('table.display').DataTable({responsive:true});
            $('#download-spinner').hide();
        },1*500);
        
        
    }
    else if(tab=="orders"){
        
        $('div.container').find('li').removeClass('active');
        $('#tabOrders').addClass('active');
        setTimeout(function(){
    
            renderOrders(_exchanges,'div.page-content');
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
}

function importOpenOrders(){
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
              renderOrders(_exchanges,'div.page-content');
              $('table.display').DataTable({responsive:true});
            
     }
      }
     
  });
   return false;
}

function placeTrade(){

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
}
function populateBuySellModalForm(e){
      //get data-id attribute of the clicked element
      $('div#buysell').find('div.message').html('');

      var trade = $(e.relatedTarget).data('trade');
      trade.price=$(e.relatedTarget).data('price');
      $(e.currentTarget).find('h4.buysell-title').html('You are about to place a sell order '+ trade.percText  );

      var index= trade.currencyPair.toString().indexOf('_');
      if (index<0)
        index= trade.currencyPair.toString().indexOf('/');
      //var arr =trade.currencyPair.toString().split('_');
      //if (!arr)
      //arr =trade.currencyPair.toString().split('/');
      
     
      $(e.currentTarget).find('td.buysell-market').html(trade.currencyPair.toString().substring(0,index));
      //console.log(trade);
      $(e.currentTarget).find('select.exchange').val(trade.category.toLowerCase());
      //populate the textbox
      $(e.currentTarget).find('td.buysell-asset').html(trade.currencyPair.toString().substring(index+1));
      $(e.currentTarget).find('input.buysell-qty').val(trade.amount);
      $(e.currentTarget).find('input.buysell-rate').val(trade.price);
      $(e.currentTarget).find('i.buysell-total').html(trade.price * trade.amount);
}