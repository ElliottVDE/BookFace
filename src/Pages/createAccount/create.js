"use strict";

function authenticateEmail(email){
    const emailPattern = /\b[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,4}\b/;
    
    if(!emailPattern.test(email)){
        document.getElementById("emailError").textContent = "Please enter a valid email";
        return false;
    }
    
    document.getElementById("emailError").textContent = "";
    return true;

}

function authenticatePass(password, repassword){
    //Min 8 characters, one uppercase, one number, allows any special character
    const passPattern = /^(?=.*[A-Z])(?=.*\d)[A-Za-z\d!@#$%^&*()_+={}\[\]:;\"'|\\<>,.?/~`-]{8,}$/;

    if (!passPattern.test(password)){
        document.getElementById("passError").textContent = "Please enter a valid password";
        return false;
    }
    
    if (!(password.includes(repassword))){
        document.getElementById("repassError").textContent = "";
        document.getElementById("repassError").textContent = "Make sure each password matches";
        return false;
    }

    document.getElementById("repassError").textContent = "";
    document.getElementById("passError").textContent = "";
    return true;

}

function authenticateUserName(username){
    //No special characters
    const userPattern = /^[A-Za-z0-9+-]+$/;

    if (!userPattern.test(username)){
        document.getElementById("userError").textContent = "Please enter a valid username";
        return false;
    }
    
    document.getElementById("userError").textContent = "";
    return true;
}


$(document).ready( () => {

    const validateAccount = () => {

        let userName = $("#uname").val();
        let email = $("#email").val();
        let password = $("#password").val();
        let rePassword = $("#repassword").val();
        let accValid = true;

        let emailValid = authenticateEmail(email);

        let passValid = authenticatePass(password, rePassword);

        let userValid = authenticateUserName(userName);
    
        if(!userValid || !passValid || !emailValid){
            accValid = false;
        }

        if(accValid){
            location.assign("../Home/index.html");
        }

        return accValid;

    }

    $("#submit").on("click", evt => {
        if (!validateAccount()){
            evt.preventDefault();
        }
    });

    
});


//For unit tests
/*
module.exports = {
    authenticateEmail,
    authenticatePass,
    authenticateUserName
}
*/