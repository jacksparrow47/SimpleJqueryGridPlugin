(function ($) {  
  $.fn.CreateGrid=function(option){
        var _queries='';
        var _spans="<span class='k-icon k-i-arrow-s'></span>";
       var _spann="<span class='k-icon k-i-arrow-n'></span>";
        var _spanfilter="<span class='k-icon k-filter'></span>";
      var _filterArray=new Array();
      var _htmlobject=this;
        option = $.extend({
            dataSource:new Array(),
            selectedDataSource:new Array(),
            columns:new Array(),
            pageSize:10,
            widht:'auto',
            height:'auto',
            class:'',
            headerClass:'',
            rowClass:'',
            selectPageIndex:1,
            pages:new Array(),
            tempDataSource:new Array(),
            pageble:true,
            load:function(index){
                option.GetDataSource();
                option.selectedDataSource=option.GetUsableDataSource(index);
            var table="<table class='"+option.class+"'>";
                    for(var i=0;i<option.columns.length;i++)
                    {
                        table+="<th class='"+option.GetheaderClass()+" k-header' id='"+i+"' role='columnheader' ";var style="style='";
                        if(option.columns[i].widht!=undefined)
                        {
                            style+="width:"+option.columns[i].widht+";";
                        }
                        table+=style+"'><span class='k-sorter' id='"+i+"'>"+ option.columns[i].title+"</span>"+_spanfilter +option.GetFilterForm(i) +"</th>";
                    }
                   for(var i=0;i<option.selectedDataSource.length;i++)
                   {
                       table+="<tr >";
                      for(var j=0;j<option.columns.length;j++)
                      {
                          table+="<td class='"+option.GetrowClass()+"'>"+option.selectedDataSource[i][option.columns[j].field]+"</td>";
                      }
                       table+="</tr>";
                   }
                    table+=option.GetFooter();
                    table+="</table>";
                    //$("#table").html(table);   
                    _htmlobject.html(table);  
                
            },
                
            GetFooter:function(){
            var str='<tr><td colspan="'+option.columns.length+'">'+
                '<a href="#" title="ilk sayfaya" class="k-link k-pager-nav k-pager-first k-state-disabled first"  tabindex="-1"><span class="k-icon k-i-seek-w">Go to the first page</span></a>'+
            '<a href="#" title="önceki sayfa" class="k-link k-pager-nav  k-state-disabled before"  tabindex="-1"><span class="k-icon k-i-arrow-w">Go to the previous page</span></a>';
                for(var i=1;i<=option.GetPages(option.tempDataSource);i++)
                {
                    str+='<a tabindex="-1" href="#" class="k-i-number k-link" data-page="'+i+'">'+i+'</a>';
                }
                
                str+='<a href="#" title="sonraki sayfa" class="k-link k-pager-nav after"  tabindex="-1"><span class="k-icon k-i-arrow-e">Go to the next page</span></a><a href="#" title="son sayfa" class="k-link k-pager-nav k-pager-last last"  tabindex="-1"><span class="k-icon k-i-seek-e">Go to the last page</span></a>';
                
                //pages
                  str+=option.GetPageSelect();
                
            str+='</td></tr>';
            
                return str;
            },
            GetDataSource:function(){
                if(option.dataSource.length>0){
                    console.log("element is a div");
                    return option.dataSource;
                }
                if($(_htmlobject).prop('tagName').toLowerCase()=="table")
                {
                    option.columns=new Array();
                    option.dataSource=new Array();
                    var firstTr=$(_htmlobject).children("tbody").children("tr").eq(0);
                    var row=$(_htmlobject).children("tbody").children("tr");
                    var headertag=$(firstTr).children("td").length<=0?"th":"td";
                    var headers=$(firstTr).children(headertag);
                    for(var i=0;i<headers.length;i++)
                    {
                        var obj=new Object();
                        obj.title=$(headers).eq(i).text();
                        obj.field="field"+i;
                        option.columns.push(obj);
                    }
                    for(var i=1;i<row.length;i++)
                    {
                        var td=$(row).eq(i).children("td");
                         var obj=new Object();
                        for(var j=0;j<option.columns.length;j++)
                        {
                           
                            obj[option.columns[j].field]=$(td).eq(j).text();
                            
                        }
                        option.dataSource.push(obj);
                    }
                    var newDiv="<tr><td><div id='Newtable'></div></td></tr>";
                    _htmlobject.html(newDiv);
                    _htmlobject=$("#Newtable");
                    console.log("element is a table");
                    return option.dataSource;
                }
                else
                {
                    option.dataSource=new Array();
                    console.log("element must be table");
                    return option.dataSource;
                }
                
            },
           GetheaderClass:function (){
            var rt='grHeader';
            return option.headerClass!=''?option.headerClass:rt;
           },
        
          GetrowClass:function(){
            var rt='grRow';
            return option.rowClass!=''?option.rowClass:rt;
          },
          GetPageSelect:function(){
              if(option.pageble){
                option.pages=(option.pages.length==0 || option.pages==undefined)?[5,10,15,20,25]:option.pages;
                  var sl="<span style='margin-left:6px'>Sayfadaki Adet</span><select id='pages' class='k-pages'>";
                  for(var i=0;i<option.pages.length;i++)
                  {
                      sl+="<option value='"+option.pages[i]+"'>"+option.pages[i]+"</option>";
                  }
                  sl+="</select> <span style='margin-left:6px'>  "+option.dataSource.length+"'te   "+option.selectedDataSource.length+" </span>";
                  return sl;
              }
              else
                  return "";
          },
         GetFilterForm:function(columnIndex){
             var between=new Array();
             between.push("And");
             between.push("Or");
         var form='<div class="filterform" id="'+columnIndex+'">';
                form+="<span style='with:195px;font-size: 10pt;'>Shows element :</span><br/>";
              var action=option.GetActionOption();
                form+=option.GetFilterFormActionSelect(action);
             form+="<input type='text' style='width:180px;margin-top:5px;margin-bottom:5px;' id='first'/><br/>";
             form+=option.GetFilterFormActionSelect(between);
               form+=option.GetFilterFormActionSelect(action);
             form+="<input type='text' style='width:180px;margin-top:5px;margin-bottom:5px;' id='last'/><br/>";
             form+="<input type='button' style='width:85px;margin-top:5px;margin-bottom:5px;margin-right:10px;' value='Filter' id='btnfilter'/>";
             form+="<input type='button' style='width:85px;margin-top:5px;margin-bottom:5px;' value='Clear' id='btnclear'/><br/>";
             form+="</div>";
             return form;
         
         },
        GetFilterFormActionSelect:function(action){
            var sl="<select style='width:180px;margin-top:5px;margin-bottom:5px;'>";
            for(var i=0;i<action.length;i++)
                    sl+="<option value="+i+" >"+action[i]+"</option>";
                sl+="</select><br/>";
            return sl;
        },
         GetUsableDataSource:function(index){
             option.selectedDataSource=new Array();
             option.tempDataSource=option.GetFilterDatasource();
             var pageSize=option.GetPages(option.tempDataSource);
             if(pageSize==1)
                 option.selectedDataSource=option.selectedDataSource.length==0? option.tempDataSource:option.selectedDataSource;
             else
             {
                if(index==0)
                {
                    for(var i=0;i<option.pageSize;i++)
                    {
                        option.selectedDataSource[i]= option.tempDataSource[i];
                    }
                }
                else
                 {
                     var last=((pageSize+1)*option.pageSize)< option.tempDataSource.length?(pageSize+1)*option.pageSize: option.tempDataSource.length;
                     var j=0;
                     for(var i=(pageSize-1)*option.pageSize;i<last;i++)
                     {
                         option.selectedDataSource[j]= option.tempDataSource[i];
                         j++;
                     }
                 }
             }
             return option.selectedDataSource;
         },
        GetFilterDatasource:function(){//filter datasource and return new datasource(tam değil devam)
            var usableDataSource=option.dataSource;//option.tempDataSource.length==0?option.dataSource:option.tempDataSource;
            var temp=new Array();var k=0;
            
            for(var j=0;j<usableDataSource.length;j++)
            {
                var isadd=true;
                for(var i=0;i<_filterArray.length;i++)
                {
                    var column=option.columns[_filterArray[i].columnId].field;
                    var field1=false;
                    var field2=false;
                    var actionStart=false;
                    if(_filterArray[i].firstValue=="" || _filterArray[i].firstValue==undefined)
                        field1=true;
                    if(_filterArray[i].lastValue=="" || _filterArray[i].lastValue==undefined)
                        field2=true;
                    if(!field1 && field2)
                        actionStart=option.FilterField(usableDataSource[j][column],_filterArray[i].fisrtActionType,_filterArray[i].firstValue);
                    else if(field1 && !field2)
                        actionStart=option.FilterField(usableDataSource[j][column],_filterArray[i].lastActionType,_filterArray[i].lastValue);
                    else if(!field1 && !field2)
                    {
                        var first=option.FilterField(usableDataSource[j][column],_filterArray[i].fisrtActionType,_filterArray[i].firstValue);
                        var two=option.FilterField(usableDataSource[j][column],_filterArray[i].lastActionType,_filterArray[i].lastValue);
                        if(_filterArray[i].actionBetween==0)
                            actionStart=(first && two);
                        else
                            actionStart=(first || two);
                    }
                    if(!actionStart)
                        isadd=false;
                }
                if(isadd)
                    {
                        temp[k]=usableDataSource[j];
                        k++;
                }
            }
            if(_filterArray.length==0)
                temp=usableDataSource;
            return temp;
         },
             //verilen 2 değer arasında action indexine göre işlem yapar
        FilterField:function(value1,actionIndex,value2)//value1 dizi, value2 input değeri
        {
            if(actionIndex==0)
                return (value1==value2);
            else if(actionIndex==1)
                return !(value1==value2);
            else if(actionIndex==2)
                return (value1.indexOf(value2)==0);
            else if(actionIndex==3)
                {
                    var index=value1.indexOf(value2);
                    if(index!=-1){
                        var last=value1.substring(index);
                        return (last==value2);
                    }
                    else
                        return false;
                }
             else if(actionIndex==4)
                 return value1.indexOf(value2)!=-1?true:false;
            else if(actionIndex==5)
                 return value1.indexOf(value2)!=-1?false:true;
            else
                return false;
        },
         GetActionOption:function(){
          var actionType=new Array();
            actionType.push("Is Equal To");
            actionType.push("Is Not Equal To");
            actionType.push("Start With");
            actionType.push("End With");
            actionType.push("Contains");
            actionType.push("Does Not Contains");
             return actionType;
         },
        GetPages:function(dataSource){
            //datasource optionDataSource ile değiştirildi
            var size=1;
            if(dataSource.length>option.pageSize)
            {
                if(dataSource.length%option.pageSize==0)
                    size=parseInt(dataSource.length/option.pageSize);
                else
                    size=parseInt(dataSource.length/option.pageSize)+1;
            }
            return size;
        },
            
        },option);
       
  //option.GetDataSource();
        option.load(0);
 
        $(".k-sorter").live("click",function(){
           var span=$(this).children(".k-i-arrow-s");
            var index=$(this).attr("id");
            if(span.length==0){
                SortAsc(index);
                
                 var html=$(this).html();
                $(".k-sorter[id="+index+"]").html(html+" "+_spans);
               
               
            }
            else
            {
                SortDesc(index);
                 $(span).remove();
               
            }
        });
        $(".k-i-number").live("click",function(){
            var index=$(this).attr("data-page");
            option.selectPageIndex=index;
            option.load(index-1);
        });
        $(".k-filter").live("click",function(){
           var filterform=$(this).parent().children(".filterform");
            if($(filterform).hasClass("filterformShow"))
                $(filterform).removeClass("filterformShow");
            else
            {
                
                $(filterform).addClass("filterformShow");
                var id=$(filterform).attr("id");
                for(var i=0;i<_filterArray.length;i++)
                {
                    if(_filterArray[i].columnId==id)
                    {
                        $(filterform).children("select").eq(0).val(_filterArray[i].fisrtActionType);
                        $(filterform).children("select").eq(1).val(_filterArray[i].actionBetween);
                        $(filterform).children("select").eq(2).val(_filterArray[i].lastActionType);
                         $(filterform).children("#first").val(_filterArray[i].firstValue);
                         $(filterform).children("#last").val(_filterArray[i].lastValue);
                        $(filterform).children("#btnfilter").css({"border":"1px solid yellow","enable":""});
                    }
                }
            }
        });
        $("#pages").live("change",function(){
           option.pageSize=$(this).val();
            option.load(0);
        });
        $(".first").live("click",function(){
           option.selectPageIndex=1;
            option.load(0);
        });
        $("#btnfilter").live("click",function(){
            var temp=new Array();var k=0;
            var parentDiv=$(this).parent();
            var filter=new Object();
            var select=$(parentDiv).children("select");
            filter.fisrtActionType=$(select).eq(0).val();
            filter.actionBetween=$(select).eq(1).val();
            filter.lastActionType=$(select).eq(2).val();
            filter.firstValue=$(parentDiv).children('#first').val();
            filter.lastValue=$(parentDiv).children('#last').val();
            filter.columnId=$(parentDiv).attr("id");
            for(var i=0;i<_filterArray.length;i++)
            {
                if(_filterArray[i].columnId!=filter.columnId){
                    temp[k]=_filterArray[i];
                    k++;
                }
            }
            _filterArray=temp;
            if(filter.firstValue!=undefined && filter.firstValue!=""){
                _filterArray.push(filter);
                fil=_filterArray;
            }
            option.load(0);
                
       });
        $("#btnclear").live("click",function(){
            var temp=new Array();var k=0;
             var parentDiv=$(this).parent();
            var id=$(parentDiv).attr("id");
            for(var i=0;i<_filterArray.length;i++)
            {
                if(_filterArray[i].columnId!=id){
                    temp[k]=_filterArray[i];
                    k++;
                }
            }
            _filterArray=temp;
             option.load(0);
        });
     $(".before").live("click",function(){
          var index=option.selectPageIndex-2<0?0:option.selectPageIndex-2;
         option.selectPageIndex=index+1;
            option.load(index);
        });
    $(".after").live("click",function(){
            var index=option.selectPageIndex<option.GetPages( option.tempDataSource)?option.selectPageIndex:option.selectPageIndex-1;
        option.selectPageIndex=index+1;
            option.load(index);
        });
    $(".last").live("click",function(){
            var index=option.GetPages( option.tempDataSource)-1;
         option.selectPageIndex=index+1;
            option.load(index);
        });
        function SortAsc(index)
        {
            var temp;
            for(var i=option.dataSource.length-1;i>=0;i--)
            {
                for(var j=1;j<=i;j++)
                {
                    //TODO
                    //delete 2 row before publish
                    var one=option.dataSource[j-1][option.columns[index].field];
                    var two=option.dataSource[j][option.columns[index].field];

                    if(option.dataSource[j-1][option.columns[index].field]>option.dataSource[j][option.columns[index].field])
                     {
                        for(var k=0;k<option.columns.length;k++){                                                                                 
                        temp=option.dataSource[j-1][option.columns[k].field];
                        option.dataSource[j-1][option.columns[k].field]=option.dataSource[j][option.columns[k].field];
                        option.dataSource[j][option.columns[k].field]=temp;
                        }
                     }
                }
            
            }
            option.load(option.selectPageIndex-1);
        }
        function SortDesc(index)
        {
            var temp;
            for(var i=option.dataSource.length-1;i>=0;i--)
            {
                for(var j=1;j<=i;j++)
                {
                    //TODO
                    //delete 2 row before publish
                    var one=option.dataSource[j-1][option.columns[index].field];
                    var two=option.dataSource[j][option.columns[index].field];

                    if(option.dataSource[j-1][option.columns[index].field]<option.dataSource[j][option.columns[index].field])
                     {
                        for(var k=0;k<option.columns.length;k++){                                                                                 
                        temp=option.dataSource[j-1][option.columns[k].field];
                        option.dataSource[j-1][option.columns[k].field]=option.dataSource[j][option.columns[k].field];
                        option.dataSource[j][option.columns[k].field]=temp;
                        }
                     }
                }
            
            }
             option.load(option.selectPageIndex-1);
        }
       return option;
     }
     
   
}( jQuery ));


