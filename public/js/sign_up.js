var username_box = "username"
var password_box = "password"
var password_check_box = "password_check"
var email_box = "email"
var phone_box = "phone"
var first_name_box = "first_name"
var last_name_box = "last_name"
var address_box = "address"
var state_box = "state"
var zipcode_box = "zipcode"
var sign_up_button = "register"

var username_V, password_V, password_check_V, email_V, phone_V, first_name_V, last_name_V, address_V, state_V, zipcode_V;

function getValue(){
    username_V = document.getElementById(username_box).value;
    password_V = document.getElementById(password_box).value;
    password_check_V = document.getElementById(password_check_box).value;
    email_V = document.getElementById(email_box).value;
    phone_V = document.getElementById(phone_box).value;
    first_name_V = document.getElementById(first_name_box).value;
    last_name_V = document.getElementById(last_name_box).value;
    address_V = document.getElementById(address_box).value;
    state_V = document.getElementById(state_box).value;
    zipcode_V = document.getElementById(zipcode_box).value;
}

document.getElementById(sign_up_button).onclick=function(){
    getValue();
    if(username_V=="" || password_V=="" || password_check_V=="" || email_V=="" || phone_V=="" ||
     first_name_V=="" || last_name_V=="" || address_V=="" || state_V=="" || zipcode_V==""){
        alert("Please fill all your information");
    }else if(password_V != password_check_V){
        alert("You entered different password. Please check your password.");
    }else{
        firebase.database().ref("userinfo").orderByChild("username").equalTo(username_V).once('value', function(snapshot){
            if(snapshot.val()!=null){
                alert("This username already exist, please sign in or use another username");
            }else{
                var newUserRef = firebase.database().ref("userinfo").push();
                newUserRef.set({
                    username:username_V,
                    password:password_V,
                    email:email_V,
                    phone:phone_V,
                    firstName:first_name_V,
                    lastName:last_name_V,
                    address:address_V,
                    state:state_V,
                    zipcode:zipcode_V,
                    type:"customer"
                }); 
                alert("You have successfully signed up as a customer!");
                window.open("customerLogin.html","_self");
            }
        });
    }
}