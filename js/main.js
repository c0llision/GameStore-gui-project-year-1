// functions used on all pages

function createHTMLTag(type, className, parentTag)
{
   var tag = document.createElement(type);
   tag.className = className;
   parentTag.appendChild(tag);
   return tag
}

function processLogin()
{
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
    $('#menuLogin').removeClass("d-none");
    $('#menuLogout').addClass("d-none");
    $('#menuLibrary').addClass("d-none");
    $('#menuSettings').addClass("d-none");
    logout();
    welcomeMsg.classList.add('invisible');
    usernameMsg.innerHTML = '';
}

