function add(name, price, availability){
    if(document.getElementById(name+"Cart") == null && availability == "add"){
        var cartItem = document.createElement("tr");
        cartItem.id = name+"Cart";
        var nametd = document.createElement("td");
        nametd.innerHTML = name;
        cartItem.appendChild(nametd);
        var pricetd = document.createElement("td");
        pricetd.innerHTML = price;
        cartItem.appendChild(pricetd);
        var amounttd = document.createElement("td");
        var decreasebtn = document.createElement("button");
        decreasebtn.setAttribute("class","addOrReduce");
        decreasebtn.setAttribute("id",name+"Decrease");
        decreasebtn.setAttribute("onclick","decrease('"+name+"',"+price+")");
        decreasebtn.innerHTML = "-";
        amounttd.appendChild(decreasebtn);
        var amountbox = document.createElement("input");
        amountbox.setAttribute("class", "cardGoodsCountInput");
        amountbox.setAttribute("type", "text");
        amountbox.setAttribute("value", 1);
        amountbox.setAttribute("id", name+"Amount");
        amountbox.setAttribute("onchange", "inputOnChange('"+name+"',"+price+")");
        amounttd.appendChild(amountbox);
        var increasebtn = document.createElement("button");
        increasebtn.setAttribute("class","addOrReduce");
        increasebtn.setAttribute("id",name+"Increase");
        increasebtn.setAttribute("onclick","increase('"+name+"',"+price+")");
        increasebtn.innerHTML = "+";
        amounttd.appendChild(increasebtn);
        cartItem.appendChild(amounttd);
        var totaltd = document.createElement("td");
        totaltd.setAttribute("id", name+"Total");
        totaltd.innerHTML = price;
        cartItem.appendChild(totaltd);
        document.getElementById("cartList").appendChild(cartItem);
        document.getElementById("totalPrice").innerHTML = parseInt(document.getElementById("totalPrice").innerHTML) + price;
    }else if(availability == "add"){
        alert("You already have this item in cart.");
    }else{
        alert("Sorry. This item is unavailable now.")
    }
}

function inputOnChange(name, price){
    if(Number.isNaN(parseInt(document.getElementById(name+"Amount").value))){
        alert("Please enter an integer!");
        window.open("index.html", "_self");
    }
    document.getElementById(name+"Total").innerHTML = price * document.getElementById(name+"Amount").value;
    var items = document.getElementById("cartList").children;
    var newTotal = 0;
    for(i = 0; i < items.length; i++){
        var itemInCart = items[i].id.substring(0, items[i].id.length-4);
        newTotal += parseInt(document.getElementById(itemInCart+"Total").innerHTML);
    }
    document.getElementById("totalPrice").innerHTML = newTotal;
    if(document.getElementById(name+"Amount").value == 0){
        document.getElementById(name+"Cart").remove();
    }
}

function decrease(name, price){
    if(document.getElementById(name+"Amount").value>1){
        document.getElementById(name+"Amount").value = parseInt(document.getElementById(name+"Amount").value) - 1;
        document.getElementById(name+"Total").innerHTML = price * document.getElementById(name+"Amount").value;
    }else{
        document.getElementById(name+"Cart").remove();
    }
    document.getElementById("totalPrice").innerHTML = parseInt(document.getElementById("totalPrice").innerHTML) - price;
}

function increase(name, price){
    document.getElementById(name+"Amount").value = parseInt(document.getElementById(name+"Amount").value) + 1;
    document.getElementById(name+"Total").innerHTML = price * document.getElementById(name+"Amount").value;
    document.getElementById("totalPrice").innerHTML = parseInt(document.getElementById("totalPrice").innerHTML) + price;
}

var num = 0;
var availability;
firebase.database().ref("menu").once('value', function(snapshot){
    for(key in snapshot.val()){
        if(key != "itemNum"){
            num++;
            var imageURL_V = snapshot.child(key).val().imageURL;
            var name_V = snapshot.child(key).val().name;
            var price_V = snapshot.child(key).val().price;
            var status_V = snapshot.child(key).val().status;
            if(status_V=="available"){
                availability = "add";
            }else{
                availability = "sold out";
            }
            var goods = "<div class=\"goods\" id=\"goods"+num+"\">"+
            "<img class=\"goodsPic\" src=\""+imageURL_V+"\"/>"+
            "<div class=\"goodsTitle\">"+name_V+"</div>"+
            "<div class=\"goodsDesc\">"+
            "$<span class=\"goodsprice\">"+price_V+"</span>"+
            "<button class=\"goodsAddToCartBtn\" id=\""+name_V+"Add\" onclick=\"add('"+name_V+"',"+price_V+",'"+availability+"')\">"+availability+"</button>"+
            "</div></div>";
            document.getElementById("goodsList").innerHTML += goods;
        }
    }
});    