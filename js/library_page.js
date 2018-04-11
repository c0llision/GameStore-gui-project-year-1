//  functions used on library.html page

function displayLibrary() {
    container.innerHTML = '';
    for (var i=0; i < library.length; i++)
    {
        if (i % 3 == 0)
        {
          var row = createHTMLTag('div', 'row', container);
        }

        var col = createHTMLTag('div', 'col-md-4', row);
        var title = createHTMLTag('div', 'h6', col);
        var img = createHTMLTag('img', 'itemImg', col);

        var gameId = library[i];

        var game = getGameById(gameId);

        title.innerHTML = game.title;
        img.src = game.image;
    }
}


$(document).ready(function () {
    // Page elements
    var container = document.getElementById("container");
    var menuLogout = document.getElementById('menuLogout');

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

    displayLibrary();
});
