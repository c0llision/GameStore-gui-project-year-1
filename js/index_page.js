//  functions used on index.html page


function showAlertMessage(message) {
    alertBox.style="display:block;";
    alertMessage.innerHTML = message;
}

function displayProducts() {
    container.innerHTML = '';
    for (var i=0; i < games.length; i++)
    {
        if (i % 3 == 0)
        {
          var row = createHTMLTag('div', 'row', container);
        }

        var col = createHTMLTag('div', 'col-md-4', row);
        var title = createHTMLTag('div', 'h6', col);
        var img = createHTMLTag('img', 'itemImg', col);
        var priceTag = createHTMLTag('p', 'priceTag', col);
        var addToCartBtn = createHTMLTag('button', 'btn btn-primary', col);

        // hacky AF
        var brTag = createHTMLTag('br', '', col);
        var brTag = createHTMLTag('br', '', col);

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
    return subTotal - discount;
}

function updateSubTotal(value)
{
    subTotal = value;
    subTotalMsg.innerHTML = subTotal.toFixed(2);
    handleCouponBox();
}

function updateDiscount(percent)
{
    discount = subTotal * (percent/100);
    discountMsg.innerHTML = discount.toFixed(2);
    updateGrandTotal();
}

function updateGrandTotal()
{
    grandTotalMsg.innerHTML = getGrandTotal().toFixed(2);
}

function handleCouponBox()
{
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
        var row = createHTMLTag('tr','',cartDiv);
        var heading = createHTMLTag('th','', row);
        var title = createHTMLTag('td','',row);
        var price = createHTMLTag('td','',row);
        var close = createHTMLTag('td','',row);
        var closeBtn = createHTMLTag('button', 'close', close);

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
    $('#loginScreen').modal('show');
    $('#registerScreen').modal('hide');
}

function showRegisterScreen()
{
    $('#loginScreen').modal('hide');
    $('#registerScreen').modal('show');
}


function displayRegisterError(message)
{
   registerInvalidMsgbox.classList.remove("d-none");
   registerInvalidMsg.innerHTML = message;
}

function displayLoginError(message)
{
   loginInvalidMsgbox.classList.remove("d-none");
   loginInvalidMsg.innerHTML = message;
}


function handleLogin()
{
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
    username = registerUsernameInput.value;
    password = registerPasswordInput.value;
    password2 = registerPasswordInput2.value;

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

    createUser(username, password);
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

    // Read cart contents from localStorage and update totals
    updateCart();

    // Check if already logged in
    if (getLoggedInUser())
    {
        doLogin(getLoggedInUser());
    }
    else
    {
        doLogout();
    }

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
