//  global vars and functions used on index.html page


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
    subTotalObj.innerHTML = subTotal.toFixed(2);
    handleCouponBox();
}

function updateDiscount(percent)
{
    discount = subTotal * (percent/100);
    discountObj.innerHTML = discount.toFixed(2);
    updateGrandTotal();
}

function updateGrandTotal()
{
    grandTotalObj.innerHTML = getGrandTotal().toFixed(2);
}

function handleCouponBox()
{
    couponDiscount = getCouponDiscount(couponBox.value);
    if (couponBox.value == '')
    {
        couponTxt.innerHTML = '';
    }
    else if (couponDiscount == 0)
    {
        couponTxt.innerHTML = 'Invalid coupon code';
        updateDiscount(0);
    }
    else
    {
        couponTxt.innerHTML = 'Valid coupon: ' + couponDiscount + "% off";
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
        cartTable.style="visibility:visible;";
    }
    else
    {
        cartTable.style="visibility:hidden;";
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

function doLogin(username)
{
    localStorage.setItem("LoggedInUser", username);
}

function displayRegisterError(message)
{
   registerInvalidMsgbox.style="display:block;"; 
   registerInvalidMsg.innerHTML = message;
}

function displayLoginError(message)
{
   loginInvalidMsgbox.style="display:block;"; 
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


