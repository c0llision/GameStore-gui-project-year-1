/*  cart.js
    Library functionality */

var library = [];

function addToLibrary(gameList)
{
    /* Add games to the library

      {param} gameList - int[] - array of gameId's to add
      {return} None */

    username = getLoggedInUser();

    if (!username)
    {
        console.log('unable to save library, not logged in');
        return false;
    }

    library = library.concat(gameList);
    localStorage.setItem('library-' + username, JSON.stringify(library));
}

function loadLibrary()
{
    /* Load library from localStorage

      {param} None
      {return} None */

    username = getLoggedInUser();

    if (!username)
    {
        console.log('unable to load library, not logged in');
        return false;
    }

    library = JSON.parse(localStorage.getItem('library-' + username));
    if (library === null)
    {
        library = [];
    }
}


function isGameInLibrary(gameId) {
    /* Check if game is already in the library

      {param} gameId - int - id of game to check
      {return} boolean */

    for (var i=0; i < library.length; i++)
    {
       if (library[i] == gameId)
       {
            return true;
       }
    }
    return false;
}
