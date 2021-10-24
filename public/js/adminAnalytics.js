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
var yearinfo = [];
var yearinfo_currindex;
var labelsforchart = [];
var labelfordataset;
var datafordataset = [];
var infotype;
var rsctype;
var periodval;

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

    infotype = document.getElementById("infotypedefaultinfo").innerHTML;
    rsctype = document.getElementById("rsctypedefaultinfo").innerHTML;
    periodval = document.getElementById("perioddefaultinfo").innerHTML;

    var dataToSend = {
        info: infotype,
        resource: rsctype,
        period: periodval
    };

    datafordataset = [];
    labelfordataset = "";
    labelsforchart = [];

    console.log(dataToSend);

    jQuery.ajax({
        url: "/adminavyearinfo",
        type: "POST",
        contentType: "application/json",
        data: JSON.stringify(dataToSend),
        success: function(result, status, xhr) {
            if(status == "success")
            {
                console.log(result);
                console.log(result.year.length);
                yearinfo = [];
                for(let i=0; i<result.year.length; i++)
                {
                    yearinfo.push(result.year[i].Year);
                }
                yearinfo_currindex = 0;
                console.log(dataToSend);
                dataToSend = {
                    info: infotype,
                    resource: rsctype,
                    period: periodval,
                    yr: yearinfo[yearinfo_currindex]
                };
            }
            else
            {
                alert("Failed to retrieve!");
            }
        },
        complete: function(xhr, status) {
            if(status == "success")
            {
                jQuery.ajax({
                    url: "/adminchartinfo",
                    type: "POST",
                    contentType: "application/json",
                    data: JSON.stringify(dataToSend),
                    success: function(result, status, xhr) {
                        if(status == "success")
                        {
                            console.log(result);
                            if(yearinfo.length > 1 && periodval == "Yearly")
                            {
                                document.getElementById("leftarrow").style.visibility = "visible";
                            }
                            else
                            {
                                document.getElementById("leftarrow").style.visibility = "hidden";
                            }
                            console.log(result.dat.length);
                            if(periodval == "All Time")
                            {
                                if(infotype == "Earned")
                                {
                                    for(let i=0; i<result.dat.length; i++)
                                    {
                                        labelsforchart.push(`${result.dat[i].Year}`);
                                        datafordataset.push(result.dat[i].Total_earned);
                                    }
                                    labelfordataset = "Yearly Earned (BDT)";
                                }
                                else if(infotype == "Usage")
                                {
                                    for(let i=0; i<result.dat.length; i++)
                                    {
                                        labelsforchart.push(`${result.dat[i].Year}`);
                                        datafordataset.push(result.dat[i].Used);
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
                            else if(periodval == "Yearly")
                            {
                                labelsforchart = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
                                if(infotype == "Earned")
                                {
                                    let i = 1, len = 0;
                                    while(i<13 && len<result.dat.length)
                                    {
                                        if(result.dat[len].Month != i)
                                        {
                                            datafordataset.push(0);
                                        }
                                        else
                                        {
                                            datafordataset.push(result.dat[len].Monthly_Earned);
                                            len++;
                                        }
                                        i++;
                                    }
                                    labelfordataset = "Monthly Earned (BDT)";
                                }
                                else if(infotype == "Usage")
                                {
                                    let i = 1, len = 0;
                                    while(i<13 && len<result.dat.length)
                                    {
                                        if(result.dat[len].Month != i)
                                        {
                                            datafordataset.push(0);
                                        }
                                        else
                                        {
                                            datafordataset.push(result.dat[len].Used);
                                            len++;
                                        }
                                        i++;
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
                            document.getElementById("yearlabel").style.visibility = "visible";
                            document.getElementById("yearlabel").innerHTML = dataToSend['yr'];
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
            }
        }
    });
});

document.getElementById("leftarrow").addEventListener('click', function() {
    if(yearinfo_currindex < yearinfo.length-1)
    {
        dataToSend = {
            info: infotype,
            resource: rsctype,
            period: periodval,
            yr: yearinfo[++yearinfo_currindex]
        };

        if(yearinfo_currindex > 0)
        {
            document.getElementById("rightarrow").style.visibility = "visible";
        }
        else
        {
            document.getElementById("rightarrow").style.visibility = "hidden";
        }

        if(yearinfo_currindex >= yearinfo.length-1)
        {
            document.getElementById("leftarrow").style.visibility = "hidden";
        }
    }
    console.log(dataToSend);
    jQuery.ajax({
        url: "/adminchartinfo",
        type: "POST",
        contentType: "application/json",
        data: JSON.stringify(dataToSend),
        success: function(result, status, xhr) {
            if(status == "success")
            {
                console.log(result);
                datafordataset = [];
                labelfordataset = "";
                labelsforchart = [];
                document.getElementById("yearlabel").innerHTML = dataToSend['yr'];
                console.log(result.dat.length);
                if(periodval == "Yearly")
                {
                    labelsforchart = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
                    if(infotype == "Earned")
                    {
                        let i = 1, len = 0;
                        while(i<13 && len<result.dat.length)
                        {
                            if(result.dat[len].Month != i)
                            {
                                datafordataset.push(0);
                            }
                            else
                            {
                                datafordataset.push(result.dat[len].Monthly_Earned);
                                len++;
                            }
                            i++;
                        }
                        labelfordataset = "Monthly Earned (BDT)";
                    }
                    else if(infotype == "Usage")
                    {
                        let i = 1, len = 0;
                        while(i<13 && len<result.dat.length)
                        {
                            if(result.dat[len].Month != i)
                            {
                                datafordataset.push(0);
                            }
                            else
                            {
                                datafordataset.push(result.dat[len].Used);
                                len++;
                            }
                            i++;
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
                if(myChart)
                {
                    myChart.destroy();
                }
                document.getElementById("yearlabel").innerHTML = dataToSend['yr'];
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

document.getElementById("rightarrow").addEventListener('click', function() {
    if(yearinfo_currindex > 0)
    {
        dataToSend = {
            info: infotype,
            resource: rsctype,
            period: periodval,
            yr: yearinfo[--yearinfo_currindex]
        };
        if(yearinfo_currindex <= 0)
        {
            document.getElementById("rightarrow").style.visibility = "hidden";
            document.getElementById("leftarrow").style.visibility = "visible";
        }
        else
        {
            document.getElementById("leftarrow").style.visibility = "visible";
        }
    }
    console.log(dataToSend);
    jQuery.ajax({
        url: "/adminchartinfo",
        type: "POST",
        contentType: "application/json",
        data: JSON.stringify(dataToSend),
        success: function(result, status, xhr) {
            if(status == "success")
            {
                console.log(result);
                datafordataset = [];
                labelfordataset = "";
                labelsforchart = [];
                document.getElementById("yearlabel").innerHTML = dataToSend['yr'];
                console.log(result.dat.length);
                if(periodval == "Yearly")
                {
                    labelsforchart = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
                    if(infotype == "Earned")
                    {
                        let i = 1, len = 0;
                        while(i<13 && len<result.dat.length)
                        {
                            if(result.dat[len].Month != i)
                            {
                                datafordataset.push(0);
                            }
                            else
                            {
                                datafordataset.push(result.dat[len].Monthly_Earned);
                                len++;
                            }
                            i++;
                        }
                        labelfordataset = "Monthly Earned (BDT)";
                    }
                    else if(infotype == "Usage")
                    {
                        let i = 1, len = 0;
                        while(i<13 && len<result.dat.length)
                        {
                            if(result.dat[len].Month != i)
                            {
                                datafordataset.push(0);
                            }
                            else
                            {
                                datafordataset.push(result.dat[len].Used);
                                len++;
                            }
                            i++;
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
                if(myChart)
                {
                    myChart.destroy();
                }
                document.getElementById("yearlabel").innerHTML = dataToSend['yr'];
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


