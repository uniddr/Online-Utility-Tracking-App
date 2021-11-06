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
    var annoying;
    $.post('/get-user-type',function(d)
    {
        console.log(d);
        if(d.type=="C")
        {
            var leftmenuDiv=document.getElementById("leftmenuopt");
            // leftmenuDiv.removeChild(leftmenuDiv.children[2]);
        }
    });

    var count=0;
    var qs=new URLSearchParams(window.location.search);
    var id=qs.get("u_id");
        $.ajax({
        url: '/userdetail_data',
        type: 'POST',
        // contentType: 'application/json',
        data: {
            id:id
        },
        success: function(d)
        {
            var res=JSON.parse(d);
            console.log(res);
            if(count==0)
            {

            count++;
            var button_username=document.getElementById("username");
            button_username.innerHTML=res[0].Username;
    
            var divid=document.getElementById("id");
            var pid=document.createElement('P');
            pid.appendChild(document.createTextNode(res[0]["ID"]));
            //pid.appendChild(document.createTextNode("pid"));
            pid.style.marginLeft="60px";
            pid.style.color="white";
            divid.appendChild(pid);
            annoying = document.querySelectorAll(".iddiv p")[1].innerHTML;
            console.log(annoying);

                
            var divlocation=document.getElementById("location");
            var plocation=document.createElement('P');
            plocation.appendChild(document.createTextNode(res[0]["Location"]));
            //plocation.appendChild(document.createTextNode("plocation"));
            plocation.style.marginLeft="52px";
            plocation.style.color="white";
            divlocation.appendChild(plocation);
    
            var divemail=document.getElementById("email");
            var pemail=document.createElement('P');
            pemail.appendChild(document.createTextNode(res[0]["Email"]));
            //pemail.appendChild(document.createTextNode("pemail@gmail.com"));
            pemail.style.marginLeft="64px";
            pemail.style.color="white";
            divemail.appendChild(pemail);
    
            var divuser_type=document.getElementById("user_type");
            var puser_type=document.createElement('P');
            puser_type.appendChild(document.createTextNode(res[0]["User_type"]));
            //puser_type.appendChild(document.createTextNode("puser_type"));
            puser_type.style.marginLeft="50px";
            puser_type.style.color="white";
            divuser_type.appendChild(puser_type);
    
            var divpassword=document.getElementById("password");
            var ppassword=document.createElement('P');
            ppassword.appendChild(document.createTextNode(res[0]["Password"]));
            //ppassword.appendChild(document.createTextNode("ppassword"));
            ppassword.style.marginLeft="50px";
            ppassword.style.color="white";
            divpassword.appendChild(ppassword);
    
            
            var divelec_due=document.getElementById("elec_due");
            var pelec_due=document.createElement('P');
            pelec_due.style.marginLeft="20px";
            pelec_due.style.color="white";
            if(res[0]["Elec_service"]=="Yes")
            {
                pelec_due.appendChild(document.createTextNode(res[0]["Elec_due"]));
                divelec_due.appendChild(pelec_due);
            }
            else
            {
                pelec_due.appendChild(document.createTextNode("No due"));
                divelec_due.appendChild(pelec_due);
            }
            //pelec_due.appendChild(document.createTextNode("pelec_due"));
            //divelec_due.appendChild(pelec_due);
    
            
            var divwater_due=document.getElementById("water_due");
            var pwater_due=document.createElement('P');
            pwater_due.style.marginLeft="47px";
            pwater_due.style.color="white";
            //pwater_due.appendChild(document.createTextNode("pwater_due"));
            //divwater_due.appendChild(pwater_due);
            if(res[0]["Water_service"]=="Yes")
            {
                pwater_due.appendChild(document.createTextNode(res[0]["Water_due"]));
                divwater_due.appendChild(pwater_due);
            }
            else
            {
                pwater_due.appendChild(document.createTextNode("No due"));
                divwater_due.appendChild(pwater_due);
            }
        }
        },



        

    // this part is added for issue bill section
    complete: function(a,b) 
    {
    var resource=[];
    resource.push("Water");
    resource.push("Electricity");
    for(var k=0;k<2;k++)
    {
        var resource_op=document.createElement("OPTION");
        resource_op.setAttribute("value",resource[k]);
        resource_op.appendChild(document.createTextNode(resource[k]));
        document.getElementById("resource-select").appendChild(resource_op);
    }

    $.ajax({
    url: '/get_issue_date',
    type: 'POST',
    // contentType: 'application/json',
    data: {resource:"Water", id: annoying},
    success: function(d)
    {
        console.log(d);
        var data=JSON.parse(d);
        //console.log(data);
        for(var k=0;k<data.length;k++)
        {
            var text=data[k]["(YEAR(idate))"];
            var resource_op=document.createElement("OPTION");
            resource_op.setAttribute("value",text);
            resource_op.appendChild(document.createTextNode(text));
            document.getElementById("resource-year").appendChild(resource_op);
        }
    }
    });
}
});


    $("#resource-select").change(function()
    {
        //console.log($(this).val());
        var resource_year=document.getElementById("resource-year");
        while(resource_year.hasChildNodes())
        {
            resource_year.removeChild(resource_year.childNodes[0]);
        }
        var resource=$(this).val();
        $.post('/get_issue_date',
        {resource:resource, id: annoying},
        function(d)
        {
            console.log(d);
            var data=JSON.parse(d);
            console.log(data);
            for(var k=0;k<data.length;k++)
            {
                var text=data[k]["(YEAR(idate))"];
                var resource_op=document.createElement("OPTION");
                resource_op.setAttribute("value",text);
                resource_op.appendChild(document.createTextNode(text));
                document.getElementById("resource-year").appendChild(resource_op);
            }
        });
    });

    $("#billing-button").click(function()
{
    var maxRow=10;
    var billing_table=document.getElementById("billing-table");
    var length=billing_table.rows.length;
    //console.log(length);

    if(length>0)
    {
        for(var k=0;k<length;k++)
        {
            billing_table.deleteRow(0);
        }
    }
    length=0;
    var row=billing_table.insertRow(0);
    var h1=document.createElement("TH");
    h1.appendChild(document.createTextNode("Bill ID"));
    row.appendChild(h1);

    var h2=document.createElement("TH");
    h2.appendChild(document.createTextNode("Issue Date"));
    row.appendChild(h2);

    var h3=document.createElement("TH");
    h3.appendChild(document.createTextNode("Payment Date"));
    row.appendChild(h3);

    var h4=document.createElement("TH");
    h4.appendChild(document.createTextNode("Used Resource"));
    row.appendChild(h4);


    var h5=document.createElement("TH");
    h5.appendChild(document.createTextNode("Total Payable"));
    row.appendChild(h5);

    var h6=document.createElement("TH");
    h6.appendChild(document.createTextNode("Paid Amount"));
    row.appendChild(h6);

    var h7=document.createElement("TH");
    h7.appendChild(document.createTextNode("Due Amount"));
    row.appendChild(h7);

    var year= document.getElementById("resource-year").value;
    var resource= document.getElementById("resource-select").value;
    console.log(year+" "+resource);

    $.post('/get_bill_data',
    {resource:resource,
    year: Number.parseInt(year),
    id:id
    },
    function(d)
    {
        //console.log(d);
        var data=JSON.parse(d);
        if(data.length>0)
        {
            document.getElementById("next").style.visibility="visible";
            document.getElementById("prev").style.visibility="visible";
        }
        for(var k=0;k<maxRow;k++)
        {
            length++;
            if(data[k]!=null)
            {
             var row=billing_table.insertRow(length);
            var cell1=row.insertCell(0);
            cell1.appendChild(document.createTextNode(data[k]["bill_id"]));

            var cell2=row.insertCell(1);
            var date=new Date(data[k]["issue_date"]).toString().substr(3,12);
            cell2.appendChild(document.createTextNode(date));

            var cell3=row.insertCell(2);
            var date=new Date(data[k]["payment_date"]).toString().substr(3,12);
            cell3.appendChild(document.createTextNode(date));

            var cell4=row.insertCell(3);
            cell4.appendChild(document.createTextNode(data[k]["used_resource"]));

            var cell5=row.insertCell(4);
            cell5.appendChild(document.createTextNode(data[k]["total_payable"]));

            var cell6=row.insertCell(5);
            cell6.appendChild(document.createTextNode(data[k]["paid_amount"]));

            var cell7=row.insertCell(6);
            cell7.appendChild(document.createTextNode(data[k]["due_amount"]));

            }
        }
    });
});

