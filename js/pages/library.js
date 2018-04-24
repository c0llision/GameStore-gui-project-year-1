/*  index.js
    all code specific to the libary page, such as DOM manipulations and event handlers. */

function displayLibrary() {
    /* Displays the products in the users library. Dynamically creates the HTML tags necessary inside a tag with id="container"

      {param} None
      {return} None */

    var container = document.getElementById("container");
    container.innerHTML = '';

    for (var i=0; i < library.length; i++)
    {
        if (i % 3 == 0)
        {
          var row = createHTMLTag('div', container, 'row');
        }

        var col = createHTMLTag('div', row, 'col-md-4');
        var title = createHTMLTag('div', col, 'h6');
        var img = createHTMLTag('img', col, 'itemImg');

        var gameId = library[i];

        var game = getGameById(gameId);

        title.innerHTML = game.title;
        img.src = game.image;
    }
}


$(document).ready(function () {
    // Page elements
    var menuLogout = document.getElementById('menuLogout');

    if (!getLoggedInUser())
    {
        window.location.replace("index.html");
    }

    // Event handlers
    menuLogout.addEventListener("click", function() {
        window.location.replace("index.html");
    });

    displayLibrary();
});
