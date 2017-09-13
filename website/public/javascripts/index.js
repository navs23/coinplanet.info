/*
global localStorage
numeral
$
*/

var helper=helper || {};

helper.chatlink='https://www.tradingview.com/chatwidgetembed/?utm_source=www.cryptocoinsnews.com&amp;utm_medium=widget&amp;utm_campaign=chat-embed&amp;locale=en#bitcoin';

helper.renderCryptoData=function(param,e){
 
 
    if (!param)
    {
        param={};
        param =$(e).data('json');
        param.index=($(e).text());
        param.baseUrl=$(e).data('baseurl');
       
    }
   
    var baseUrl = param.baseUrl || '/api/cryptopricefeed/' ;
    var searchstr = $("#search").text() || "all";
    var url = baseUrl + searchstr +'/' + (param.index);
  
    $.ajax(url ).then(function(result,status){
      
        $('.price-grid').empty();
        
        
         var temp='';
         var _userSelectedCrypo=JSON.parse(localStorage.topTenCrypto);
       
         
            result.data.map(function(item){
                
                 if (_.contains(_userSelectedCrypo,item.symbol)) {
                    
                    temp = `
                        <div class="column search-item" data-ccy="${item.symbol}">
                        <div class="input-group margin-bottom-sm" >
                        <span class="input-group-addon" type="input">
                     
                        ${item.symbol}
                        </span>
                        <input  class="ccy-crypto form-control"
                        id="${item.symbol}"
                        type="number" 
                        data-ccy="${item.symbol}"
                        data-priceusd="${item.price_usd}"
                        data-pricebtc="${item.price_btc}"
                        data-baseurl="${baseUrl}"
                        value="${item.price_btc}"
                        
                        onchange="helper.calculate(this,'crypto');"
                        
                        />
                        </div>
                       </div>`
                     $('.price-grid').append(temp);
                   
                 }
                
            });
                
              
             
    });
    
    
   return false;
    
  
    
}
          
helper.renderPagination=function(params){
  // alert(JSON.stringify(params));
   
      var lastPageIndex = params.pagerItems[params.pagerItems.length - 2];
      var param={}
     // param.baseUrl=params.baseUrl;
      
      $('.pagination').html(params.pagerItems.map(function(i){
          
            param={};
            param.lastPageIndex=lastPageIndex;
            param.index=i;
            param.total_pages=params.total_pages;
            param.name=(i =="Next")?"next":(i=="Prev")?"prev":"page";
            //param.baseUrl = params.baseUrl;
           //data-baseurl
            var t =(JSON.stringify(param));
            var onclick = (param.name=="next" || param.name =="prev"?'return navigate2(this);':'return renderCryptoData(null,this);'); 
             var temp = `<a href="#" 
                        class="pager" 
                        onclick="` + onclick +
                       `" data-json='${t}'
                        name="${param.name}"
                        data-baseurl="${params.baseUrl}"
                     >${i}</a>`;
                     
           
            return temp;
             
         }).join(''));    
     
}

helper.getFiatRates=function(){
  
    var url ='api/fiatpricefeed/';
    var selectedCurrencies = JSON.parse(localStorage.topTenFiat);
     $.ajax(url ).then(function(result,status){

      $('.fiatPrice-grid').empty();
        
         var temp=``;
         var rates=[];
         rates.push({key:'USD',val:1});
         
          _.mapObject(result.rates,function(val,key){
              
              if (_.contains(selectedCurrencies,key)) {
                    rates.push({key:key,val:val});
                  
              }
              
          });
            
            temp=``;
            rates.map(function(rate){
         
                 temp = `
                     <div class="column" data-ccy="${rate.key}">
                        <div class="input-group margin-bottom-sm">
                        <span class="input-group-addon" type="input">${rate.key}</span>
                        <input  class="ccy-fiat form-control"
                        id="${rate.key}"
                        type="number" 
                        data-ccy="${rate.key}"
                        data-priceusd="${rate.val}"
                        value="${rate.val}"
                        onchange="helper.calculate(this,'fiat');"
                        />
                    
                        </div>
                       </div>
                        `;
                
                    $('.fiatPrice-grid').append(temp);
                    
              
            });
         
     });
}

helper.calculate=function(e,ccy){
  
  var $item={};
  $item.$priceusd=($(e).data('priceusd')||0.00);
  $item.$pricebtc=($(e).data('pricebtc')||0.00);
  
  $item.$newValue = $(e).val() || 0.00;
  
  $item.$totalbtc = ( $item.$pricebtc * $item.$newValue);
  
  if (ccy=='crypto')
    $item.$totalusd = ( $item.$priceusd * $item.$totalbtc);
  else
    $item.$totalusd = ( $item.$priceusd * $item.$newValue);
  
  


$('.ccy-crypto').not(e).each(function(item){
   var $temp;
  if (ccy=='crypto')
     $temp=  $item.$totalbtc/$(this).data('pricebtc') ;
 else
   $temp=  $item.$totalusd/$(this).data('priceusd') ;
   
   
  $(this).val($temp);
  
  
});

 $('.ccy-fiat').not(e).each(function(item){
  
  var $temp=  $item.$totalusd*$(this).data('priceusd') ;
   
  $(this).val($temp);
  
  
});
}

