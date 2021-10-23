$(document).ready(function()
{

    $("#filter-by").click(function()
    {
        var fButton=document.getElementsByClassName("filter-button");
        for(var k=0;k<fButton.length;k++)
        {
            fButton[k].style.visibility="visible";
        }
    });

    $(".filter-button").click(function(e)
    {
        var column=$(this).text();
        //console.log(column); 
        var menu=new Set();
        var eventParent=e.target.parentNode;
        var divParent=document.getElementsByClassName("filter-div");
        var length=divParent.length;
        for(var k=0;k<length;k++)
        {
            if(divParent[k].children[1]!=null)
            {
                divParent[k].removeChild(divParent[k].children[1]);
            }
        }

        $.get('/get-filter-menu',function(d)
        {
            var data=JSON.parse(d);

            //fill with location
            if(column=="Location")
            {
                for(var k=0;k<data.length;k++)
                {
                    menu.add(data[k]["Location"]);
                }
                var itr=menu.values();
                var childDiv=document.createElement("DIV");
                childDiv.id="filter-menu-base";
                for(var i of itr)
                {
                    //console.log(i);
                    var childButton=document.createElement("BUTTON");
                    childButton.className="filter-menu";
                    childButton.appendChild(document.createTextNode(i));
                    childDiv.appendChild(childButton);
                }
                eventParent.appendChild(childDiv);
            }

            //fill with Sub_type
            else if(column=="Sub Type")
            {
                for(var k=0;k<data.length;k++)
                {
                    menu.add(data[k]["Sub_type"]);
                }
                var itr=menu.values();
                var childDiv=document.createElement("DIV");
                childDiv.id="filter-menu-base";
                for(var i of itr)
                {
                    //console.log(i);
                    var childButton=document.createElement("BUTTON");
                    childButton.className="filter-menu";
                    childButton.appendChild(document.createTextNode(i));
                    childDiv.appendChild(childButton);
                }
                eventParent.appendChild(childDiv);
            }

            else if(column=="Service")
            {
                var childDiv=document.createElement("DIV");
                childDiv.id="filter-menu-base";
                var childButton=document.createElement("BUTTON");
                childButton.className="filter-menu";
                childButton.appendChild(document.createTextNode("Electricity"));
                childDiv.appendChild(childButton);

                childButton=document.createElement("BUTTON");
                childButton.className="filter-menu";
                childButton.appendChild(document.createTextNode("Water"));
                childDiv.appendChild(childButton);
                eventParent.appendChild(childDiv);
            }
        });

        var filterDiv=document.getElementsByClassName("filter-div");
        var fButton=document.getElementsByClassName("filter-button");
        var c=-1;
        for(var k=0;k<filterDiv.length;k++)
        {
            if(filterDiv[k]==eventParent)
            {
                c=k;
            }
            else if(c!=-1&&c<k)
            {
                fButton[k].style.top="-120px";
            }
        }
    });

    $(".cancel").click(function()
    {
        var divParent=document.getElementsByClassName("filter-div");
        var c=0;
        var length=divParent.length;
        for(var k=0;k<length;k++)
        {
            if(divParent[k].children[1]!=null)
            {
                divParent[k].removeChild(divParent[k].children[1]);
                c=k;
            }
        }
        var fButton=document.getElementsByClassName("filter-button");
        for(var k=0;k<length;k++)
        {
            fButton[k].style.visibility="hidden";
            if(c<k)
            {
                fButton[k].style.top="0px";
            }
        }
    });

     $(".filter-div").on("click",".filter-menu",function(e)
     {
        var maxRow=2;
        var eventParent=e.target.parentNode;
        var column=$(eventParent.parentNode.children[0]).text();
        var value=$(e.target).text();
        $("#prev").data("column",column);
        $("#prev").data("value",value);
        $("#next").data("column",column);
        $("#next").data("value",value);

        $.post('get-filter-data',
        {
            column:column,
            value:value
        },
        function(d)
        {
            var data=JSON.parse(d);
            console.log(data);

            var fTable=document.getElementById("filter-table");
            var length=fTable.rows.length;

            if(length>0)
            {
                for(var k=0;k<length;k++)
                {
                    fTable.deleteRow(0);
                }
            }

            var row=fTable.insertRow(0);

            var h1=document.createElement("TH");
            var h2=document.createElement("TH");
            var h3=document.createElement("TH");
            var h4=document.createElement("TH");
            var h5=document.createElement("TH");
            var h6=document.createElement("TH");
            var h7=document.createElement("TH");
            
            h1.appendChild(document.createTextNode("ID"));
            h2.appendChild(document.createTextNode("Username"));
            h3.appendChild(document.createTextNode("Email"));
            h4.appendChild(document.createTextNode("Location"));
            h5.appendChild(document.createTextNode("Sub Type"));
            h6.appendChild(document.createTextNode("Electricity Service"));
            h7.appendChild(document.createTextNode("Water Service"));
            
            row.appendChild(h1);
            row.appendChild(h2);
            row.appendChild(h3);
            row.appendChild(h4);
            row.appendChild(h5);
            row.appendChild(h6);
            row.appendChild(h7);

            length=0;
            
            for(var k=0;k<maxRow;k++)
            {
                if(data[k]!=null)
                {
                    length++;
                row=fTable.insertRow(length);
                var cell=row.insertCell(0);
                cell.appendChild(document.createTextNode(data[k]["ID"]));

                cell=row.insertCell(1);
                cell.appendChild(document.createTextNode(data[k]["Username"]));

                cell=row.insertCell(2);
                cell.appendChild(document.createTextNode(data[k]["Email"]));

                cell=row.insertCell(3);
                cell.appendChild(document.createTextNode(data[k]["Location"]));

                cell=row.insertCell(4);
                cell.appendChild(document.createTextNode(data[k]["Sub_type"]));
                
                cell=row.insertCell(5);
                if(data[k]["Elec_service"]!=null)
                {
                    cell.appendChild(document.createTextNode(data[k]["Elec_service"]));
                }
                else
                {
                    cell.appendChild(document.createTextNode(""));
                }
                cell=row.insertCell(6);
                if(data[k]["Water_service"]!=null)
                {
                    cell.appendChild(document.createTextNode(data[k]["Water_service"]));
                }
                else
                {
                    cell.appendChild(document.createTextNode(""));
                }

            }
           }

            var divParent=document.getElementsByClassName("filter-div");
            var c=0;
            length=divParent.length;
            for(var k=0;k<length;k++)
            {
                if(divParent[k].children[1]!=null)
                {
                    divParent[k].removeChild(divParent[k].children[1]);
                    c=k;
                }
            }
            var fButton=document.getElementsByClassName("filter-button");
            for(var k=0;k<length;k++)
            {
                fButton[k].style.visibility="hidden";
                if(c<k)
                {
                    fButton[k].style.top="0px";
                }
            }


        });
     });

     $("#next").click(function()
     {
         var maxRow=2;
         var column=$(this).data("column");
         var value=$(this).data("value");
         //console.log(column+" "+value);

         $.post('get-filter-data',
         {
             column:column,
             value:value
         },
         function(d)
         {
             var data=JSON.parse(d);
             //console.log(data);

             for(var i=0;i<data.length;i++)
             {
                 data[i]["Index"]=i;
             }

             var jsonObj={};
             for(var k=0;k<data.length;k++)
             {
                 var idx=data[k]["ID"].toString();
                 jsonObj[idx]=data[k];
             }

             var baseData=JSON.parse(JSON.stringify(jsonObj));
             //console.log(baseData);

             var fTable=document.getElementById("filter-table");
             var length=fTable.rows.length;

             var id=fTable.rows[length-1].cells[0].innerHTML;
             var lastIndex=baseData[id]["Index"];
             console.log(lastIndex);

             var start=lastIndex+1;

             if(length>0&& data[start]!=null)
             {
                 for(var k=0;k<length-1;k++)
                 {
                     fTable.deleteRow(1);
                 }
             }

            length=0;
             for(var k=0;k<maxRow;k++)
             {
                 if(data[start]!=null)
                 {
                     length++;
                 row=fTable.insertRow(length);
                 var cell=row.insertCell(0);
                 cell.appendChild(document.createTextNode(data[start]["ID"]));
 
                 cell=row.insertCell(1);
                 cell.appendChild(document.createTextNode(data[start]["Username"]));
 
                 cell=row.insertCell(2);
                 cell.appendChild(document.createTextNode(data[start]["Email"]));
 
                 cell=row.insertCell(3);
                 cell.appendChild(document.createTextNode(data[start]["Location"]));
 
                 cell=row.insertCell(4);
                 cell.appendChild(document.createTextNode(data[start]["Sub_type"]));

                 cell=row.insertCell(5);
                 if(data[start]["Elec_service"]!=null)
                 {
                     cell.appendChild(document.createTextNode(data[start]["Elec_service"]));
                 }
                 else
                 {
                     cell.appendChild(document.createTextNode(""));
                 }
                 cell=row.insertCell(6);
                 if(data[start]["Water_service"]!=null)
                 {
                     cell.appendChild(document.createTextNode(data[start]["Water_service"]));
                 }
                 else
                 {
                     cell.appendChild(document.createTextNode(""));
                 }
             }
             start++;
            }
         });

     });

     $("#prev").click(function()
     {
        var maxRow=2;
        var fTable=document.getElementById("filter-table");
        var length=fTable.rows.length;
        
        var column=$(this).data("column");
        var value=$(this).data("value");
        //console.log(column+" "+value);

        $.post('get-filter-data',
        {
            column:column,
            value:value
        },
        function(d)
        {
            var data=JSON.parse(d);
            console.log(data);

            for(var i=0;i<data.length;i++)
            {
                data[i]["Index"]=i;
            }

            var jsonObj={};
            for(var k=0;k<data.length;k++)
            {
                var idx=data[k]["ID"].toString();
                jsonObj[idx]=data[k];
            }

            var baseData=JSON.parse(JSON.stringify(jsonObj));
            console.log(baseData);

            var firstIndex=fTable.rows[1].cells[0].innerHTML;
            var start=baseData[firstIndex]["Index"]-2;

            if(length>0 && data[start]!=null)
            {
                for(var k=0;k<length-1;k++)
                {
                    fTable.deleteRow(1);
                }
            }

            length=0;
            for(var k=0;k<maxRow;k++)
            {
                if(data[start]!=null)
                {
                    length++;
                row=fTable.insertRow(length);
                var cell=row.insertCell(0);
                cell.appendChild(document.createTextNode(data[start]["ID"]));

                cell=row.insertCell(1);
                cell.appendChild(document.createTextNode(data[start]["Username"]));

                cell=row.insertCell(2);
                cell.appendChild(document.createTextNode(data[start]["Email"]));

                cell=row.insertCell(3);
                cell.appendChild(document.createTextNode(data[start]["Location"]));

                cell=row.insertCell(4);
                cell.appendChild(document.createTextNode(data[start]["Sub_type"]));

                cell=row.insertCell(5);
                if(data[start]["Elec_service"]!=null)
                {
                    cell.appendChild(document.createTextNode(data[start]["Elec_service"]));
                }
                else
                {
                    cell.appendChild(document.createTextNode(""));
                }
                cell=row.insertCell(6);
                if(data[start]["Water_service"]!=null)
                {
                    cell.appendChild(document.createTextNode(data[start]["Water_service"]));
                }
                else
                {
                    cell.appendChild(document.createTextNode(""));
                }
                start++;   
            }
           }

        });


     });

});




