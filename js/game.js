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