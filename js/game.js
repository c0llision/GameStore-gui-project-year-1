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
        this.newPrice = this.price - (this.price * (this.discount/100));
    }

    this.image = image;
    
    this.toString = function(){
        var str = "<img src=\"" + this.image + "\" alt=\"" + this.title + "\"></br>" + this.title + ", " + this.newPrice.toFixed(2);
        return str;
    }
}