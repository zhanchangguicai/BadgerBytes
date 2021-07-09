var availability;
firebase.database().ref("menu").once('value', function(snapshot){
    for(key in snapshot.val()){
        if(key != "itemNum"){
            var imageURL_V = snapshot.child(key).val().imageURL;
            var name_V = snapshot.child(key).val().name;
            var price_V = snapshot.child(key).val().price;
            var status_V = snapshot.child(key).val().status;
            if(status_V=="available"){
                availability = "add";
            }else{
                availability = "sold out";
            }
            var newItem = document.createElement("div");
            newItem.setAttribute("class", "goods");
            var itemImg = document.createElement("img");
            itemImg.setAttribute("class", "goodsPic");
            itemImg.setAttribute("src", imageURL_V);
            itemImg.setAttribute("id", key+"Image");
            newItem.appendChild(itemImg);
            var title = document.createElement("div");
            title.setAttribute("class", "goodsTitle");
            title.innerHTML = name_V;
            newItem.appendChild(title);
            var price = document.createElement("div");
            price.setAttribute("class", "goodsDesc");
            price.innerHTML = "$"+price_V;
            var availOptions = document.createElement("div");
            availOptions.setAttribute("class", "goodsIsSoldOutDiv");
            var availOption1 = document.createElement("input");
            availOption1.setAttribute("type", "radio");
            availOption1.setAttribute("name", name_V+"Options");
            availOption1.setAttribute("id", key+"SoldOut");
            if(availability == "sold out"){
                availOption1.setAttribute("checked", "checked");
            }
            availOptions.appendChild(availOption1);
            var soldOutPrompt = document.createElement("nobr");
            soldOutPrompt.innerHTML = "sold out";
            availOptions.appendChild(soldOutPrompt);
            var availOption2 = document.createElement("input");
            availOption2.setAttribute("type", "radio");
            availOption2.setAttribute("name", name_V+"Options");
            availOption2.setAttribute("id", key+"Available");
            if(availability == "add"){
                availOption2.setAttribute("checked", "checked");
            }
            availOptions.appendChild(availOption2);
            var availablePrompt = document.createElement("nobr");
            availablePrompt.innerHTML = "available";
            availOptions.appendChild(availablePrompt);
            price.appendChild(availOptions);
            newItem.appendChild(price);
            var uploadDiv = document.createElement("div");
            uploadDiv.setAttribute("class", "goodsBottomDiv");
            var applyBtn = document.createElement("input");
            applyBtn.setAttribute("class", "applyBtn");
            applyBtn.setAttribute("type", "button");
            applyBtn.setAttribute("value", "apply");
            applyBtn.setAttribute("id", key+"Apply");
            applyBtn.setAttribute("onclick", "applyInfo(this)");
            uploadDiv.appendChild(applyBtn);
            newItem.appendChild(uploadDiv);
            document.getElementById("goodsList").appendChild(newItem);
        }
    }
}); 

document.getElementById("manageOrder").onclick=function(){
    window.open("manage_order.html", "_self");
}

function applyInfo(node){
    var key = node.id.substring(0, node.id.length-5);
    var availability;
    if (document.getElementById(key+"Available").checked){
        availability = "available";
    }else{
        availability = "sold out";
    }
    firebase.database().ref("menu/"+key+"/status").set(availability);
    alert("Menu update complete!");
}