$("#next").click(function()
{
    var maxRow=10;
    var billing_table=document.getElementById("billing-table");
    var length=billing_table.rows.length;
    var last_bill_id=Number.parseInt(billing_table.rows[length-1].cells[0].innerHTML);

    var year= document.getElementById("resource-year").value;
    var resource= document.getElementById("resource-select").value;
    console.log(year+" "+resource);

    $.post('/get_bill_data',
    {resource:resource,
    year: Number.parseInt(year),
    id: id
    },
    function(d)
    {
        //console.log(d);
        var data=JSON.parse(d);
        var keys=[];
        var base={};
        for(var k=0;k<data.length;k++)
        {
            keys.push(data[k]["bill_id"].toString());
            data[k]["Index"]=k;
        }

        for(var i=0;i<data.length;i++)
        {
            var key=data[i]["bill_id"].toString();
            base[key]=data[i];
        }

        var baseData=JSON.parse(JSON.stringify(base));
        var start=baseData[last_bill_id.toString()]["Index"];
        //console.log(keys);
        //console.log(data);

        //console.log(length);
    
        if(length>0 && data[start+1]!=null)
        {
            for(var k=0;k<length-1;k++)
            {
                billing_table.deleteRow(1);
            }
        }
        length=0;
        console.log(last_bill_id);

        for(var k=0;k<maxRow;k++)
        {
            length++;
            start++;
            if(data[start]!=null)

            {
            var row=billing_table.insertRow(length);
            var cell1=row.insertCell(0);
            cell1.appendChild(document.createTextNode(data[start]["bill_id"]));

            var cell2=row.insertCell(1);
            var date=new Date(data[start]["issue_date"]).toString().substr(3,12);
            cell2.appendChild(document.createTextNode(date));

            var cell3=row.insertCell(2);
            var date=new Date(data[start]["payment_date"]).toString().substr(3,12);
            cell3.appendChild(document.createTextNode(date));

            var cell4=row.insertCell(3);
            cell4.appendChild(document.createTextNode(data[start]["used_resource"]));

            var cell5=row.insertCell(4);
            cell5.appendChild(document.createTextNode(data[start]["total_payable"]));

            var cell6=row.insertCell(5);
            cell6.appendChild(document.createTextNode(data[start]["paid_amount"]));

            var cell7=row.insertCell(6);
            cell7.appendChild(document.createTextNode(data[start]["due_amount"]));

            }

        }
    });
});
    
