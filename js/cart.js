var cart = [];

function addToCart(gameId)
{
    cart.push(gameId);
    saveCart();
}

function isGameInCart(gameId)
{
    return cart.indexOf(gameId) >= 0
}

function removeFromCart(index, gameId)
{
  /*  if (typeof gameId !== undefined)
    {
        index = cart.indexOf(gameId);
    }
   */ 
    cart.splice(index, 1);
    saveCart();
}

function saveCart()
{
    localStorage.setItem('cart', JSON.stringify(cart));
}

function loadCart()
{
    cart = JSON.parse(localStorage.getItem('cart'));
    if (cart === null)
    {
        cart = [];
    }
}


loadCart();
