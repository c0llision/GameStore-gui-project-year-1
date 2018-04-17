function submitChanges() {
    loggedInUsername = getLoggedInUser();
    
    // ugh! - why do I have to do this?
    var emailInput = document.getElementById("editEmail");
    var phoneInput = document.getElementById("editPhone");
    var passwordInput = document.getElementById("editPassword");

    newDetails = new User();
    newDetails.username = loggedInUsername;
    newDetails.email = emailInput.value;
    newDetails.phone = phoneInput.value;
    if (passwordInput.value != '')
    {
        newDetails.password = passwordInput.value;
    }
    else
    {
        newDetails.password = userDetails.password;
    }

    saveUser(newDetails);
    detailsSavedNotification.classList.remove("d-none");
}


$(document).ready(function () {
    var usernameInput = document.getElementById("editUsername");
    var emailInput = document.getElementById("editEmail");
    var phoneInput = document.getElementById("editPhone");
    var passwordInput = document.getElementById("editPassword");
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

    usernameInput.value = userDetails.username;
    emailInput.value = userDetails.email;
    phoneInput.value = userDetails.phone;
});

