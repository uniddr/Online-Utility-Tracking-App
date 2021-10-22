var lmc = document.getElementById("leftmenucont");
var pboc = document.getElementById("profbtnoptcont");
// var itoc = document.getElementById("infotypeoptcont");
// var rtoc = document.getElementById("rsctypeoptcont");
// var poc = document.getElementById("periodoptcont");

document.addEventListener('click', function () {
    lmc.style.width = "0";

    pboc.style.display = "none";

    // itoc.style.height = "0";

    // rtoc.style.height = "0";

    // poc.style.height = "0";
});

lmc.addEventListener("transitionend", function () {
    if (document.getElementById("leftmenuopt").style.display == "block") {
        document.getElementById("leftmenuopt").style.display = "none";
    }
    else {
        document.getElementById("leftmenuopt").style.display = "block";
    }
});

lmc.addEventListener("transitionstart", function () {
    document.getElementById("leftmenuopt").style.display = "none";
});

document.getElementById("menuicon").addEventListener('click', function () {
    pboc.style.display = "none";

    lmc.style.width = "200px";

    // itoc.style.height = "0";

    // rtoc.style.height = "0";

    // poc.style.height = "0";

    event.stopPropagation();
});

document.getElementById("leftmenuback").addEventListener("click", function () {
    lmc.style.width = "0";
    event.stopPropagation();
});

document.getElementById("profcont").addEventListener('click', function () {
    lmc.style.width = "0";

    pboc.style.display = "inline";

    // itoc.style.height = "0";

    // rtoc.style.height = "0";

    // poc.style.height = "0";

    event.stopPropagation();
});

// itoc.addEventListener("transitionend", function() {
//     if(document.getElementById("infotypeoptvalcont").style.display == "block")
//     {
//         this.style.removeProperty("box-shadow");
//         document.getElementById("infotypeoptvalcont").style.display = "none";
//     }
//     else
//     {
//         document.getElementById("infotypeoptvalcont").style.display = "block";
//     }
// });

// itoc.addEventListener("transitionstart", function() {
//     if(document.getElementById("infotypeoptvalcont").style.display == "none")
//     {
//         this.style.boxShadow = "1px 1px 10px 3px rgba(0, 0, 0, 0.336)";
//     }
// });

// document.getElementById("infotypedownbtn").addEventListener('click', function() {
//     lmc.style.width = "0";
//     pboc.style.display = "none";
//     rtoc.style.height = "0";
//     poc.style.height = "0";

//     if(itoc.style.height != "62px")
//     {
//         document.getElementById("infotypeoptvalcont").style.display = "none";
//         itoc.style.height = "62px";
//     }
//     else
//     {
//         document.click();
//         return;
//     }

//     let cur = document.getElementById("infotypedefaultinfo").innerHTML;
//     let arr = document.getElementById("infotypeoptvalcont").getElementsByTagName("a");
//     for(let i=0; i < arr.length; i++)
//     {
//         let arrspan = arr[i].getElementsByTagName("span");
//         if(arrspan[0].innerHTML == cur)
//         {
//             arr[i].getElementsByTagName("img")[0].style.display = "inline";
//         }
//         else
//         {
//             arr[i].getElementsByTagName("img")[0].style.display = "none";
//         }
//     }
//     event.stopPropagation();
// });

// rtoc.addEventListener("transitionend", function() {
//     if(document.getElementById("rsctypeoptvalcont").style.display == "block")
//     {
//         this.style.removeProperty("box-shadow");
//         document.getElementById("rsctypeoptvalcont").style.display = "none";
//     }
//     else
//     {
//         document.getElementById("rsctypeoptvalcont").style.display = "block";
//     }
// });

// rtoc.addEventListener("transitionstart", function() {
//     if(document.getElementById("rsctypeoptvalcont").style.display == "none")
//     {
//         this.style.boxShadow = "1px 1px 10px 3px rgba(0, 0, 0, 0.336)";
//     }
// });

// document.getElementById("rsctypedownbtn").addEventListener('click', function() {
//     lmc.style.width = "0";
//     pboc.style.display = "none";
//     itoc.style.height = "0";
//     poc.style.height = "0";

//     if(rtoc.style.height != "62px")
//     {
//         document.getElementById("rsctypeoptvalcont").style.display = "none";
//         rtoc.style.height = "62px";
//     }
//     else
//     {
//         document.click();
//         return;
//     }

//     let cur = document.getElementById("rsctypedefaultinfo").innerHTML;
//     let arr = document.getElementById("rsctypeoptvalcont").getElementsByTagName("a");
//     for(let i=0; i < arr.length; i++)
//     {
//         let arrspan = arr[i].getElementsByTagName("span");
//         if(arrspan[0].innerHTML == cur)
//         {
//             arr[i].getElementsByTagName("img")[0].style.display = "inline";
//         }
//         else
//         {
//             arr[i].getElementsByTagName("img")[0].style.display = "none";
//         }
//     }
//     event.stopPropagation();
// });