$("#prev").click(function()
{
    var maxRow=10;
    var billing_table=document.getElementById("billing-table");
    var length=billing_table.rows.length;
    var last_bill_id=Number.parseInt(billing_table.rows[1].cells[0].innerHTML);

    var year= document.getElementById("resource-year").value;
    var resource= document.getElementById("resource-select").value;
    console.log(year+" "+resource);

    $.post('/get_bill_data',
    {resource:resource,
    year: Number.parseInt(year),
    id: id
    },
    function(d)
    {
        //console.log(d);
        var data=JSON.parse(d);
        var keys=[];
        var base={};
        for(var k=0;k<data.length;k++)
        {
            keys.push(data[k]["bill_id"].toString());
            data[k]["Index"]=k;
        }

        for(var i=0;i<data.length;i++)
        {
            var key=data[i]["bill_id"].toString();
            base[key]=data[i];
        }

        var baseData=JSON.parse(JSON.stringify(base));
        var start=baseData[last_bill_id.toString()]["Index"]-1-maxRow;
        //console.log(keys);
        //console.log(data);

        //console.log(length);
    
        if(length>0 && data[start+1]!=null)
        {
            for(var k=0;k<length-1;k++)
            {
                billing_table.deleteRow(1);
            }
        }
        length=0;
        console.log(last_bill_id);

        for(var k=0;k<maxRow;k++)
        {
            length++;
            start++;
            if(data[start]!=null)

            {
            var row=billing_table.insertRow(length);
            var cell1=row.insertCell(0);
            cell1.appendChild(document.createTextNode(data[start]["bill_id"]));

            var cell2=row.insertCell(1);
            var date=new Date(data[start]["issue_date"]).toString().substr(3,12);
            cell2.appendChild(document.createTextNode(date));

            var cell3=row.insertCell(2);
            var date=new Date(data[start]["payment_date"]).toString().substr(3,12);
            cell3.appendChild(document.createTextNode(date));

            var cell4=row.insertCell(3);
            cell4.appendChild(document.createTextNode(data[start]["used_resource"]));

            var cell5=row.insertCell(4);
            cell5.appendChild(document.createTextNode(data[start]["total_payable"]));

            var cell6=row.insertCell(5);
            cell6.appendChild(document.createTextNode(data[start]["paid_amount"]));

            var cell7=row.insertCell(6);
            cell7.appendChild(document.createTextNode(data[start]["due_amount"]));

            }

        }
    });
});


});



