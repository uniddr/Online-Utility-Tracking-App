var lmc = document.getElementById("leftmenucont");
var pboc = document.getElementById("profbtnoptcont");
var itoc = document.getElementById("infotypeoptcont");
var rtoc = document.getElementById("rsctypeoptcont");
var poc = document.getElementById("periodoptcont");

document.addEventListener('click', function() {
    lmc.style.width = "0";

    pboc.style.display = "none";

    itoc.style.height = "0";

    rtoc.style.height = "0";

    poc.style.height = "0";
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

    itoc.style.height = "0";

    rtoc.style.height = "0";

    poc.style.height = "0";

    event.stopPropagation();
});

document.getElementById("leftmenuback").addEventListener("click", function() {
    lmc.style.width = "0";
    event.stopPropagation();
});

document.getElementById("profcont").addEventListener('click', function() {
    lmc.style.width = "0";

    pboc.style.display = "inline";

    itoc.style.height = "0";

    rtoc.style.height = "0";

    poc.style.height = "0";
    
    event.stopPropagation();
});

itoc.addEventListener("transitionend", function() {
    if(document.getElementById("infotypeoptvalcont").style.display == "block")
    {
        this.style.removeProperty("box-shadow");
        document.getElementById("infotypeoptvalcont").style.display = "none";
    }
    else
    {
        document.getElementById("infotypeoptvalcont").style.display = "block";
    }
});

itoc.addEventListener("transitionstart", function() {
    if(document.getElementById("infotypeoptvalcont").style.display == "none")
    {
        this.style.boxShadow = "1px 1px 10px 3px rgba(0, 0, 0, 0.336)";
    }
});

