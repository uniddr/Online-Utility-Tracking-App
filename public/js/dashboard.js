var lmc = document.getElementById("leftmenucont");
var pboc = document.getElementById("profbtnoptcont");
var rtoc = document.getElementById("rsrctypeoptcont");
var ipoc = document.getElementById("infoperiodoptcont");

document.addEventListener('click', function() {
    lmc.style.width = "0";

    pboc.style.display = "none";

    rtoc.style.height = "0";

    ipoc.style.height = "0";
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

    rtoc.style.height = "0";

    ipoc.style.height = "0";

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

    rtoc.style.height = "0";

    ipoc.style.height = "0";
    event.stopPropagation();
});

rtoc.addEventListener("transitionend", function() {
    if(document.getElementById("rsrctypeoptvalcont").style.display == "block")
    {
        this.style.removeProperty("box-shadow");
        document.getElementById("rsrctypeoptvalcont").style.display = "none";
    }
    else
    {
        document.getElementById("rsrctypeoptvalcont").style.display = "block";
    }
});

rtoc.addEventListener("transitionstart", function() {
    if(document.getElementById("rsrctypeoptvalcont").style.display == "none")
    {
        this.style.boxShadow = "1px 1px 10px 3px rgba(0, 0, 0, 0.336)";
    }
});

document.getElementById("rsrctypeupbtn").addEventListener('click', function() {
    lmc.style.width = "0";
    pboc.style.display = "none";
    ipoc.style.height = "0";

    if(rtoc.style.height != "52px")
    {
        document.getElementById("rsrctypeoptvalcont").style.display = "none";
        rtoc.style.height = "52px";
    }
    else
    {
        document.click();
        return;
    }

    let cur = document.getElementById("rsrctypedefaultinfo").innerHTML;
    let arr = document.getElementById("rsrctypeoptvalcont").getElementsByTagName("a");
    for(let i=0; i < arr.length; i++)
    {
        let arrspan = arr[i].getElementsByTagName("span");
        if(arrspan[0].innerHTML == cur)
        {
            arr[i].getElementsByTagName("img")[0].style.display = "inline";
        }
        else
        {
            arr[i].getElementsByTagName("img")[0].style.display = "none";
        }
    }
    event.stopPropagation();
});

ipoc.addEventListener("transitionend", function() {
    if(document.getElementById("infoperiodoptvalcont").style.display == "block")
    {
        this.style.removeProperty("box-shadow");
        document.getElementById("infoperiodoptvalcont").style.display = "none";
    }
    else
    {
        document.getElementById("infoperiodoptvalcont").style.display = "block";
    }
});

ipoc.addEventListener("transitionstart", function() {
    if(document.getElementById("infoperiodoptvalcont").style.display == "none")
    {
        this.style.boxShadow = "1px 1px 10px 3px rgba(0, 0, 0, 0.336)";
    }
});

document.getElementById("infoperiodupbtn").addEventListener('click', function() {
    lmc.style.width = "0";
    pboc.style.display = "none";
    
    rtoc.style.height = "0";
    
    if(ipoc.style.height != "78px")
    {
        document.getElementById("infoperiodoptvalcont").style.display = "none";
        ipoc.style.height = "78px";
    }
    else
    {
        document.click();
        return;
    }

    let cur = document.getElementById("infoperioddefaultinfo").innerHTML;
    let arr = document.getElementById("infoperiodoptvalcont").getElementsByTagName("a");
    for(let i=0; i < arr.length; i++)
    {
        let arrspan = arr[i].getElementsByTagName("span");
        if(arrspan[0].innerHTML == cur)
        {
            arr[i].getElementsByTagName("img")[0].style.display = "inline";
        }
        else
        {
            arr[i].getElementsByTagName("img")[0].style.display = "none";
        }
    }
    event.stopPropagation();
});

document.getElementById("leftmenucont").addEventListener('click', function() {
    event.stopPropagation();
});

function setinfocontval() {
    let rsrctype = document.getElementById("rsrctypedefaultinfo").innerHTML;
    let infoperiod = document.getElementById("infoperioddefaultinfo").innerHTML;

    let dataToSend = {
        resource: rsrctype,
        period: infoperiod
    };

    jQuery.ajax({
        url: "/infocont",
        type: "POST",
        contentType: "application/json",
        data: JSON.stringify(dataToSend),
        success: function(result, status, xhr) {
            if(status == "success")
            {
                
                document.getElementById("ccvalue").innerHTML = `${result.curclients}`;
                document.getElementById("tpvalue").innerHTML = `${result.totalp}`;
                document.getElementById("tdvalue").innerHTML = `${result.totald}`;
                document.getElementById("tcvalue").innerHTML = `${result.totalc}`;
            }
            else
            {
                alert("Failed to retrieve!");
            }
        },
        complete: function(xhr, status) {
            if(status == "success")
            {
                // alert("Success");
            }
        }
    });
}
jQuery(document).ready(function() {
    document.getElementsByClassName("optvalcont")[0].getElementsByTagName("a")[0].click();
});

function optclickhandler(caller) {
    let sp = caller.getElementsByTagName("span")[0];

    if(sp.id == "rsrctypeoptval0")
    {
        document.getElementById("tctitle").innerHTML = "Total Consumption (gal)";
        document.getElementById("rsrctypedefaultinfo").innerHTML = sp.innerHTML;
        rtoc.style.height = "0";
        setinfocontval();
    }
    else if(sp.id == "rsrctypeoptval1")
    {
        document.getElementById("tctitle").innerHTML = "Total Consumption (kwh)";
        document.getElementById("rsrctypedefaultinfo").innerHTML = sp.innerHTML;
        rtoc.style.height = "0";
        setinfocontval();
    }
    else if(sp.id == "infoperiodoptval0")
    {
        document.getElementById("infoperioddefaultinfo").innerHTML = sp.innerHTML;
        ipoc.style.height = "0";
        setinfocontval();
    }
    else if(sp.id == "infoperiodoptval1")
    {
        document.getElementById("infoperioddefaultinfo").innerHTML = sp.innerHTML;
        ipoc.style.height = "0";
        setinfocontval();
    }
    else if(sp.id == "infoperiodoptval2")
    {
        document.getElementById("infoperioddefaultinfo").innerHTML = sp.innerHTML;
        ipoc.style.height = "0";
        setinfocontval();
    }
    event.stopPropagation();
}

var val = document.getElementsByClassName("optvalcont");
val[0].getElementsByTagName("a")[0].addEventListener("click", function() {
    optclickhandler(this);
});
val[0].getElementsByTagName("a")[1].addEventListener("click", function() {
    optclickhandler(this);
});
val[1].getElementsByTagName("a")[0].addEventListener("click", function() {
    optclickhandler(this);
});
val[1].getElementsByTagName("a")[1].addEventListener("click", function() {
    optclickhandler(this);
});
val[1].getElementsByTagName("a")[2].addEventListener("click", function() {
    optclickhandler(this);
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
