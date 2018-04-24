/*  main.js
    Code used on all of the pages */

var menuSettings;
var welcomeMsg;
var usernameMsg;
var menuLogout;

function createHTMLTag(type, parentTag, className)
{
    /* Dynamically creates a HTML tag

      {param} type - string - type of tag to create (such as <br> <div>)
      {param} parentTag - string - id of tag to create the new tag inside of
      {param} className - string - name of class to apply to tag
      {return} Tag - DOM object of newly created tag */

   var tag = document.createElement(type);
   tag.className = className;
   parentTag.appendChild(tag);
   return tag
}

function processLogin()
{
    /* Check if the usr is logged in or logged out and trigger the correct handlers

      {param} None
      {return} None */

    if (getLoggedInUser())
    {
        doLogin(getLoggedInUser());
    }
    else
    {
        doLogout();
    }
}

function doLogin(username)
{
    /* handler for login event. Sets up the page elements accordingly and updates the users library

      {param} None
      {return} None */
    $('#menuLogin').addClass("d-none");
    $('#menuLogout').removeClass("d-none");
    $('#menuLibrary').removeClass("d-none");
    $('#menuSettings').removeClass("d-none");
    localStorage.setItem("LoggedInUser", username);
    welcomeMsg.classList.remove('invisible');
    usernameMsg.innerHTML = username;
    loadLibrary();
}

function doLogout()
{
    /* handler for logout event. Sets up the page elements accordingly and clears the users library

      {param} None
      {return} None */
    $('#menuLogin').removeClass("d-none");
    $('#menuLogout').addClass("d-none");
    $('#menuLibrary').addClass("d-none");
    $('#menuSettings').addClass("d-none");
    logout();
    welcomeMsg.classList.add('invisible');
    usernameMsg.innerHTML = '';
}

$(document).ready(function () {
    menuSettings = document.getElementById('menuSettings');
    welcomeMsg = document.getElementById('welcomeMsg');
    usernameMsg = document.getElementById('usernameMsg');
    menuLogout = document.getElementById('menuLogout');

    processLogin();

    // Event handlers
    menuLogout.addEventListener("click", doLogout);
});
