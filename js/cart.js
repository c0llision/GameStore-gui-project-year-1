cart = [];

function addToCart(gameId)
{
    cart.push(gameId);
}

function isGameInCart(gameId)
{
    return cart.indexOf(gameId) >= 0
}

function removeFromCart(index, gameId)
{
    if (typeof gameId !== undefined)
    {
        index = cart.indexOf(gameId);
    }
    
    cart.splice(index, 1);
}
