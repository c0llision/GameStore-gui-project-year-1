function submitChanges() {
    loggedInUsername = getLoggedInUser();
    
    var editEmail = document.getElementById("editEmail");
    var editPhone = document.getElementById("editPhone");
    var editPassword = document.getElementById("editPassword");

    newDetails = new User();
    newDetails.username = loggedInUsername;
    newDetails.email = editEmail.value;
    newDetails.phone = editPassword.value;
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
    var editEmail = document.getElementById("editEmail");
    var editPhone = document.getElementById("editPhone");
    var editPassword = document.getElementById("editPassword");
    var menuLogout = document.getElementById('menuLogout');
    var submitBtn = document.getElementById('submitChanges');

    // Check if already logged in, redirect to index if not logged in
    processLogin();

    if (!getLoggedInUser())
    {
        window.location.replace("index.html");
    }

    // Event handlers
    menuLogout.addEventListener("click", function() {
        doLogout();
        window.location.replace("index.html");
    });

    submitBtn.addEventListener("click", submitChanges);

    userDetails = loadUser(username);

    editUsername.value = userDetails.username;
    editEmail.value = userDetails.email;
    editPhone.value = userDetails.phone;
});

