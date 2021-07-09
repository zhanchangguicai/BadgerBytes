var orderkey = window.location.href.split("&")[1].split("=")[1];

document.getElementById("sm").onclick = function(){
    if(document.getElementById("back")==null){
        firebase.database().ref('orders/'+orderkey+"/status").set("paid");
        alert("Payment Success!");
        var jump = document.createElement("button");
        jump.setAttribute("onclick", "jup()");
        jump.setAttribute("id", "back");
        jump.innerHTML = "Go Back";
        document.getElementById("pay").appendChild(jump);
    }
}

function jup(){
    window.open("check_out.html?"+window.location.href.split("?")[1],"_self");
}