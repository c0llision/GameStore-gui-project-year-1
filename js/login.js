/*  cart.js
    Cart functionality */

var MIN_USERNAME_LENGTH = 4;
var MIN_PASSWORD_LENGTH = 4;

function User()
{
    /* User object that contains users details */

    this.username = '';
    this.email = '';
    this.phone = '';
    this.password = '';
}

function saveUser(user)
{
    /* Save the user object to local storage

      {param} user - User() - User to save
      {return} None */

    localStorage.setItem('user-' + user.username, JSON.stringify(user));
}

function loadUser(username)
{
    /* Load the user object from local storage

      {param} username - string - Username to load
      {return} User() - user object */

    return JSON.parse(localStorage.getItem('user-' + username));
}

function checkPassword(username, password)
{
    /* Checks that the provided username and password match an account

      {param} username - string - Username to check
      {param} password - string - Password to check
      {return} boolean */

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
    /* Checks if the provided username is already taken

      {param} username - string - Username to check
      {return} boolean */

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
    /* Returns the username of the currently logged in user, returns false if not logged in

      {param} None
      {return} String - username
      {return} boolean */

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
    /* Marks the username as logged in in localStorage

      {param} username - string - username to login to
      {return} None */

    localStorage.setItem("LoggedInUser", username);
}

function logout()
{
    /* Clears localStorage so no user is logged in

      {param} None
      {return} None */

    localStorage.setItem("LoggedInUser", '');
}
