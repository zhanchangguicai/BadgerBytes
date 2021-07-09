function moveUp(_a){
    var _row = _a.parentNode.parentNode;
    var _node = _row.previousElementSibling;
    if(_node && _node.id != "title"){
      swapNode(_row,_node);
    }
}
function moveDown(_a){
    var _row = _a.parentNode.parentNode;
    var _node = _row.nextElementSibling;
    if(_node){
      swapNode(_row,_node);
    }
}
function swapNode(node1,node2){
    var _parent = node1.parentNode;
    var _t1 = node1.nextSibling;
    var _t2 = node2.nextSibling;
    if(_t1)_parent.insertBefore(node2,_t1);
    else _parent.appendChild(node2);
    if(_t2)_parent.insertBefore(node1,_t2);
    else _parent.appendChild(node1);
}

function completeOrder(node){
    if(node.innerHTML = "incomplete"){
        var orderkey = node.parentNode.previousElementSibling.previousElementSibling.previousElementSibling.innerHTML;
        firebase.database().ref('orders/'+orderkey+"/completion").set("yes");
        node.innerHTML = "complete";
    }
}

function printOrder(node){
    var orderkey = node.parentNode.previousElementSibling.previousElementSibling.innerHTML;
    firebase.database().ref("orders/"+orderkey).once('value', function(snapshot){
        var doc = new jsPDF();
        var place = 20;
        doc.text("Order # "+orderkey, 20, place);
        place += 10;
        doc.text("Order:", 20, place);
        place += 10;
        for(key in snapshot.val()["order"]){
            doc.text(key+": "+snapshot.val()["order"][key], 30, place);
            place += 10;
        }
        doc.text("Total price: "+snapshot.val()["totalPrice"], 20, place);
        place += 10;
        doc.text("Username: "+snapshot.val()["username"], 20, place);
        place += 10;
        doc.text("Status: "+snapshot.val()["status"], 20, place);
        place += 10;
        doc.text("Time: "+snapshot.val()["time"]["year"]+"-"+snapshot.val()["time"]["month"]+"-"+snapshot.val()["time"]["day"], 20, place);
        doc.save('orderInfo.pdf');
    });
}

firebase.database().ref("orders").orderByChild("completion").equalTo("no").once('value', function(snapshot){
    for(key in snapshot.val()){
        var newOrder = document.createElement("tr");
        var orderNum = document.createElement("td");
        orderNum.innerHTML = key;
        newOrder.appendChild(orderNum);
        var move = document.createElement("td");
        var up = document.createElement("a");
        up.setAttribute("href", "javascript:void(0)");
        up.setAttribute("onclick", "moveUp(this)");
        up.innerHTML = "up";
        move.appendChild(up);
        move.innerHTML += "&nbsp;&nbsp;&nbsp;&nbsp;";
        var down = document.createElement("a");
        down.setAttribute("href", "javascript:void(0)");
        down.setAttribute("onclick", "moveDown(this)");
        down.innerHTML = "down"
        move.appendChild(down);
        newOrder.appendChild(move);
        var print = document.createElement("td");
        var printBtn = document.createElement("a");
        printBtn.setAttribute("href", "javascript:void(0)");
        printBtn.setAttribute("onclick", "printOrder(this)");
        printBtn.innerHTML = "print order info";
        print.appendChild(printBtn);
        newOrder.appendChild(print);
        var completion = document.createElement("td");
        var completionBtn = document.createElement("a");
        completionBtn.setAttribute("href", "javascript:void(0)");
        completionBtn.setAttribute("onclick", "completeOrder(this)");
        completionBtn.innerHTML = "incomplete";
        completion.appendChild(completionBtn);
        newOrder.appendChild(completion);
        document.getElementById("tableBody").appendChild(newOrder);
    }
});