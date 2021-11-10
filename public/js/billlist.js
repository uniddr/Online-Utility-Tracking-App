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

        $.get('/get-filter-bill-menu',function(d)
        {
            var data=JSON.parse(d);
            console.log(data);

            //fill with location
            if(column=="Issue Year")
            {
                for(var k=0;k<data.length;k++)
                {
                    menu.add(data[k]["issue"]);
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
                fButton[k].style.top="-40px";
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
        var user_id=document.getElementById("user-id-input");
        user_id.value="";

        $("#prev").data("column",column);
        $("#prev").data("value",value);
        $("#next").data("column",column);
        $("#next").data("value",value);

        $.post('get-filter-bill-data',
        {
            column:column,
            value:value,
            user_id: ""
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
            var h8=document.createElement("TH");
            var h9=document.createElement("TH");
            
            h1.appendChild(document.createTextNode("Bill ID"));
            h2.appendChild(document.createTextNode("User ID"));
            h3.appendChild(document.createTextNode("Issue Date"));
            h4.appendChild(document.createTextNode("Payment Date"));
            h5.appendChild(document.createTextNode("Used Resource"));
            h6.appendChild(document.createTextNode("Usage Cost"));
            h7.appendChild(document.createTextNode("Total Payable"));
            h8.appendChild(document.createTextNode("Paid Amount"));
            h9.appendChild(document.createTextNode("Due Amount"));
            
            
            row.appendChild(h1);
            row.appendChild(h2);
            row.appendChild(h3);
            row.appendChild(h4);
            row.appendChild(h5);
            row.appendChild(h6);
            row.appendChild(h7);
            row.appendChild(h8);
            row.appendChild(h9);

            length=0;
            
            for(var k=0;k<maxRow;k++)
            {
                if(data[k]!=null)
                {

                length++;
                row=fTable.insertRow(length);

                var cell=row.insertCell(0);
                cell.appendChild(document.createTextNode(data[k]["bill_id"]));

                cell=row.insertCell(1);
                cell.appendChild(document.createTextNode(data[k]["user_id"]));

                var date="";
                a=document.createElement("A");
               // console.log("Issue_Date : "+data[k]["issue_date"]);
                if(data[k]["issue_date"]!=null)
               {
                cell=row.insertCell(2);
                date=new Date(data[k]["issue_date"]);
                console.log(date);
                cell.appendChild(document.createTextNode(date.toString().substr(3,12)));
               }
               else
               {
                   cell=row.insertCell(2);
                   cell.appendChild(document.createTextNode("---"));
               }

                if(data[k]["payment_date"]!=null)
               {
                cell=row.insertCell(3);
                date=new Date(data[k]["payment_date"]);
                //console.log(date);
                cell.appendChild(document.createTextNode(date.toString().substr(3,12)));
                
               }
               else
               {
                   cell=row.insertCell(3);
                   cell.appendChild(document.createTextNode("---"));
               }
               
                cell=row.insertCell(4);
                cell.appendChild(document.createTextNode(data[k]["used_resource"]));
                
                cell=row.insertCell(5);
                cell.appendChild(document.createTextNode(data[k]["usage_cost"]));

                cell=row.insertCell(6);
                cell.appendChild(document.createTextNode(data[k]["total_payable"]));
                
                cell=row.insertCell(7);
                cell.appendChild(document.createTextNode(data[k]["paid_amount"]));

                cell=row.insertCell(8);
                cell.appendChild(document.createTextNode(data[k]["due_amount"]));

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
         var user_id=document.getElementById("user-id-input").value;
         //console.log(column+" "+value);

         $.post('get-filter-bill-data',
         {
             column:column,
             value:value,
             user_id:user_id
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
                 var idx=data[k]["bill_id"].toString();
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
                 cell.appendChild(document.createTextNode(data[start]["bill_id"]));
 
                var cell=row.insertCell(1);
                cell.appendChild(document.createTextNode(data[start]["user_id"]));
 
                var date="";
                if(data[start]["issue_date"]!=null)
                {
                 cell=row.insertCell(2);
                 date=new Date(data[start]["issue_date"]);
                 //console.log(date);
                 cell.appendChild(document.createTextNode(date.toString().substr(3,12)));
                }
                else
                {
                    cell=row.insertCell(2);
                    cell.appendChild(document.createTextNode("---"));
                }
 
                 if(data[start]["payment_date"]!=null)
                {
                 cell=row.insertCell(3);
                 date=new Date(data[start]["payment_date"]);
                 //console.log(date);
                 cell.appendChild(document.createTextNode(date.toString().substr(3,12)));
                }
                else
                {
                    cell=row.insertCell(3);
                    cell.appendChild(document.createTextNode("---"));
                } 
 
                cell=row.insertCell(4);
                cell.appendChild(document.createTextNode(data[start]["used_resource"]));

                cell=row.insertCell(5);
                cell.appendChild(document.createTextNode(data[start]["usage_cost"]));

                cell=row.insertCell(6);
                cell.appendChild(document.createTextNode(data[start]["total_payable"]));

                cell=row.insertCell(7);
                cell.appendChild(document.createTextNode(data[start]["paid_amount"]));

                cell=row.insertCell(8);
                cell.appendChild(document.createTextNode(data[start]["due_amount"]));
                
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
        var user_id=document.getElementById("user-id-input").value;
        //console.log(column+" "+value);

        $.post('get-filter-bill-data',
        {
            column:column,
            value:value,
            user_id:user_id
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
                var idx=data[k]["bill_id"].toString();
                jsonObj[idx]=data[k];
            }

            var baseData=JSON.parse(JSON.stringify(jsonObj));
            console.log(baseData);

            var firstIndex=fTable.rows[1].cells[0].textContent;
            var start=baseData[firstIndex]["Index"]-maxRow;

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
                    cell.appendChild(document.createTextNode(data[start]["bill_id"]));
     
                    cell=row.insertCell(1);
                    cell.appendChild(document.createTextNode(data[start]["user_id"]));
     
                    var date="";
                    if(data[start]["issue_date"]!=null)
                    {
                    date=new Date(data[start]["issue_date"]);
                    cell=row.insertCell(2);
                     //console.log(date);
                     cell.appendChild(document.createTextNode(date.toString().substr(3,12)));
                    }
                    else
                    {
                        cell=row.insertCell(2);
                        cell.appendChild(document.createTextNode(""));
                    }
     
                    
                     if(data[start]["payment_date"]!=null)
                    {
                     date=new Date(data[start]["payment_date"]);
                     cell=row.insertCell(3);
                     //console.log(date);
                     cell.appendChild(document.createTextNode(date.toString().substr(3,12)));
                    }
                    else
                    {
                        cell=row.insertCell(3);
                        cell.appendChild(document.createTextNode("---"));
                    }     
     
                    cell=row.insertCell(4);
                    cell.appendChild(document.createTextNode(data[start]["used_resource"]));
    
                    cell=row.insertCell(5);
                    cell.appendChild(document.createTextNode(data[start]["usage_cost"]));
    
                    cell=row.insertCell(6);
                    cell.appendChild(document.createTextNode(data[start]["total_payable"]));
    
                    cell=row.insertCell(7);
                    cell.appendChild(document.createTextNode(data[start]["paid_amount"]));
    
                    cell=row.insertCell(8);
                    cell.appendChild(document.createTextNode(data[start]["due_amount"]));

                start++;   
            }
           }

        });


     });

     $(".submit-user-id").click(function()
     {
        var maxRow=10;
        var column=$("#prev").data("column");
        var value=$("#prev").data("value");
        console.log(column+" "+value);
        var user_id=document.getElementById("user-id-input").value;

        $.post('get-filter-bill-data',
        {
            column:column,
            value:value,
            user_id:user_id
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
            var h8=document.createElement("TH");
            var h9=document.createElement("TH");
            

            h1.appendChild(document.createTextNode("Bill ID"));
            h2.appendChild(document.createTextNode("User ID"));
            h3.appendChild(document.createTextNode("Issue Date"));
            h4.appendChild(document.createTextNode("Payment Date"));
            h5.appendChild(document.createTextNode("Used Resource"));
            h6.appendChild(document.createTextNode("Usage Cost"));
            h7.appendChild(document.createTextNode("Total Payable"));
            h8.appendChild(document.createTextNode("Paid Amount"));
            h9.appendChild(document.createTextNode("Due Amount"));
            
            
            row.appendChild(h1);
            row.appendChild(h2);
            row.appendChild(h3);
            row.appendChild(h4);
            row.appendChild(h5);
            row.appendChild(h6);
            row.appendChild(h7);
            row.appendChild(h8);
            row.appendChild(h9);

            length=0;
            
            for(var k=0;k<maxRow;k++)
            {
                if(data[k]!=null)
                {
                    if(data[k]!=null)
                    {
    
                    length++;
                    row=fTable.insertRow(length);
    
                    var cell=row.insertCell(0);
                    cell.appendChild(document.createTextNode(data[k]["bill_id"]));
    
                    cell=row.insertCell(1);
                    cell.appendChild(document.createTextNode(data[k]["user_id"]));
    
                    var date="";
                    a=document.createElement("A");
                   // console.log("Issue_Date : "+data[k]["issue_date"]);
                    if(data[k]["issue_date"]!=null)
                   {
                    cell=row.insertCell(2);
                    date=new Date(data[k]["issue_date"]);
                    console.log(date);
                    cell.appendChild(document.createTextNode(date.toString().substr(3,12)));
                   }
                   else
                   {
                       cell=row.insertCell(2);
                       cell.appendChild(document.createTextNode("---"));
                   }
    
                    if(data[k]["payment_date"]!=null)
                   {
                    cell=row.insertCell(3);
                    date=new Date(data[k]["payment_date"]);
                    //console.log(date);
                    cell.appendChild(document.createTextNode(date.toString().substr(3,12)));
                    
                   }
                   else
                   {
                       cell=row.insertCell(3);
                       cell.appendChild(document.createTextNode("---"));
                   }
                   
                    cell=row.insertCell(4);
                    cell.appendChild(document.createTextNode(data[k]["used_resource"]));
                    
                    cell=row.insertCell(5);
                    cell.appendChild(document.createTextNode(data[k]["usage_cost"]));
    
                    cell=row.insertCell(6);
                    cell.appendChild(document.createTextNode(data[k]["total_payable"]));
                    
                    cell=row.insertCell(7);
                    cell.appendChild(document.createTextNode(data[k]["paid_amount"]));
    
                    cell=row.insertCell(8);
                    cell.appendChild(document.createTextNode(data[k]["due_amount"]));
    
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

     $("#service").change(function()
     {
         var input=document.querySelectorAll("input[type='text']");
         for(var k=0;k<input.length;k++)
         {
             input[k].value="";
         }
     });

     $("#user_id").change(function()
     {
         var i_date=document.getElementById("issue_date");
         var p_date=document.getElementById("payment_date");;
         var used=document.getElementById("used_resource");
         var extra=document.getElementById("extra_cost");
         var usage_cost=document.getElementById("usage_cost");

         var id=document.getElementById("user_id").value;
         var date=new Date().toISOString().substr(0,8)+"01";
         var service=$("#service").children("option:selected").val();
         console.log(id+" "+date+" "+service);

         i_date.value=date;
         $.post('/get-used_amount',
         {
             date:date,
             id: id,
             service:service
         },
         function(data)
         {
             var res=JSON.parse(data);
             console.log(res);
             if(res.length==1)
             {
               var used_amount=res[0]["used_amount"];
               used.value=used_amount;
             }
             else
             {
                 used.value=0;
             }

         });

         $.post('/get-due_bill',
         {
             id: id,
             service:service
         },
         function(data)
         {
             var res=JSON.parse(data);
             console.log(res);
             if(res.length==1 && service=="Water")
             {
                  var due_bill=res[0]["water_due"];
                  if(due_bill!=null)
                  {
                      extra.value=due_bill;
                  }
                  else
                  {
                      extra.value=0;
                  }
             }

             else if(res.length==1 && service=="Electricity")
             {
                  var due_bill=res[0]["elec_due"];
                  if(due_bill!=null)
                  {
                      extra.value=due_bill;
                  }
                  else
                  {
                      extra.value=0;
                  }
             }
             else
             {
                 extra.value=0;
             }
         });

         $.post('/get-usage_cost',
         {
             id: id,
             service:service,
             date:date
         },
         function(data)
         {
             var res=JSON.parse(data);
             console.log(res);
             if(res.length==1)
             {
                  var cost=res[0]["usage_cost"];
                  if(cost!=null)
                  {
                      usage_cost.value=cost;
                  }
             }
             else
             {
                 usage_cost.value=0;
             }
         });

     });

     $("#filter-table").on("click","tr",function(e)
     {
             var bill_id=document.getElementById("edit-bill_id");
             var user_id=document.getElementById("edit-user_id");
             var i_date=document.getElementById("edit-issue_date");
             var p_date=document.getElementById("edit-payment_date");
             var used=document.getElementById("edit-used_resource");
             var usage_cost=document.getElementById("edit-usage_cost");
             var extra=document.getElementById("edit-extra_cost");
             var paid_amount=document.getElementById("edit-paid_amount");
             var value="";
             var total_payable=0;
             var total_usage_cost=0;
             var paid=0;

             $(this).children("td").each(function(k,val)
             {
                 value=$(val).text();
                 if(k==0)
                 {
                    //console.log(value);
                    bill_id.value=value;
                 }
                 else if(k==1)
                 {
                    //console.log(value);
                    user_id.value=value;
                 }
                 else if(k==2)
                 {
                     $.post('/get-date',{
                         date:value
                     }
                     ,
                     function(res)
                     {
                         var data=JSON.parse(res);
                         console.log(data["date"]);
                         i_date.value=data["date"];
                     });
                 }

                 else if(k==3)
                 {
                     $.post('/get-date',{
                         date:value
                     }
                     ,
                     function(res)
                     {
                         var data=JSON.parse(res);
                         console.log(data["date"]);
                         p_date.value=data["date"];
                     });
                 }

                 else if(k==4)
                 {
                    //console.log(value);
                    used.value=value;
                 }

                 else if(k==5)
                 {
                    total_usage_cost=value;
                 }

                 else if(k==6)
                 {
                     total_payable=value;
                     usage_cost.value=total_payable;
                 }

                 else if(k==7)
                 {
                    //console.log(value);
                    paid_amount.value=value;
                    paid=value;
                 }

                 else if(k==8)
                 {
                     extra.value=total_payable-total_usage_cost;
                 }

             });
             var edit_modal = document.querySelector('#edit-modal');
             edit_modal.style.display="block";

     });

});



const modal = document.querySelector('#my-modal');
const modalBtn = document.querySelector('.new-bill');
const closeBtn = document.querySelector('.close');
const closeEditBtn = document.querySelector('.edit-close');
const edit_modal = document.querySelector('#edit-modal');

// Events
modalBtn.addEventListener('click', openModal);
closeBtn.addEventListener('click', closeModal);
window.addEventListener('click', outsideClick);
closeEditBtn.addEventListener('click',closeEditModal);

// Open
function openModal() {
    modal.style.display = 'block';
}

// Close
function closeModal() {
    modal.style.display = 'none';
    document.getElementById("user_id").value = "";
    document.getElementById("issue_date").value = "";
    document.getElementById("used_resource").value = "";
    document.getElementById("usage_cost").value = "";
    document.getElementById("extra_cost").value = "";
    document.getElementById("payment_date").value = "";
    document.getElementById("paid_amount").value = "";

}

function closeEditModal() {
    edit_modal.style.display = 'none';
}

// Close If Outside Click
function outsideClick(e) {
    if (e.target == modal) {
        modal.style.display = 'none';
        document.getElementById("user_id").value = "";
        document.getElementById("issue_date").value = "";
        document.getElementById("used_resource").value = "";
        document.getElementById("usage_cost").value = "";
        document.getElementById("extra_cost").value = "";
        document.getElementById("payment_date").value = "";
        document.getElementById("paid_amount").value = "";
    }
    else if (e.target == edit_modal) {
        edit_modal.style.display = 'none';
        
    }
}




