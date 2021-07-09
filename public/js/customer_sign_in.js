var username_box = "username"
var password_box = "password"
var sign_in_button = "login"

var username_V, password_V, key_V, itemNum_V;
var valid = false;
var type = true;

function getValue(){
    username_V = document.getElementById(username_box).value;
    password_V = document.getElementById(password_box).value;
}

//give the button an event that triggers when it's clicked
document.getElementById(sign_in_button).onclick=function(){
    //get the user input
    getValue();
    if(username_V==""){
        alert("Please enter your username");
    }else if(password_V==""){
        alert("Please enter your password");
    }else{
        firebase.database().ref("menu/itemNum").once('value',function(snapshot){
            itemNum_V = snapshot.val();
        });
        //create a firebase database reference
        //it returns a json structure in which there are many (in this case, only one) small json structure that each represent a user's info
        firebase.database().ref("userinfo").orderByChild("username").equalTo(username_V).once('value', function(snapshot){
            //snapshot represents a reference to a small part of the database
            //if its value is null, namely no user in the database has username = usernameV
            if(snapshot.val()==null){
                alert("Username not exist. You can sign up or use the correct username");
            }else{
                for(key in snapshot.val()){
                    if(snapshot.child(key).val().password==password_V){
                        if(snapshot.child(key).val().type=="customer"){
                            valid = true;
                            key_V = key;
                        }else{
                            type = false;
                            alert("Please log in as "+snapshot.child(key).val().type);
                            window.open("index.html","_self");
                        }
                        break;
                    }
                }
                if(valid){
                    alert("Welcome, "+username_V+"!");
                    window.open("cart.html?key="+key_V+"&itemNum="+itemNum_V,"_self"); 
                }
                else if (type){
                    alert("Incorrect password");
                }
            }
        });
    }
}