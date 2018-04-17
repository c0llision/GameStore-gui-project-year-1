var MIN_USERNAME_LENGTH = 4;
var MIN_PASSWORD_LENGTH = 4;

function User()
{
    this.username = '';
    this.email = '';
    this.phone = '';
    this.password = '';
}

function saveUser(user)
{
    localStorage.setItem('user-' + user.username, JSON.stringify(user));
}

function loadUser(username)
{
    return JSON.parse(localStorage.getItem('user-' + username));
}

function checkPassword(username, password)
{
    user = loadUser(username)

    if (user == null)
    {
        return false;
    }

    if (user.password === password)
    {
        return true;
    }
    else
    {
        return false;
    }
}

function isUsernameTaken(username)
{
    if (localStorage.getItem("user-" + username) !== null)
    {
        return true;
    }
    else
    {
        return false;
    }
}


function getLoggedInUser()
{
    if (localStorage.getItem("LoggedInUser") === null)
    {
        return false;
    }
    else
    {
        return localStorage.getItem("LoggedInUser");
    }
}

function login(username)
{
    localStorage.setItem("LoggedInUser", username);
}

function logout()
{
    localStorage.setItem("LoggedInUser", '');
}
