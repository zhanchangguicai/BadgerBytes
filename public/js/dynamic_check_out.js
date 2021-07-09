var orderkey = window.location.href.split("&")[1].split("=")[1];
firebase.database().ref('orders/'+orderkey).once('value', function(snapshot){
    for (key in snapshot.child('order').val()){
        var checkOutItem = document.createElement("tr");
        var itemName = document.createElement("td");
        itemName.innerHTML = key;
        checkOutItem.appendChild(itemName);
        var itemPrice = document.createElement("td");
        itemPrice.setAttribute("id", key+"Price");
        checkOutItem.appendChild(itemPrice);
        var itemAmount = document.createElement("td");
        itemAmount.setAttribute("id", key+"Amount");
        itemAmount.innerHTML = snapshot.child('order').val()[key];
        checkOutItem.appendChild(itemAmount);
        var itemTotal = document.createElement("td");
        itemTotal.setAttribute("id", key+"Total");
        checkOutItem.appendChild(itemTotal);
        document.getElementById("tableBody").appendChild(checkOutItem);
    }
    document.getElementById("totalPrice").innerHTML = snapshot.val()["totalPrice"];
});

firebase.database().ref('menu').once('value', function(snapshot){
    for(key in snapshot.val()){
        if(key != "itemNum" && document.getElementById(snapshot.val()[key]["name"]+"Price") != null){
            document.getElementById(snapshot.val()[key]["name"]+"Price").innerHTML = snapshot.val()[key]["price"];
            document.getElementById(snapshot.val()[key]["name"]+"Total").innerHTML = document.getElementById(snapshot.val()[key]["name"]+"Price").innerHTML * document.getElementById(snapshot.val()[key]["name"]+"Amount").innerHTML
        }
    }
});

document.getElementById("paypal").onclick=function(){
    firebase.database().ref('orders/'+orderkey).once('value', function(snapshot){
        if(snapshot.val()["status"] == "unpaid"){
            window.open("paypal.html?"+window.location.href.split("?")[1],"_self");
        }else{
            alert("You have already paid for this order. Thanks.");
        }
    });
}

document.getElementById("checkOut").onclick=function(){
    firebase.database().ref('orders/'+orderkey).once('value', function(snapshot){
        if(snapshot.val()["status"] == "paid"){
            alert("Thanks for your order.");
            printPDF();
            window.open("index.html","_self");
        }else{
            alert("You haven't paid yet. Please click the paypal image above to pay.");
        }
    });
}

function printPDF(){
    var doc = new jsPDF();
    doc.text("Thanks for your order.", 20, 20);
    doc.text("Your order number: "+orderkey, 20, 30);
    doc.text("We have received your payment $"+document.getElementById("totalPrice").innerHTML, 20, 40);
    doc.text("Pick up time: "+document.getElementById("pickUpTime").value, 20, 50);
    doc.text("Car Description: "+document.getElementById("carDescription").value, 20, 60);
    doc.save('receipt.pdf');
}