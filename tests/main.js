function testSuite()
{
    this.testId = 0;
    this.testFile = '';

    this.setTestFile = function(filename) {
        this.testId = 0;
        this.testFile = filename;
    }

    this.runTest = function(test) {
        this.testId++;

        if (test)
        {
            console.log('[' + this.testFile + '] Test #' + this.testId + ' - success');
        }
        else
        {
            console.log('[' + this.testFile + '] Test #' + this.testId + ' - FAIL!');
            process.exit(1);
        }
    }
}

function fakeLocalStorage() {
    this.values = {};

    this.setItem = function(key, value) {
        this.values[key] = value;
    }

    this.getItem = function(key) {
        if (this.values[key] == undefined)
        {
            return null;
        }
        return this.values[key];
    }
}

var localStorage = new fakeLocalStorage();
var test = new testSuite();
var fs = require('fs');

eval(fs.readFileSync('js/game.js')+'');
eval(fs.readFileSync('js/coupon.js')+'');
eval(fs.readFileSync('js/login.js')+'');
eval(fs.readFileSync('js/cart.js')+'');
eval(fs.readFileSync('js/library.js')+'');


// ---- game.js tests ----
    test.setTestFile('game.js');

    newGame = new Game(100, 'test', 100, 10, '');
    // #1
    test.runTest(newGame.title == 'test');

    var foundGame = getGameById(100);
    // #2
    test.runTest(foundGame.id = 100);


// ---- coupon.js tests ----
    test.setTestFile('coupon.js');

    // #1
    test.runTest(getCouponDiscount('10off') == 10); // #1


// ---- login.js tests ----
    test.setTestFile('login.js');

    userDetails = new user();
    userDetails.username = 'test';
    userDetails.password = 'test';
    saveUser(userDetails);
    // #1
    test.runTest(isUsernameTaken('test'));
    // #2
    test.runTest(!isUsernameTaken('nottaken'));

    // #3
    test.runTest(checkPassword('test', 'test'));

    login('test');
    // #4
    test.runTest(getLoggedInUser() == 'test');

    logout();
    // #5
    test.runTest(!getLoggedInUser()); 

// ---- cart.js tests ----
    test.setTestFile('cart.js');

    addToCart(100);
    addToCart(200);
    // #1
    test.runTest(cart[0] == 100);
    // #2
    test.runTest(cart[1] == 200);
    // #3
    test.runTest(isGameInCart(100));
    // #4
    test.runTest(!isGameInCart(101));

    // #5
    removeFromCart(0);
    test.runTest(!isGameInCart(100));

    saveCart();
    cart = [];
    loadCart();
    test.runTest(isGameInCart(200));

    
// ---- library.js tests ----
    test.setTestFile('library.js');
    
    login('test');
    addToLibrary([100, 200]);
    // #1
    test.runTest(library = [100, 200]);
    addToLibrary([100, 200, 300]);
    // #2
    test.runTest(library = [100, 200, 300]);
    // #3
    test.runTest(isGameInLibrary(300));
    // #4
    test.runTest(!isGameInLibrary(400));

    library = [];
    loadLibrary();
    // #5
    test.runTest(library = [100, 200, 300]);

