/*  game.js
    The game data is stored in an array, which is then used to construct objects that are stored in an object array */

function Game(id, name, price, discount, image) {
    /* Game object that contains a games details */

    this.id = id;
    this.title = name;
    this.price = price;
    this.discount = discount;
    this.image = image;
}


// Name, Price, Discount (out of 100), Image
var gameList = [
    [100, "PLAYERUNKNOWN'S BATTLEGROUNDS",      29.99,   0,   "imgs/games/pubg.png"],
    [101, "Far Cry 5",                          59.99,   0,   "imgs/games/farcry5.png"],
    [102, "Ni no Kuni II: Revenant Kingdom",    59.99,   0,   "imgs/games/ninokuni2.png"],
    [103, "Grand Theft Auto V",                 59.99,  50,   "imgs/games/gtav.png"],
    [104, "Tom Clancy's Ghost Recon Wildlands", 59.99,  67,   "imgs/games/ghostrecon.png"],
    [105, "Warhammer: Verintide 2",             27.99,   0,   "imgs/games/vermintide2.png"],
    [106, "Divinity: Original Sin 2",           44.99,   0,   "imgs/games/divinityos2.png"],
    [107, "Rocket League",                      19.99,  40,   "imgs/games/rocketleague.png"],
    [108, "Counter-Strike: Global Offensive",   13.99,   0,   "imgs/games/counterstrike.png"],
    [109, "Football Manager 2018",              54.99,  50,   "imgs/games/footballmanager2018.png"]
];


function newGameFromList(list)
{
    /* Helper function which creates a new game from a list of game details

      {param} None
      {return} Game() */

    return new Game(list[0], list[1], list[2], list[3], list[4]); 
}


function getGameById(gameId)
{
    /* Return a game object given its game id, returns false if there is no game with that id

      {param} gameId - string - game id to construct
      {return} Game() */

    for (var i=0; i < gameList.length; i++)
    {
        if (gameList[i][0] == gameId)
        {
            return newGameFromList(gameList[i]);
        }
    }
    return false;
}


var games = []

for (i=0; i < gameList.length; i++)
{
    games[i] = newGameFromList(gameList[i]);
}


