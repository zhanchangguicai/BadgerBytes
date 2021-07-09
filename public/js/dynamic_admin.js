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
            var titleInput = document.createElement("input");
            titleInput.setAttribute("type", "text");
            titleInput.setAttribute("class", "goodsTitleInput");
            titleInput.setAttribute("value", name_V);
            titleInput.setAttribute("id", key+"Title");
            title.appendChild(titleInput);
            newItem.appendChild(title);
            var price = document.createElement("div");
            price.setAttribute("class", "goodsDesc");
            price.innerHTML = "$";
            var priceSpan = document.createElement("span");
            priceSpan.setAttribute("class", "goodsprice");
            var priceValue = document.createElement("input");
            priceValue.setAttribute("class", "goodspriceInput");
            priceValue.setAttribute("type", "text");
            priceValue.setAttribute("value", price_V);
            priceValue.setAttribute("id", key+"Price");
            priceSpan.appendChild(priceValue);
            price.appendChild(priceSpan);
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
            var fileInput = document.createElement("input");
            fileInput.setAttribute("type", "file");
            fileInput.setAttribute("value", "upload");
            fileInput.setAttribute("id", key+"upload");
            fileInput.addEventListener('change', function(e){
                var thisKey = this.id.substring(0, this.id.length-6);
                var file = e.target.files[0];
                var storageRef = firebase.storage().ref(file.name);
                var task = storageRef.put(file);
                task.on('state_changed',
                    function complete(){
                        task.snapshot.ref.getDownloadURL().then((downloadURL) => {
                            document.getElementById(thisKey+"Image").src=downloadURL;
                        })
                    });
            });
            uploadDiv.appendChild(fileInput);
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

document.getElementById("addNewItem").onclick = function(){
    var num = 0;
    while(document.getElementById("newItem"+num+"Image") != null){
        num++;
    }
    var imageURL_V = "img/staffCon.jpg";
    var name_V = "newItem"+num;
    var price_V = 0;
    var status_V = "available";
    if(status_V=="available"){
        availability = "add";
    }else{
        availability = "sold out";
    }
    var newUserRef = firebase.database().ref("menu").push();
    newUserRef.set({
        imageURL:imageURL_V,
        name:name_V,
        price:price_V,
        status:status_V
    }); 
    var key = newUserRef.key;
    var newItem = document.createElement("div");
    newItem.setAttribute("class", "goods");
    var itemImg = document.createElement("img");
    itemImg.setAttribute("class", "goodsPic");
    itemImg.setAttribute("src", imageURL_V);
    itemImg.setAttribute("id", key+"Image");
    newItem.appendChild(itemImg);
    var title = document.createElement("div");
    title.setAttribute("class", "goodsTitle");
    var titleInput = document.createElement("input");
    titleInput.setAttribute("type", "text");
    titleInput.setAttribute("class", "goodsTitleInput");
    titleInput.setAttribute("value", name_V);
    titleInput.setAttribute("id", key+"Title");
    title.appendChild(titleInput);
    newItem.appendChild(title);
    var price = document.createElement("div");
    price.setAttribute("class", "goodsDesc");
    price.innerHTML = "$";
    var priceSpan = document.createElement("span");
    priceSpan.setAttribute("class", "goodsprice");
    var priceValue = document.createElement("input");
    priceValue.setAttribute("class", "goodspriceInput");
    priceValue.setAttribute("type", "text");
    priceValue.setAttribute("value", price_V);
    priceValue.setAttribute("id", key+"Price");
    priceSpan.appendChild(priceValue);
    price.appendChild(priceSpan);
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
    var fileInput = document.createElement("input");
    fileInput.setAttribute("type", "file");
    fileInput.setAttribute("value", "upload");
    fileInput.addEventListener('change', function(e){
        var file = e.target.files[0];
        var storageRef = firebase.storage().ref(file.name);
        var task = storageRef.put(file);
        task.on('state_changed',
            function complete(){
                task.snapshot.ref.getDownloadURL().then((downloadURL) => {
                    document.getElementById(key+"Image").src=downloadURL;
                })
            });
    });
    uploadDiv.appendChild(fileInput);
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
    firebase.database().ref("menu/"+key).set({
        imageURL:document.getElementById(key+"Image").src,
        name:document.getElementById(key+"Title").value,
        price:document.getElementById(key+"Price").value,
        status:availability
    });
    alert("Menu update complete!");
}