helper.navigate2=function(e){
   
    var option={};
    var $a=$('div.pagination > a.active');
    //var $pagerWrapper=$("a[name='"+ param.pagerWrapper +"']");
    var total_pages = $(e).data('json').total_pages;
    var curr_index =  parseInt($($a).text());
   // alert(total_pages + ' ' + curr_index);
   if ($(e).text().toLowerCase() == "next")
    {
        if (curr_index +1 > total_pages) return false;
        
        if ($($a).next('a').text().toLowerCase()=='next')
        {
         
             $('div.pagination > a').each(function(){
                 
             var i = parseInt($(this).text());
              
            if (!isNaN(i)) 
             $(this).text(i+1);
          
          });
            
        }
        else
        {
          $a.
               removeClass('active')
               .next('a').addClass('active');
        }
        
    }
     else if ($(e).text().toLowerCase() == "prev")
    {
     
      if( $a.prev('a').text().toLowerCase()=="prev")
      {
         
          if (($a).text() ==1) return false;
           $('div.pagination > a').each(function(){
                 
             var i = parseInt($(this).text());
             
            if (!isNaN(i)) 
             $(this).text(i-1);
           
          });
          
      }
      else
      {
      $a.
           removeClass('active')
           .prev('a').addClass('active');
      
      }
    } 
   
     //if (!isNaN(parseInt($('a.active').text())))  return;
     option.index=parseInt($('a.active').text());
     option.baseUrl=$($a).data('baseurl');
     
     //alert('url ->' + option.baseUrl);
     renderCryptoData(option,'');
    return false;
}


helper.showAll=function(mode){
var fiatccy=[];
var param={};
param.lastPageIndex=-1;
param.index=1;
param.total_pages=-1;
param.name="";
param.baseUrl = '/api/cryptopricefeed/';
 if (mode==1)
helper.renderCryptoData(param,null);
else if (mode==2)
helper.getFiatRates();
else  if (mode==3)
{
    
    helper.renderCryptoData(param,null);
     helper.getFiatRates();
}

return false;
}

helper.swapItems=function(source,target){
 // if($(target).children().length > 10 || $(target).children().length < 10)
// {
//     $('.message').text('please select ten currencies.');
//     alert('cancel swap');
//     return;
// }
 $('.configure-message').text('');
 
  var vals = $(source).val();
  
        vals.map(function(item){
          
          $(source)
            .find('option[value="' + item + '"]')
            .fadeOut(200, function(){ 
                  $(target).append(
                `
                <option value ="${item}">${item}</option>
              `);
                $(this).remove();
                
                
            })
          .end();
          
        });
  
}

helper.configureLocalStorage=function(){
  
  if (typeof(Storage) !== "undefined") {

    delete localStorage.topTenFiat;
    delete localStorage.topTenCrypto;
   
 
   localStorage.topTenFiat = JSON.stringify([
    "USD",
    "GBP",
    "EUR",
    "AUD",
    "CAD",
    "CHF",
    "CNY",
    "INR",
    "JPY",
    "SEK"
    
    ]);
    
   localStorage.topTenCrypto = JSON.stringify([
    "BTC",
    "ETH",
    "BCH",
    "XRP",
    "LTC",
    "XEM",
    "DASH",
    "MIOTA",
    "XMR",
    "NEO"
    
    ]);

} else {
// Sorry! No Web Storage support..
alert('local storage is not supported');
}
  
}

helper.populateCurrenciesDropDown=function(dd){

    var $ddAll,$ddSelected,url ,selectedCurrencies;
    //alert('populateCurrenciesDropDown = ' +dd);
    if (dd=='fiat'){
         $ddAll = $('select.fiat-all');
         $ddSelected = $('select.fiat-selected');
         $ddAll.empty();
         $ddSelected.empty();
         
         $ddSelected.append(`<option value="USD">USD</option>`);
         
         url ='api/fiatpricefeed/';
         selectedCurrencies = JSON.parse(localStorage.topTenFiat);
         
          $.ajax(url ).then(function(result,status){
           
              _.mapObject(result.rates || result.data,function(val,key){
                  
                  var option =`<option value="${key}">${key}</option>`;
                 // alert(option);
                  
                  if (_.contains(selectedCurrencies,key)) 
                  {
                      $ddSelected.append(option);
                        
                  }
                  else
                  {
                      $ddAll.append(option);
                        
                  }
                  
              });
                
         });
    }
 else if (dd =='crypto')
    {
        $ddAll=$('select.crypto-all');
        $ddSelected=$('select.crypto-selected');
        url='/api/cryptopricefeed/all/1';
       // alert($ddAll.children().length);
        selectedCurrencies = JSON.parse(localStorage.topTenCrypto);
        $ddAll.empty();
        $ddSelected.empty();
         $.ajax(url ).then(function(result,status){
           
              result.data.map(function(item){
                  
                  var option =`<option value="${item.symbol}">${item.symbol}</option>`;
                 // alert(option);
                  
                  if (_.contains(selectedCurrencies,item.symbol)) 
                  {
                      $ddSelected.append(option);
                        
                  }
                  else
                  {
                      $ddAll.append(option);
                        
                  }
                  
              });
                
         });
        
    }
  
       
        
       
}