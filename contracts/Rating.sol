pragma solidity 0.4.25;

contract Rating {
    // Model a Product
    struct Product {
        uint id;
        string name;
        uint rateCount;
    }

    // Store accounts that have rated
    mapping(address => bool) public ratings;
    // Store Product
    // Fetch Product
    mapping(uint => Product) public Product;
    // Store Product Count
    uint public ProductCount;

    // rated event
    event ratedEvent (
        uint indexed _productId
    );

    constructor () public {
        addProduct("Product 1");
        addProduct("Product 2");
    }

    function addProduct (string _name) private {
        ProductCount ++;
        Product[ProductCount] = Product(ProductCount, _name, 0);
    }

    function rating (uint _productId) public {
        // require that they haven't rated before
        require(!ratings[msg.sender]);

        // require a valid product
        require(_productId > 0 && _productId <= ProductCount);

        // record that rater has rated
        ratings[msg.sender] = true;

        // update product rating Count
        Product[_productId].rateCount ++;

        // trigger rated event
        emit ratedEvent(_productId);
    }
}
