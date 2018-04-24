/*  cart.js
    Cart functionality */

var cart = [];

function addToCart(gameId)
{
    /* Add a game to the cart

      {param} gameId - int - Id of game to add
      {return} None */

    cart.push(gameId);
    saveCart();
}

function isGameInCart(gameId)
{
    /* Check if game is in the cart

      {param} gameId - int - Id of game to check
      {return} boolean */

    return cart.indexOf(gameId) >= 0
}

function removeFromCart(index, gameId)
{
    /* Remove a game from the cart

      {param} gameId - int - Id of game to add
      {return} None */

    cart.splice(index, 1);
    saveCart();
}

function saveCart()
{
    /* Save the cart to localStorage

      {param} None
      {return} None */

    localStorage.setItem('cart', JSON.stringify(cart));
}

function loadCart()
{
    /* Load the cart from localStorage

      {param} None
      {return} None */

    cart = JSON.parse(localStorage.getItem('cart'));
    if (cart === null)
    {
        cart = [];
    }
}


loadCart();
