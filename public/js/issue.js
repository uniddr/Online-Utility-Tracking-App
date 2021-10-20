$(document).ready(function()
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

    $.post('/get_issue_date',
    {resource:"Water"},
    function(d)
    {
        console.log(d);
        var data=JSON.parse(d);
        console.log(data);
        for(var k=0;k<data.length;k++)
        {
            var text=data[k]["(YEAR(issue_date))"];
            var resource_op=document.createElement("OPTION");
            resource_op.setAttribute("value",text);
            resource_op.appendChild(document.createTextNode(text));
            document.getElementById("resource-year").appendChild(resource_op);
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
        {resource:resource},
        function(d)
        {
            console.log(d);
            var data=JSON.parse(d);
            console.log(data);
            for(var k=0;k<data.length;k++)
            {
                var text=data[k]["(YEAR(issue_date))"];
                var resource_op=document.createElement("OPTION");
                resource_op.setAttribute("value",text);
                resource_op.appendChild(document.createTextNode(text));
                document.getElementById("resource-year").appendChild(resource_op);
            }
        });
    });

    $("#billing-button").click(function()
{
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
    year: Number.parseInt(year)
    },
    function(d)
    {
        console.log(d);
        var data=JSON.parse(d);
        console.log(data);
        for(var k=0;k<data.length;k++)
        {
            length++;
            var row=billing_table.insertRow(length);
            var cell1=row.insertCell(0);
            cell1.appendChild(document.createTextNode(data[k]["bill_id"]));

            var cell2=row.insertCell(1);
            var date=new Date(data[k]["date(issue_date)"]).toString().substr(3,12);
            cell2.appendChild(document.createTextNode(date));

            var cell3=row.insertCell(2);
            var date=new Date(data[k]["date(payment_date)"]).toString().substr(3,12);
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
    });
});



});



