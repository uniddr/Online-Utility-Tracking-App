/*
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
});



*/











$(document).ready(function()
{
    var count=0;
    $("#overview").click(function()
    {
        $.get('/userdetail_data',function(d)
        {
            var res=JSON.parse(d);
            
            if(count==0)
            {

            count++;
            var button_username=document.getElementById("username");
            button_username.innerHTML=res[0].Username;
    
            var divid=document.getElementById("id");
            var pid=document.createElement('P');
            pid.appendChild(document.createTextNode(res[0]["ID"]));
            //pid.appendChild(document.createTextNode("pid"));
            pid.style.marginLeft="164px";
            pid.style.color="white";
            divid.appendChild(pid);

                
            var divlocation=document.getElementById("location");
            var plocation=document.createElement('P');
            plocation.appendChild(document.createTextNode(res[0]["Location"]));
            //plocation.appendChild(document.createTextNode("plocation"));
            plocation.style.marginLeft="154px";
            plocation.style.color="white";
            divlocation.appendChild(plocation);
    
            var divemail=document.getElementById("email");
            var pemail=document.createElement('P');
            pemail.appendChild(document.createTextNode(res[0]["Email"]));
            //pemail.appendChild(document.createTextNode("pemail@gmail.com"));
            pemail.style.marginLeft="164px";
            pemail.style.color="white";
            divemail.appendChild(pemail);
    
            var divuser_type=document.getElementById("user_type");
            var puser_type=document.createElement('P');
            puser_type.appendChild(document.createTextNode(res[0]["User_type"]));
            //puser_type.appendChild(document.createTextNode("puser_type"));
            puser_type.style.marginLeft="150px";
            puser_type.style.color="white";
            divuser_type.appendChild(puser_type);
    
            var divpassword=document.getElementById("password");
            var ppassword=document.createElement('P');
            ppassword.appendChild(document.createTextNode(res[0]["Password"]));
            //ppassword.appendChild(document.createTextNode("ppassword"));
            ppassword.style.marginLeft="150px";
            ppassword.style.color="white";
            divpassword.appendChild(ppassword);
    
            
            var divelec_due=document.getElementById("elec_due");
            var pelec_due=document.createElement('P');
            pelec_due.style.marginLeft="123px";
            pelec_due.style.color="white";
            if(res[0]["Elec_service"]=="yes")
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
            pwater_due.style.marginLeft="147px";
            pwater_due.style.color="white";
            //pwater_due.appendChild(document.createTextNode("pwater_due"));
            //divwater_due.appendChild(pwater_due);
            if(res[0]["Water_service"]=="yes")
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
        });
    });
});



