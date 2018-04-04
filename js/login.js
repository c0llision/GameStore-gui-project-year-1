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
