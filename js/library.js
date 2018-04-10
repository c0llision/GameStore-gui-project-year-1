var library = [];

function addToLibrary(gameList)
{
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
    for (var i=0; i < library.length; i++)
    {
       if (library[i] == gameId)
       {
            return true;
       }
    }
    return false;
}
