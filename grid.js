(function ($) {  
  $.fn.CreateGrid=function(option){
        var _queries='';
        var _spans="<span class='k-icon k-i-arrow-s'></span>";
       var _spann="<span class='k-icon k-i-arrow-n'></span>";
        option = $.extend({
            dataSource:new Array(),
            selectedDataSource:new Array(),
            columns:new Array(),
            widht:'auto',
            height:'auto',
            class:'',
            headerClass:'',
            rowClass:'',
            load:function(){
                option.selectedDataSource=option.GetUsableDataSource();
            var table="<table class='"+option.class+"'>";
                    for(var i=0;i<option.columns.length;i++)
                    {
                        table+="<th class='"+option.GetheaderClass()+" k-header' id='"+i+"' role='columnheader' ";var style="style='";
                        if(option.columns[i].widht!=undefined)
                        {
                            style+="width:"+option.columns[i].widht+";";
                        }
                        table+=style+"'>"+ option.columns[i].title+"</th>";
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
                    table+="</table>";
                    $("#table").html(table);                
            },
                
           GetheaderClass:function (){
            var rt='grHeader';
            return option.headerClass!=''?option.headerClass:rt;
           },
        
          GetrowClass:function(){
            var rt='grRow';
            return option.rowClass!=''?option.rowClass:rt;
          },
         GetUsableDataSource:function(){
            return option.selectedDataSource.length==0?option.dataSource:option.selectedDataSource;
         },
        
            
        },option);
       
        option.load();
        $(".k-header").live("click",function(){
           var span=$(this).children(".k-i-arrow-s");
            var index=$(this).attr("id");
            if(span.length==0){
                SortAsc(index);
                var html=$(this).html();
                if(html.indexOf("<span")!=-1)
                {
                    html=html.substring(0,html.indexOf("<span"));
                   
                }
                 $(".k-header[id="+index+"]").html(html+" "+_spans);
            }
            else
            {
                SortDesc(index);
                var html=$(this).html();
                if(html.indexOf("<span")!=-1)
                {
                    html=html.substring(0,html.indexOf("<span"));
                    
                }
                $(".k-header[id="+index+"]").html(html);
            }
        });
        function SortAsc(index)
        {
             var sortedDataSource=new Array();
            var temp;
            for(var i=option.selectedDataSource.length-1;i>=0;i--)
            {
                for(var j=1;j<=i;j++)
                {
                    var one=option.selectedDataSource[j-1][option.columns[index].field];
                    var two=option.selectedDataSource[j][option.columns[index].field];

                    if(option.selectedDataSource[j-1][option.columns[index].field]>option.selectedDataSource[j][option.columns[index].field])
                     {
                        for(var k=0;k<option.columns.length;k++){                                                                                 
                        temp=option.selectedDataSource[j-1][option.columns[k].field];
                        option.selectedDataSource[j-1][option.columns[k].field]=option.selectedDataSource[j][option.columns[k].field];
                        option.selectedDataSource[j][option.columns[k].field]=temp;
                        }
                     }
                }
            
            }
            option.load();
        }
        function SortDesc(index)
        {
             var sortedDataSource=new Array();
            var temp;
            for(var i=option.selectedDataSource.length-1;i>=0;i--)
            {
                for(var j=1;j<=i;j++)
                {
                    var one=option.selectedDataSource[j-1][option.columns[index].field];
                    var two=option.selectedDataSource[j][option.columns[index].field];

                    if(option.selectedDataSource[j-1][option.columns[index].field]<option.selectedDataSource[j][option.columns[index].field])
                     {
                        for(var k=0;k<option.columns.length;k++){                                                                                 
                        temp=option.selectedDataSource[j-1][option.columns[k].field];
                        option.selectedDataSource[j-1][option.columns[k].field]=option.selectedDataSource[j][option.columns[k].field];
                        option.selectedDataSource[j][option.columns[k].field]=temp;
                        }
                     }
                }
            
            }
            option.load();
        }
       return option;
     }
    
}( jQuery ));

