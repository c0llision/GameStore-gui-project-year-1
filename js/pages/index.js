/*  index.js
    all code specific to the index page, such as DOM manipulations and event handlers. */


function showAlertMessage(message) {
    /* Show an alert message on the page using bootstrap

      {param} message - string - Message to display
      {return} None */

    alertBox.style="display:block;";
    alertMessage.innerHTML = message;
}

function displayProducts() {
    /* Displays the products on the page. Dynamically creates the HTML tags necessary inside a tag with id="container"

      {param} None
      {return} None */

    container.innerHTML = '';
    for (var i=0; i < games.length; i++)
    {
        if (i % 3 == 0)
        {
          var row = createHTMLTag('div', container,'row');
        }

        var col = createHTMLTag('div', row, 'col-md-4');
        var title = createHTMLTag('div', col, 'h6');
        var img = createHTMLTag('img', col, 'itemImg');
        var priceTag = createHTMLTag('p', col, 'priceTag');
        var addToCartBtn = createHTMLTag('button', col, 'btn btn-primary');

        // hacky AF
        var brTag = createHTMLTag('br', col);
        var brTag = createHTMLTag('br', col);

        var game = games[i];

        title.innerHTML = game.title;
        img.src = game.image;
        priceTag.innerHTML = "Price: " + game.price;
        addToCartBtn.innerHTML = "Add To Cart";
        addToCartBtn.id = game.id;

        addToCartBtn.addEventListener("click", function() {
            if (isGameInCart(this.id))
            {
                showAlertMessage("Game already in Cart");
            }
            else if (isGameInLibrary(this.id))
            {
                showAlertMessage("You've already purchased this game");
            }
            else
            {
                addToCart(this.id);
                updateCart();
            }
        });
    }
}

// ------------ Cart -----------------


var subTotal = 0;
var discount = 0;

function getGrandTotal()
{
    /* Returns the total after this coupon code is applied

      {param} None
      {return} grandTotal - int - Grand total */

    return subTotal - discount;
}

function updateSubTotal(value)
{
    /* Changes the subtotal, ensuring the page is updated

      {param} value - int - value to change subTotal to
      {return} None */

    subTotal = value;
    subTotalMsg.innerHTML = subTotal.toFixed(2);
    handleCouponBox();
}

function updateDiscount(percent)
{
    /* Changes the discount percent, ensuring the page is updated and that grandTotal is recalculated

      {param} value - int - value to change discount to
      {return} None */

    discount = subTotal * (percent/100);
    discountMsg.innerHTML = discount.toFixed(2);
    updateGrandTotal();
}

function updateGrandTotal()
{
    /* Updates the grandTotal displayed on the page to the actual value

      {param} None
      {return} None */

    grandTotalMsg.innerHTML = getGrandTotal().toFixed(2);
}

function handleCouponBox()
{
    /* handler for couponBox keydown. Check if coupon is valid and if so tries to apply it.

      {param} None
      {return} None */

    couponDiscount = getCouponDiscount(couponInput.value);
    if (couponInput.value == '')
    {
        couponMsg.innerHTML = '';
        updateDiscount(0);
    }
    else if (couponDiscount == 0)
    {
        couponMsg.innerHTML = 'Invalid coupon code';
        updateDiscount(0);
    }
    else
    {
        couponMsg.innerHTML = 'Valid coupon: ' + couponDiscount + "% off";
        updateDiscount(couponDiscount);
    }
}

function updateCart()
{
    /* Updates the items in the cart and the cart totals.

      {param} None
      {return} None */

    var cartTable = document.getElementById('cartTable');
    var cartDiv = document.getElementById('cart');
    cartDiv.innerHTML = '';
    newSubTotal = 0;

    if (cart.length > 0)
    {
        cartTable.classList.remove('invisible');
    }
    else
    {
        cartTable.classList.add('invisible');
    }

    for (var i=0; i < cart.length; i++)
    {
        var row = createHTMLTag('tr', cartDiv);
        var heading = createHTMLTag('th', row);
        var title = createHTMLTag('td', row);
        var price = createHTMLTag('td', row);
        var close = createHTMLTag('td', row);
        var closeBtn = createHTMLTag('button', close, 'close');

        var gameDetails = getGameById(cart[i]);
        newSubTotal += parseFloat(gameDetails.price.toFixed(2));

        heading.innerHTML = (i+1);
        title.innerHTML = gameDetails.title;
        price.innerHTML = gameDetails.price;
        closeBtn.innerHTML = 'x';
        closeBtn.id = i;
        closeBtn.addEventListener("click", function() {
            removeFromCart(this.id);
            updateCart();
        });
    }
    updateSubTotal(newSubTotal);
    handleCouponBox();
    saveCart();
}

function doCheckout()
{
    /* Handler for checkout. Ensures user is logged in and adds items in cart to users library and clears the cart.

      {param} None
      {return} None */

    if (!getLoggedInUser())
    {
        showAlertMessage("You must be logged in to checkout.");
        return false;
    }

    addToLibrary(cart);
    cart = [];
    updateCart();
}
// --- login/register ----