// poc.addEventListener("transitionend", function() {
//     if(document.getElementById("periodoptvalcont").style.display == "block")
//     {
//         this.style.removeProperty("box-shadow");
//         document.getElementById("periodoptvalcont").style.display = "none";
//     }
//     else
//     {
//         document.getElementById("periodoptvalcont").style.display = "block";
//     }
// });

// rtoc.addEventListener("transitionstart", function() {
//     if(document.getElementById("periodoptvalcont").style.display == "none")
//     {
//         this.style.boxShadow = "1px 1px 10px 3px rgba(0, 0, 0, 0.336)";
//     }
// });

// document.getElementById("perioddownbtn").addEventListener('click', function() {
//     lmc.style.width = "0";
//     pboc.style.display = "none";
//     itoc.style.height = "0";
//     rtoc.style.height = "0";

//     if(poc.style.height != "62px")
//     {
//         document.getElementById("periodoptvalcont").style.display = "none";
//         poc.style.height = "62px";
//     }
//     else
//     {
//         document.click();
//         return;
//     }

//     let cur = document.getElementById("perioddefaultinfo").innerHTML;
//     let arr = document.getElementById("periodoptvalcont").getElementsByTagName("a");
//     for(let i=0; i < arr.length; i++)
//     {
//         let arrspan = arr[i].getElementsByTagName("span");
//         if(arrspan[0].innerHTML == cur)
//         {
//             arr[i].getElementsByTagName("img")[0].style.display = "inline";
//         }
//         else
//         {
//             arr[i].getElementsByTagName("img")[0].style.display = "none";
//         }
//     }
//     event.stopPropagation();
// });

document.getElementById("leftmenucont").addEventListener('click', function () {
    event.stopPropagation();
});

// function optclickhandler(caller) {
//     let sp = caller.getElementsByTagName("span")[0];

//     if(sp.id == "infotypeoptval0")
//     {
//         document.getElementById("infotypedefaultinfo").innerHTML = sp.innerHTML;
//         itoc.style.height = "0";
//     }
//     else if(sp.id == "infotypeoptval1")
//     {
//         document.getElementById("infotypedefaultinfo").innerHTML = sp.innerHTML;
//         itoc.style.height = "0";
//     }
//     else if(sp.id == "rsctypeoptval0")
//     {
//         document.getElementById("rsctypedefaultinfo").innerHTML = sp.innerHTML;
//         rtoc.style.height = "0";
//     }
//     else if(sp.id == "rsctypeoptval1")
//     {
//         document.getElementById("rsctypedefaultinfo").innerHTML = sp.innerHTML;
//         rtoc.style.height = "0";
//     }
//     else if(sp.id == "periodoptval0")
//     {
//         document.getElementById("perioddefaultinfo").innerHTML = sp.innerHTML;
//         poc.style.height = "0";
//     }
//     else if(sp.id == "periodoptval1")
//     {
//         document.getElementById("perioddefaultinfo").innerHTML = sp.innerHTML;
//         poc.style.height = "0";
//     }
//     event.stopPropagation();
// }

// var val = document.getElementsByClassName("optvalcont");
// val[0].getElementsByTagName("a")[0].addEventListener("click", function() {
//     optclickhandler(this);
// });
// val[0].getElementsByTagName("a")[1].addEventListener("click", function() {
//     optclickhandler(this);
// });
// val[1].getElementsByTagName("a")[0].addEventListener("click", function() {
//     optclickhandler(this);
// });
// val[1].getElementsByTagName("a")[1].addEventListener("click", function() {
//     optclickhandler(this);
// });
// val[2].getElementsByTagName("a")[0].addEventListener("click", function() {
//     optclickhandler(this);
// });
// val[2].getElementsByTagName("a")[1].addEventListener("click", function() {
//     optclickhandler(this);
// });

document.getElementById("profbtnoptcont").getElementsByTagName("a")[0].addEventListener("click", function () {
    jQuery.ajax({
        async: "true",
        url: "/logout",
        type: "POST",
        success: function (result, status, xhr) {
            if (status == "success") {
                // alert(`${xhr.status}: ${xhr.statusText}`);
            }
            else {
                alert("Failed to logout!");
            }
        },
        complete: function (xhr, status) {
            if (status == "success") {
                window.location.href = "/";
            }
        }
    });
    event.stopPropagation();
});


// Get DOM Elements
const modal = document.querySelector('#my-modal');
const modalBtn = document.querySelector('#modal-btn');
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
