/*  index.js
    all code specific to the settings page, such as DOM manipulations and event handlers. */

var editEmail;
var editPhone;
var editPassword;

function submitChanges() {
    /* event handler for settings form submit.

      {param} None
      {return} None */

    loggedInUsername = getLoggedInUser();

    var editEmail = document.getElementById("editEmail");
    var editPhone = document.getElementById("editPhone");
    var editPassword = document.getElementById("editPassword");

    newDetails = new User();
    newDetails.username = loggedInUsername;
    newDetails.email = editEmail.value;
    newDetails.phone = editPhone.value;
    if (editPassword.value != '')
    {
        newDetails.password = editPassword.value;
    }
    else
    {
        newDetails.password = userDetails.password;
    }

    saveUser(newDetails);
    detailsSavedNotification.classList.remove("d-none");
}


$(document).ready(function () {
    var editUsername = document.getElementById("editUsername");
    editEmail = document.getElementById("editEmail");
    editPhone = document.getElementById("editPhone");
    editPassword = document.getElementById("editPassword");
    var menuLogout = document.getElementById('menuLogout');
    var submitBtn = document.getElementById('submitChanges');

    if (!getLoggedInUser())
    {
        window.location.replace("index.html");
    }

    // Event handlers
    menuLogout.addEventListener("click", function() {
        window.location.replace("index.html");
    });

    //submitBtn.addEventListener("click", submitChanges);

    userDetails = loadUser(username);

    editUsername.value = userDetails.username;
    //editName.value = userDetails.name;
    editEmail.value = userDetails.email;
    editPhone.value = userDetails.phone;
});

