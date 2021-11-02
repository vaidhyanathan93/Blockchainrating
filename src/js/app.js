App = {
  web3Provider: null,
  contracts: {},
  account: '0x0',
  hasRated: false,

  init: function() {
    return App.initWeb3();
  },

  initWeb3: function() {
    // TODO: refactor conditional
    if (typeof web3 !== 'undefined') {
      // If a web3 instance is already provided by Meta Mask.
      App.web3Provider = web3.currentProvider;
      web3 = new Web3(web3.currentProvider);
    } else {
      // Specify default instance if no web3 instance provided
      App.web3Provider = new Web3.providers.HttpProvider('http://localhost:7545');
      web3 = new Web3(App.web3Provider);
    }
    return App.initContract();
  },

  initContract: function() {
    $.getJSON("Rating.json", function(product) {
      // Instantiate a new truffle contract from the artifact
      App.contracts.Rating = TruffleContract(product);
      // Connect provider to interact with contract
      App.contracts.Rating.setProvider(App.web3Provider);

      App.listenForEvents();

      return App.render();
    });
  },

  // Listen for events emitted from the contract
  listenForEvents: function() {
    App.contracts.Rating.deployed().then(function(instance) {
      // Restart Chrome if you are unable to receive this event
      // This is a known issue with Metamask
      // https://github.com/MetaMask/metamask-extension/issues/2393
      instance.ratedEvent({}, {
        fromBlock: 0,
        toBlock: 'latest'
      }).watch(function(error, event) {
        console.log("event triggered", event)
        // Reload when a new rating is recorded
        App.render();
      });
    });
  },

  render: function() {
    var productInstance;
    var loader = $("#loader");
    var content = $("#content");

    loader.show();
    content.hide();

    // Load account data
    web3.eth.getCoinbase(function(err, account) {
      if (err === null) {
        App.account = account;
        $("#accountAddress").html("Your Account: " + account);
      }
    });

    // Load contract data
    App.contracts.Rating.deployed().then(function(instance) {
      productInstance = instance;
      return productInstance.ProductCount();
    }).then(function(ProductCount) {
      var ProductResults = $("#ProductResults");
      ProductResults.empty();

      var ProductSelect = $('#ProductSelect');
      ProductSelect.empty();

      for (var i = 1; i <= ProductCount; i++) {
        productInstance.Product(i).then(function(product) {
          var id = product[0];
          var name = product[1];
          var rateCount = product[2];

          // Render product Result
          var productTemplate = "<tr><th>" + id + "</th><td>" + name + "</td><td>" + rateCount + "</td></tr>"
          ProductResults.append(productTemplate);

          // Render product ballot option
          var productOption = "<option value='" + id + "' >" + name + "</ option>"
          ProductSelect.append(productOption);
        });
      }
      return productInstance.ratings(App.account);
    }).then(function(hasRated) {
      // Do not allow a user to rating
      if(hasRated) {
        $('form').hide();
      }
      loader.hide();
      content.show();
    }).catch(function(error) {
      console.warn(error);
    });
  },

  castRate: function() {
    var productId = $('#ProductSelect').val();
    App.contracts.Rating.deployed().then(function(instance) {
      return instance.rating(productId, { from: App.account });
    }).then(function(result) {
      // Wait for rates to update
      $("#content").hide();
      $("#loader").show();
    }).catch(function(err) {
      console.error(err);
    });
  }
};

$(function() {
  $(window).load(function() {
    App.init();
  });
});
