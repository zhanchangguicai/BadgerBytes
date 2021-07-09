var userkey = window.location.href.split("&")[0].split("=")[1];
var username;
firebase.database().ref("userinfo/"+userkey+"/username").once('value', function(snapshot){
    username = snapshot.val();
});
document.getElementById("checkOutLink").addEventListener("click", function(){
    var items = document.getElementById("cartList").children;
    if(items.length == 0){
        alert("Please add items to your cart");
    }else{
        var newOrderRef = firebase.database().ref("orders").push();
        var date = new Date();
        newOrderRef.set({
            username:username,
            status:"unpaid",
            completion:"no"
        });
        newOrderRef.child('time').set({
            year:date.getFullYear(),
            month:(date.getMonth()+1),
            day:date.getDate()
        });
        var items = document.getElementById("cartList").children;
        for(i = 0; i < items.length; i++){
            var itemInCart = items[i].id.substring(0, items[i].id.length-4);
            var itemNum = parseInt(document.getElementById(itemInCart+"Amount").value);
            newOrderRef.child('order').child(itemInCart).set(itemNum);
        }
        newOrderRef.child('totalPrice').set(parseInt(document.getElementById("totalPrice").innerHTML));
        if(confirm("Would you like to confirm your order?") == true){
            window.open("check_out.html?userkey="+userkey+"&orderkey="+newOrderRef.key,"_self");
        }
    }
});
