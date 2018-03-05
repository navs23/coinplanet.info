/*
global localStorage
$
numeral
_
*/

$(document).ready(function(){
    $('#download-spinner').show();
    setTimeout(function() {
        loadTrades();
        
         $('table.display').DataTable({responsive:true});
        $('#download-spinner').hide();
        
    }, 10);
 



$('button.btn-tradeImport').on('click',function(){


  $('div.message').html('refresing data, please wait...');
 
  var param={}

  param.currencyPair= 'all'
  param.history= $('select.tradeDateRange').val();
  param.key=$('input.apikey').val();
  param.secret=$('input.apisecret').val();
  param.endpoint='/api/returnTradeHistory/';
  
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
            localStorage.setItem('currencyPairs',JSON.stringify(data.currencyPairs));
            localStorage.setItem('trades',JSON.stringify(data.trades));
            
   }
    }
   
});
 return false;
  
});
// open orders
$('button.btn-openOrderImport').on('click',function(){


    $('div.message').html('refresing data, please wait...');
   
    var param={}
  
    param.currencyPair= 'all'
    param.history= $('select.tradeDateRange').val();
    param.key=$('input.apikey').val();
    param.secret=$('input.apisecret').val();
    param.endpoint='/api/returnOpenOrders/';
    
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
          $('div.message').html('<h3 class="text-success"><i>orders imported successfully</i></h3>');
              
              localStorage.setItem('orders',JSON.stringify(data.orders));
              
     }
      }
     
  });
   return false;
    
  });

//
$('input.btn-placeTrade').on('click',function(){


  $('div.message').html('placing trade, please wait...');
 
  var param={}
  //{ currencyPair, amount, rate, fillOrKill, immediateOrCancel, postOnly }
  param.currencyPair= 'all'
  param.amount= $('input.buysell-qty').val();
  param.rate= $('input.buysell-rate').val();
  param.history= $('select.tradeDateRange').val();
  param.key=$('input.apikey').val();
  param.secret=$('input.apisecret').val();
  param.endpoint='/api/trade/sell/';
    
  if (!param.amount || param.amount<=0)
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
        $('div.message').html('<h3 class="text-success"><i>Order placed successfully</i></h3>');
            
            
   }
    }
   
});
 return false;
  
});


$('#buysell').on('show.bs.modal', function(e) {

    //get data-id attribute of the clicked element
    var trade = $(e.relatedTarget).data('trade');
    trade.price=$(e.relatedTarget).data('price');
     $(e.currentTarget).find('h4.buysell-title').html('Trade Manager : '+ trade.percText);
    
    var market = trade.currencyPair.split('_')[0];
    var asset=trade.currencyPair.split('_')[1];
    $(e.currentTarget).find('td.buysell-market').html(market);
    //populate the textbox
    $(e.currentTarget).find('td.buysell-asset').html(asset);
    $(e.currentTarget).find('input.buysell-qty').val(trade.amount);
    $(e.currentTarget).find('input.buysell-rate').val(trade.price);
    $(e.currentTarget).find('i.buysell-total').html(trade.price * trade.amount);
    
    
    
});

// 
$('input.buysell-qty').on('change',function(e){
    var qty=  $('input.buysell-qty').val();
    var price=$('input.buysell-rate').val();
    $('i.buysell-total').html(qty * price);

});

});



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

    function loadTrades(){
        return;
        var currencyPairs = JSON.parse(localStorage.getItem('currencyPairs'))||[];
        var trades = JSON.parse(localStorage.getItem('trades'));

        $('div.page-content').empty();
        var html =` <table id="trades" class="display" width="100%" >
        <thead>
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
                <th>Action</th>  

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
                    <th>Action</th>  
            </tr>
        </tfoot>
        <tbody>

        </tbody>
        </table>
`
$('div.content').append(html);
        
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
                <td>${at10PHtml}</td>
                <td>${at20PHtml}</td>
                <td>${at30PHtml}</td>
                <td>Buy</td>
              </tr>
                `);
          }) 

            }) 
        
    }