document.getElementById("infotypedownbtn").addEventListener('click', function() {
    lmc.style.width = "0";
    pboc.style.display = "none";
    rtoc.style.height = "0";
    poc.style.height = "0";

    if(itoc.style.height != "62px")
    {
        document.getElementById("infotypeoptvalcont").style.display = "none";
        itoc.style.height = "62px";
    }
    else
    {
        document.click();
        return;
    }

    let cur = document.getElementById("infotypedefaultinfo").innerHTML;
    let arr = document.getElementById("infotypeoptvalcont").getElementsByTagName("a");
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

rtoc.addEventListener("transitionend", function() {
    if(document.getElementById("rsctypeoptvalcont").style.display == "block")
    {
        this.style.removeProperty("box-shadow");
        document.getElementById("rsctypeoptvalcont").style.display = "none";
    }
    else
    {
        document.getElementById("rsctypeoptvalcont").style.display = "block";
    }
});

rtoc.addEventListener("transitionstart", function() {
    if(document.getElementById("rsctypeoptvalcont").style.display == "none")
    {
        this.style.boxShadow = "1px 1px 10px 3px rgba(0, 0, 0, 0.336)";
    }
});

document.getElementById("rsctypedownbtn").addEventListener('click', function() {
    lmc.style.width = "0";
    pboc.style.display = "none";
    itoc.style.height = "0";
    poc.style.height = "0";

    if(rtoc.style.height != "62px")
    {
        document.getElementById("rsctypeoptvalcont").style.display = "none";
        rtoc.style.height = "62px";
    }
    else
    {
        document.click();
        return;
    }

    let cur = document.getElementById("rsctypedefaultinfo").innerHTML;
    let arr = document.getElementById("rsctypeoptvalcont").getElementsByTagName("a");
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

poc.addEventListener("transitionend", function() {
    if(document.getElementById("periodoptvalcont").style.display == "block")
    {
        this.style.removeProperty("box-shadow");
        document.getElementById("periodoptvalcont").style.display = "none";
    }
    else
    {
        document.getElementById("periodoptvalcont").style.display = "block";
    }
});

rtoc.addEventListener("transitionstart", function() {
    if(document.getElementById("periodoptvalcont").style.display == "none")
    {
        this.style.boxShadow = "1px 1px 10px 3px rgba(0, 0, 0, 0.336)";
    }
});

document.getElementById("perioddownbtn").addEventListener('click', function() {
    lmc.style.width = "0";
    pboc.style.display = "none";
    itoc.style.height = "0";
    rtoc.style.height = "0";

    if(poc.style.height != "62px")
    {
        document.getElementById("periodoptvalcont").style.display = "none";
        poc.style.height = "62px";
    }
    else
    {
        document.click();
        return;
    }

    let cur = document.getElementById("perioddefaultinfo").innerHTML;
    let arr = document.getElementById("periodoptvalcont").getElementsByTagName("a");
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

function optclickhandler(caller) {
    let sp = caller.getElementsByTagName("span")[0];

    if(sp.id == "infotypeoptval0")
    {
        document.getElementById("infotypedefaultinfo").innerHTML = sp.innerHTML;
        itoc.style.height = "0";
        // setinfocontval();
    }
    else if(sp.id == "infotypeoptval1")
    {
        document.getElementById("infotypedefaultinfo").innerHTML = sp.innerHTML;
        itoc.style.height = "0";
        // setinfocontval();
    }
    else if(sp.id == "rsctypeoptval0")
    {
        document.getElementById("rsctypedefaultinfo").innerHTML = sp.innerHTML;
        rtoc.style.height = "0";
        // setinfocontval();
    }
    else if(sp.id == "rsctypeoptval1")
    {
        document.getElementById("rsctypedefaultinfo").innerHTML = sp.innerHTML;
        rtoc.style.height = "0";
        // setinfocontval();
    }
    else if(sp.id == "periodoptval0")
    {
        document.getElementById("perioddefaultinfo").innerHTML = sp.innerHTML;
        poc.style.height = "0";
        // setinfocontval();
    }
    else if(sp.id == "periodoptval1")
    {
        document.getElementById("perioddefaultinfo").innerHTML = sp.innerHTML;
        poc.style.height = "0";
        // setinfocontval();
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
val[2].getElementsByTagName("a")[0].addEventListener("click", function() {
    optclickhandler(this);
});
val[2].getElementsByTagName("a")[1].addEventListener("click", function() {
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
    event.stopPropagation();
});

var myChart;

function chartIt(reclabels, reclabel, recdata) {
    var ctx = document.getElementById('myChart').getContext('2d');
    // alert("chart is running");

    myChart = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: reclabels,
            datasets: [{
                label: reclabel,
                data: recdata,
                backgroundColor: 'rgba(160, 28, 18, 0.74)',
                // backgroundColor: [
                //     'rgba(255, 99, 132, 0.2)',
                //     'rgba(54, 162, 235, 0.2)',
                //     'rgba(255, 206, 86, 0.2)',
                //     'rgba(75, 192, 192, 0.2)',
                //     'rgba(153, 102, 255, 0.2)',
                //     'rgba(255, 159, 64, 0.2)'
                // ],
                borderColor: 'rgba(0, 0, 0, 1)',
                // borderColor: [
                //     'rgba(255, 99, 132, 1)',
                //     'rgba(54, 162, 235, 1)',
                //     'rgba(255, 206, 86, 1)',
                //     'rgba(75, 192, 192, 1)',
                //     'rgba(153, 102, 255, 1)',
                //     'rgba(255, 159, 64, 1)'
                // ],
                borderWidth: 1
            }]
        },
        options: {
            maintainAspectRatio: false,
            scales: {
                y: {
                    beginAtZero: true
                }
            }
        }
    });
}

document.getElementById("displaybtn").addEventListener("click", function() {
    if(myChart)
    {
        myChart.destroy();
    }

    let infotype = document.getElementById("infotypedefaultinfo").innerHTML;
    let rsctype = document.getElementById("rsctypedefaultinfo").innerHTML;
    let periodval = document.getElementById("perioddefaultinfo").innerHTML;

    let dataToSend = {
        info: infotype,
        resource: rsctype,
        period: periodval
    };
    let labelsforchart = [];
    let labelfordataset;
    let datafordataset = [];

    // console.log(`${JSON.stringify(dataToSend)}`);

    jQuery.ajax({
        url: "/chartinfo",
        type: "POST",
        contentType: "application/json",
        data: JSON.stringify(dataToSend),
        success: function(result, status, xhr) {
            if(status == "success")
            {
                console.log(result);
                console.log(result.length);
                if(periodval == "All Time")
                {
                    if(infotype == "Bills")
                    {
                        for(let i=0; i<result.length; i++)
                        {
                            labelsforchart.push(`${result[i].Year}`);
                            datafordataset.push(result[i].Total_bill);
                        }
                        labelfordataset = "Yearly Bill (BDT)";
                    }
                    else if(infotype == "Usage")
                    {
                        for(let i=0; i<result.length; i++)
                        {
                            labelsforchart.push(`${result[i].Year}`);
                            datafordataset.push(result[i].Used);
                        }
                        if(rsctype == "Water")
                        {
                            labelfordataset = "Yearly Use (gal)";
                        }
                        else if(rsctype == "Electricity")
                        {
                            labelfordataset = "Yearly Use (kwh)";
                        }
                    }
                }
                else if(periodval == "This Year")
                {
                    labelsforchart = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
                    if(infotype == "Bills")
                    {
                        for(let i=0; i<result.length; i++)
                        {
                            datafordataset.push(result[i].Monthly_Bill);
                        }
                        labelfordataset = "Monthly Bill (BDT)";
                    }
                    else if(infotype == "Usage")
                    {
                        for(let i=0; i<result.length; i++)
                        {
                            datafordataset.push(result[i].Used);
                        }
                        if(rsctype == "Water")
                        {
                            labelfordataset = "Monthly Use (gal)";
                        }
                        else if(rsctype == "Electricity")
                        {
                            labelfordataset = "Monthly Use (kwh)";
                        }
                    }
                }

                chartIt(labelsforchart, labelfordataset, datafordataset);
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
});