function showLoginScreen()
{
    /* Shows the login modal and ensures register model is hidden

      {param} None
      {return} None */

    $('#loginScreen').modal('show');
    $('#registerScreen').modal('hide');
}

function showRegisterScreen()
{
    /* Shows the register modal and ensures login model is hidden

      {param} None
      {return} None */

    $('#loginScreen').modal('hide');
    $('#registerScreen').modal('show');
}


function displayRegisterError(message)
{
    /* Displays an error on the register modal

      {param} message - string - Message to display
      {return} None */

   registerInvalidMsgbox.classList.remove("d-none");
   registerInvalidMsg.innerHTML = message;
}

function displayLoginError(message)
{
    /* Displays an error on the login modal

      {param} message - string - Message to display
      {return} None */

   loginInvalidMsgbox.classList.remove("d-none");
   loginInvalidMsg.innerHTML = message;
}


function handleLogin()
{
    /* Login event handler. Checks username and password is valid and processes the login

      {param} None
      {return} None */

    username = loginUsernameInput.value;
    password = loginPasswordInput.value;

    if (checkPassword(username, password))
    {
        doLogin(username);
        $('#loginScreen').modal('hide');
    }
    else
    {
        displayLoginError("Invalid username or password");
    }
}

function handleRegister()
{
    /* Register event handler. Checks details entered are valid and creates the account and logs in

      {param} None
      {return} None */

    username = registerUsernameInput.value;
    password = registerPasswordInput.value;
    password2 = registerPasswordInput2.value;
    email = registerEmailInput.value;
    phone = registerPhoneInput.value;

    if (username.length < MIN_USERNAME_LENGTH)
    {
        displayRegisterError("Username is too short!");
        return false;
    }

    if (password.length < MIN_PASSWORD_LENGTH)
    {
        displayRegisterError("Password is too short!");
        return false;
    }

    if (password != password2)
    {
        displayRegisterError("Passwords don't match!");
        return false;
    }
    
    if (isUsernameTaken(username))
    {
        displayRegisterError("Username is taken!");
        return false;
    }

    userDetails = new User();
    userDetails.username = username;
    userDetails.password = password;
    userDetails.email = email;
    userDetails.phone = phone;
    saveUser(userDetails);
    $('#registerScreen').modal('hide');
    doLogin(username);
    return true;
}


$(document).ready(function () {
    // Page elements
    var container = document.getElementById("container");
    var couponInput = document.getElementById('couponInput');
    var couponMsg = document.getElementById('couponMsg');
    var discountMsg = document.getElementById('discountMsg');
    var grandTotalMsg = document.getElementById('grandTotalMsg');
    var subTotalMsg = document.getElementById('subTotalMsg');
    var menuLogin = document.getElementById('menuLogin');
    var menuSettings = document.getElementById('menuSettings');
    var menuLogout = document.getElementById('menuLogout');
    var welcomeMsg = document.getElementById('welcomeMsg');
    var usernameMsg = document.getElementById('usernameMsg');
    var checkoutBtn = document.getElementById('checkoutBtn');
    var alertBox = document.getElementById('alertBox');
    var alertMessage = document.getElementById('alertMessage');

    // Login popup elements
    var loginUsernameInput = document.getElementById('loginUsernameInput');
    var loginPasswordInput = document.getElementById('loginPasswordInput');
    var loginInvalidMsgbox = document.getElementById('loginInvalidMsgbox');
    var loginInvalidMsg = document.getElementById('loginInvalidMsg');
    var loginRegisterLink = document.getElementById('loginRegisterLink');
    var loginSubmitBtn = document.getElementById('loginSubmitBtn');

    // Register popup elements
    var registerUsernameInput = document.getElementById('registerUsernameInput');
    var registerPasswordInput = document.getElementById('registerPasswordInput');
    var registerPasswordInput2 = document.getElementById('registerPasswordInput2');
    var registerInvalidMsgbox = document.getElementById('registerInvalidMsgbox');
    var registerInvalidMsg = document.getElementById('registerInvalidMsg');
    var registerLoginLink = document.getElementById('registerLoginLink');
    var registerSubmitBtn = document.getElementById('registerSubmitBtn');

    // Display a random banner on page load
    var carousel_items = document.getElementsByClassName('carousel-item');
    var random_index = Math.floor(Math.random() * carousel_items.length);
    carousel_items[random_index].classList.add("active");

    // Read cart contents from localStorage and update totals
    updateCart();

    // Check if already logged in
    processLogin();

    // Event handlers
    couponInput.addEventListener("keyup", handleCouponBox, false);
    menuLogin.addEventListener("click", showLoginScreen);
    registerLoginLink.addEventListener("click", showLoginScreen);
    loginRegisterLink.addEventListener("click", showRegisterScreen);
    loginSubmitBtn.addEventListener("click", handleLogin);
    registerSubmitBtn.addEventListener("click", handleRegister);
    checkoutBtn.addEventListener("click", doCheckout);
    menuLogout.addEventListener("click", doLogout);

    // Display products
    displayProducts();
});
