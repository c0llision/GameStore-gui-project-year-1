var MIN_USERNAME_LENGTH = 4;
var MIN_PASSWORD_LENGTH = 4;

function createUser(username, password)
{
    localStorage.setItem("user-" + username, password);
}

function checkPassword(username, password)
{
    if (localStorage.getItem("user-" + username) === password)
    {
        return true;
    }
    else
    {
        return false;
    }
}

function isUsernameTaken(username) {
    if (localStorage.getItem("user-" + username) !== null)
    {
        return true;
    }
    else
    {
        return false;
    }
}

function getLoggedInUser() {
    if (localStorage.getItem("LoggedInUser") === null)
    {
        return false;
    }
    else
    {
        return localStorage.getItem("LoggedInUser");
    }
}

//event listeners
//login
    document.getElementById("login").addEventListener("click", function(){
        getUserAndPass();

        if(!isUsernameTaken(username))
        {
            showLoginMsg(false, "Username does not exist!");
            return false;
        }

        if(!checkPassword(username, password))
        {
            showLoginMsg(false, "Password is incorrect!");
            return false;
        }

        localStorage.setItem("LoggedInUser", username);
        showLoginMsg(true, "Successfully logged in!");
        return true;
    }); 

    //register
        //document.getElementById("login").addEventListener("click", function(){  




          //}); 