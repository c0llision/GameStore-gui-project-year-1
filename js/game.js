function Game(id, name, price, discount, image) {
    this.id = id;
    this.title = name;
    this.price = price;
    this.discount = discount;

    if (this.discount == 0)
    {
        this.newPrice = this.price;
    }
    else
    {   //-0.005 solves rounding problem, hopefully this will not create problems for adding totals
        this.newPrice = this.price - (this.price * (this.discount/100)) - 0.005;
    }

    this.image = image;



    this.toString = function(){
        var str = "<img src=\"" + this.image + "\" alt=\"" + this.title + "\"></br>" + this.title + ", " + this.newPrice.toFixed(2);
         str += "<button onclick=\'games[" + i + "].addToCart()\'>Add to Cart</button>";

        return str;
    }

    this.addToCart = function(){
        alert("TEST: " + this.title + " added to shopping cart");
        //assigns to local storage, could use product name as the key, will this make for easier identification on other pages?
        localStorage.setItem(("productID#" + this.id), this.id); 
    }
}


// Name, Price, Discount (out of 100), Image
var gameList = [
    [100, "PLAYERUNKNOWN'S BATTLEGROUNDS",      29.99,   0,   "imgs/games/PUBG.png"],
    [101, "Far Cry 5",                          59.99,   0,   "imgs/games/Farcry5.png"],
    [102, "Ni no Kuni II: Revenant Kingdom",    59.99,   0,   "imgs/games/NinoKuni2.png"],
    [103, "Grand Theft Auto V",                 59.99,  50,   "imgs/games/GTAV.png"],
    [104, "Tom Clancy's Ghost Recon Wildlands", 59.99,  67,   "imgs/games/GhostRecon.png"],
    [105, "Warhammer: Verintide 2",             27.99,   0,   "imgs/games/Vermintide2.png"],
    [106, "Divinity: Original Sin 2",           44.99,   0,   "imgs/games/DivinityOS2.png"],
    [107, "Rocket League",                      19.99,  40,   "imgs/games/RocketLeague.png"],
    [108, "Counter-Strike: Global Offensive",   13.99,   0,   "imgs/games/CounterStrike.png"],
    [109, "Football Manager 2018",              54.99,  50,   "imgs/games/FootballManager2018.png"]
];


function newGameFromList(list)
{
    return new Game(list[0], list[1], list[2], list[3], list[4]); 
}


function getGameById(gameId)
{
    for (var i=0; i < gameList.length; i++)
    {
        if (gameList[i][0] == gameId)
        {
            return newGameFromList(gameList[i]);
        }
    }
    console.log('fuckled');
    return false;
}


var games = []

for (i=0; i < gameList.length; i++)
{
    games[i] = newGameFromList(gameList[i]);
}


