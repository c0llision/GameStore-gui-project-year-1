function Game(name, price, discount, image) {
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

    //var cartCount = 0;
    this.addToCart = function(){
    
        alert("TEST: " + this.title + " added to shopping cart");
        //used to store items in shopping cart, will need to add unique ID to games
        //will need to ensure that game can only add once, so will need to search local storage first before adding
        //localStorage.setItem(, this.ID);
    }

}