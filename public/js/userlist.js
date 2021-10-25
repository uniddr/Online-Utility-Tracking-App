var lmc = document.getElementById("leftmenucont");
var pboc = document.getElementById("profbtnoptcont");


document.addEventListener('click', function() {
    lmc.style.width = "0";

    pboc.style.display = "none";
});

lmc.addEventListener("transitionend", function() {
    if(document.getElementById("leftmenuopt").style.display == "block")
    {
        document.getElementById("leftmenuopt").style.display = "none";
    }
    else
    {
        document.getElementById("leftmenuopt").style.display = "block";
    }
});

lmc.addEventListener("transitionstart", function() {
    document.getElementById("leftmenuopt").style.display = "none";
});

document.getElementById("menuicon").addEventListener('click', function() {
    pboc.style.display = "none";

    lmc.style.width = "200px";

    event.stopPropagation();
});

document.getElementById("leftmenuback").addEventListener("click", function() {
    lmc.style.width = "0";
    event.stopPropagation();
});

document.getElementById("profcont").addEventListener('click', function() {
    lmc.style.width = "0";

    pboc.style.display = "inline";
    
    event.stopPropagation();
});


document.getElementById("leftmenucont").addEventListener('click', function() {
    event.stopPropagation();
});


document.getElementById("profbtnoptcont").getElementsByTagName("a")[0].addEventListener("click", function() {
    jQuery.ajax({
        async: "true",
        url: "/logout",
        type: "POST",
        success: function(result, status, xhr) {
            if(status == "success")
            {
                // alert(`${xhr.status}: ${xhr.statusText}`);
            }
            else
            {
                alert("Failed to logout!");
            }
        },
        complete: function(xhr, status) {
            if(status == "success")
            {
                window.location.href = "/";
            }
        }
    });
    event.stopPropagation();
});








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
        var maxRow=10;
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

                var url="";
                var a=document.createElement("A");
                a.appendChild(document.createTextNode(data[k]["ID"]));
                url="/detail?"+"u_id="+data[k]["ID"];
                a.href=url;
                var cell=row.insertCell(0);
                cell.appendChild(a);

                a=document.createElement("A");
                a.appendChild(document.createTextNode(data[k]["Username"]));
                url="/detail?"+"u_id="+data[k]["ID"];
                a.href=url;
                cell=row.insertCell(1);
                cell.appendChild(a);

                a=document.createElement("A");
                a.appendChild(document.createTextNode(data[k]["Email"]));
                url="/detail?"+"u_id="+data[k]["ID"];
                a.href=url;
                cell=row.insertCell(2);
                cell.appendChild(a);

                a=document.createElement("A");
                a.appendChild(document.createTextNode(data[k]["Location"]));
                url="/detail?"+"u_id="+data[k]["ID"];
                a.href=url;
                cell=row.insertCell(3);
                cell.appendChild(a);

                a=document.createElement("A");
                a.appendChild(document.createTextNode(data[k]["Sub_type"]));
                url="/detail?"+"u_id="+data[k]["ID"];
                a.href=url;
                cell=row.insertCell(4);
                cell.appendChild(a);
                
                a=document.createElement("A");
                a.appendChild(document.createTextNode(data[k]["Elec_service"]));
                url="/detail?"+"u_id="+data[k]["ID"];
                a.href=url;
                cell=row.insertCell(5);
                if(data[k]["Elec_service"]!=null)
                {
                    cell.appendChild(a);
                }
                else
                {
                    cell.appendChild(document.createTextNode(""));
                }

                a=document.createElement("A");
                a.appendChild(document.createTextNode(data[k]["Water_service"]));
                url="/detail?"+"u_id="+data[k]["ID"];
                a.href=url;
                cell=row.insertCell(6);
                if(data[k]["Water_service"]!=null)
                {
                    cell.appendChild(a);
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

            document.getElementById("prev").style.visibility="visible";
            document.getElementById("next").style.visibility="visible";
        });
     });

     $("#next").click(function()
     {
         var maxRow=10;
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

             var id=fTable.rows[length-1].cells[0].textContent;
             //console.log(id);
             var lastIndex=baseData[id]["Index"];
             //console.log(lastIndex);

             var start=lastIndex+1;
             var url="";

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

                var a=document.createElement("A");
                a.appendChild(document.createTextNode(data[start]["ID"]));
                url="/detail?"+"u_id="+data[start]["ID"];
                a.href=url;
                var cell=row.insertCell(0);
                cell.appendChild(a);
 
                a=document.createElement("A");
                a.appendChild(document.createTextNode(data[start]["Username"]));
                url="/detail?"+"u_id="+data[start]["ID"];
                a.href=url;
                cell=row.insertCell(1);
                cell.appendChild(a);
 
                a=document.createElement("A");
                a.appendChild(document.createTextNode(data[start]["Email"]));
                url="/detail?"+"u_id="+data[start]["ID"];
                a.href=url;
                cell=row.insertCell(2);
                cell.appendChild(a);
 
                a=document.createElement("A");
                a.appendChild(document.createTextNode(data[start]["Location"]));
                url="/detail?"+"u_id="+data[start]["ID"];
                a.href=url;
                cell=row.insertCell(3);
                cell.appendChild(a);
 
                a=document.createElement("A");
                a.appendChild(document.createTextNode(data[start]["Sub_type"]));
                url="/detail?"+"u_id="+data[start]["ID"];
                a.href=url;
                cell=row.insertCell(4);
                cell.appendChild(a);

                a=document.createElement("A");
                a.appendChild(document.createTextNode(data[start]["Elec_service"]));
                url="/detail?"+"u_id="+data[start]["ID"];
                a.href=url;
                cell=row.insertCell(5);
                 if(data[start]["Elec_service"]!=null)
                 {
                     cell.appendChild(a);
                 }
                 else
                 {
                     cell.appendChild(document.createTextNode(""));
                 }

                 a=document.createElement("A");
                 a.appendChild(document.createTextNode(data[start]["Water_service"]));
                 url="/detail?"+"u_id="+data[start]["ID"];
                 a.href=url;
                 cell=row.insertCell(6);
                 if(data[start]["Water_service"]!=null)
                 {
                     cell.appendChild(a);
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

     $("#prev").click(function()
     {
        var maxRow=10;
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

            var firstIndex=fTable.rows[1].cells[0].textContent;
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
   
                   var a=document.createElement("A");
                   a.appendChild(document.createTextNode(data[start]["ID"]));
                   url="/detail?"+"u_id="+data[start]["ID"];
                   a.href=url;
                   var cell=row.insertCell(0);
                   cell.appendChild(a);
    
                   a=document.createElement("A");
                   a.appendChild(document.createTextNode(data[start]["Username"]));
                   url="/detail?"+"u_id="+data[start]["ID"];
                   a.href=url;
                   cell=row.insertCell(1);
                   cell.appendChild(a);
    
                   a=document.createElement("A");
                   a.appendChild(document.createTextNode(data[start]["Email"]));
                   url="/detail?"+"u_id="+data[start]["ID"];
                   a.href=url;
                   cell=row.insertCell(2);
                   cell.appendChild(a);
    
                   a=document.createElement("A");
                   a.appendChild(document.createTextNode(data[start]["Location"]));
                   url="/detail?"+"u_id="+data[start]["ID"];
                   a.href=url;
                   cell=row.insertCell(3);
                   cell.appendChild(a);
    
                   a=document.createElement("A");
                   a.appendChild(document.createTextNode(data[start]["Sub_type"]));
                   url="/detail?"+"u_id="+data[start]["ID"];
                   a.href=url;
                   cell=row.insertCell(4);
                   cell.appendChild(a);
   
                   a=document.createElement("A");
                   a.appendChild(document.createTextNode(data[start]["Elec_service"]));
                   url="/detail?"+"u_id="+data[start]["ID"];
                   a.href=url;
                   cell=row.insertCell(5);
                    if(data[start]["Elec_service"]!=null)
                    {
                        cell.appendChild(a);
                    }
                    else
                    {
                        cell.appendChild(document.createTextNode(""));
                    }
   
                    a=document.createElement("A");
                    a.appendChild(document.createTextNode(data[start]["Water_service"]));
                    url="/detail?"+"u_id="+data[start]["ID"];
                    a.href=url;
                    cell=row.insertCell(6);
                    if(data[start]["Water_service"]!=null)
                    {
                        cell.appendChild(a);
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

const modal = document.querySelector('#my-modal');
const modalBtn = document.querySelector('.new-user');
const closeBtn = document.querySelector('.close');

// Events
modalBtn.addEventListener('click', openModal);
closeBtn.addEventListener('click', closeModal);
window.addEventListener('click', outsideClick);

// Open
function openModal() {
    modal.style.display = 'block';
}

// Close
function closeModal() {
    modal.style.display = 'none';
}

// Close If Outside Click
function outsideClick(e) {
    if (e.target == modal) {
        modal.style.display = 'none';
    }
}




