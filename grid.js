(function ($) {  
  $.fn.CreateGrid=function(option){
        var _queries='';
        var _spans="<span class='k-icon k-i-arrow-s'></span>";
       var _spann="<span class='k-icon k-i-arrow-n'></span>";
        var _spanfilter="<span class='k-icon k-filter'></span>";
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
            pageble:true,
            load:function(index){
                option.selectedDataSource=option.GetUsableDataSource(index);
            var table="<table class='"+option.class+"'>";
                    for(var i=0;i<option.columns.length;i++)
                    {
                        table+="<th class='"+option.GetheaderClass()+" k-header' id='"+i+"' role='columnheader' ";var style="style='";
                        if(option.columns[i].widht!=undefined)
                        {
                            style+="width:"+option.columns[i].widht+";";
                        }
                        table+=style+"'><span class='k-sorter' id='"+i+"'>"+ option.columns[i].title+"</span>"+_spanfilter +"</th>";
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
                    $("#table").html(table);                
            },
                
            GetFooter:function(){
            var str='<tr><td colspan="'+option.columns.length+'">'+
                '<a href="#" title="ilk sayfaya" class="k-link k-pager-nav k-pager-first k-state-disabled first"  tabindex="-1"><span class="k-icon k-i-seek-w">Go to the first page</span></a>'+
            '<a href="#" title="önceki sayfa" class="k-link k-pager-nav  k-state-disabled before"  tabindex="-1"><span class="k-icon k-i-arrow-w">Go to the previous page</span></a>';
                for(var i=1;i<=option.GetPages();i++)
                {
                    str+='<a tabindex="-1" href="#" class="k-i-number k-link" data-page="'+i+'">'+i+'</a>';
                }
                
                str+='<a href="#" title="sonraki sayfa" class="k-link k-pager-nav after"  tabindex="-1"><span class="k-icon k-i-arrow-e">Go to the next page</span></a><a href="#" title="son sayfa" class="k-link k-pager-nav k-pager-last last"  tabindex="-1"><span class="k-icon k-i-seek-e">Go to the last page</span></a>';
                
                //pages
                  str+=option.GetPageSelect();
                
            str+='</td></tr>';
            
                return str;
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
         GetUsableDataSource:function(index){
              option.selectedDataSource=new Array();
             var pageSize=option.GetPages();
             if(pageSize==1)
                 option.selectedDataSource=option.selectedDataSource.length==0?option.dataSource:option.selectedDataSource;
             else
             {
                if(index==0)
                {
                    for(var i=0;i<option.pageSize;i++)
                    {
                        option.selectedDataSource[i]=option.dataSource[i];
                    }
                }
                else
                 {
                     var last=((pageSize+1)*option.pageSize)<option.dataSource.length?(pageSize+1)*option.pageSize:option.dataSource.length;
                     var j=0;
                     for(var i=(pageSize-1)*option.pageSize;i<last;i++)
                     {
                         option.selectedDataSource[j]=option.dataSource[i];
                         j++;
                     }
                 }
             }
             return option.selectedDataSource;
         },
       
        GetPages:function(){
            var size=1;
            if(option.dataSource.length>option.pageSize)
            {
                if(option.dataSource.length%option.pageSize==0)
                    size=parseInt(option.dataSource.length/option.pageSize);
                else
                    size=parseInt(option.dataSource.length/option.pageSize)+1;
            }
            return size;
        },
            
        },option);
       
        option.load(0);
        $(".k-sorter").live("click",function(){
           var span=$(this).children(".k-i-arrow-s");
            var index=$(this).attr("id");
            if(span.length==0){
                SortAsc(index);
                
                 var html=$(this).html();
                $(".k-sorter[id="+index+"]").html(html+" "+_spans);
               
                /*
                var html=$(this).html();
                if(html.indexOf("<span")!=-1)
                {
                    html=html.substring(0,html.indexOf("<span"));
                   
                }
                 $(".k-header[id="+index+"]").html(html+" "+_spans);*/
            }
            else
            {
                SortDesc(index);
                 $(span).remove();
                /*var html=$(this).html();
                if(html.indexOf("<span")!=-1)
                {
                    html=html.substring(0,html.indexOf("<span"));
                    
                }
                $(".k-header[id="+index+"]").html(html);*/
            }
        });
        $(".k-i-number").live("click",function(){
            var index=$(this).attr("data-page");
            option.selectPageIndex=index;
            option.load(index-1);
        });
        $(".k-filter").live("click",function(){
           
        });
        $("#pages").live("change",function(){
           option.pageSize=$(this).val();
            option.load(0);
        });
        $(".first").live("click",function(){
           option.selectPageIndex=1;
            option.load(0);
        });
     $(".before").live("click",function(){
          var index=option.selectPageIndex-2<0?0:option.selectPageIndex-2;
         option.selectPageIndex=index+1;
            option.load(index);
        });
    $(".after").live("click",function(){
            var index=option.selectPageIndex<option.GetPages()?option.selectPageIndex:option.selectPageIndex-1;
        option.selectPageIndex=index+1;
            option.load(index);
        });
    $(".last").live("click",function(){
            var index=option.GetPages()-1;
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

