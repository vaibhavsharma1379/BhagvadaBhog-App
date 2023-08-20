app.service("rgtrPodService", ["$http", function ($http) {
    this.rgtrProduct = function (product) {
        console.log(product);
        $http({
            method: "POST",
            url: "https://bhagbad-bhog.onrender.com/products",
            data: product
        }).then(function (response) {
            console.log(response);
            alert(`${response.data.name} is registerred`);
        }, function (e) {
            alert(e.data.error.message)
            console.log(e);
        })
    }
}])

app.service("getProducts", ["$http", function ($http) {
    this.getProducts = function (allprod) {
        $http({
            method: "GET",
            url: "https://bhagbad-bhog.onrender.com/products"
        }).then(function (response) {
            allprod(response.data);
        }, function (e) {
            console.log(e);
            alert(e.data.error.message);
        }
        )
    }
}
])


app.service("deleteProduct", ["$http", function ($http) {
    this.deleteProduct = function (productName) {
     
    //   let config = {
    //     params: {
    //       name: productName // Pass the product name as a query parameter
    //     }
    //   };
  
    $http({
        method:"DELETE",
        url:"https://bhagbad-bhog.onrender.com/products",
        params:productName
    }).then(function (response) {
        // Handle the response here
        console.log(response);
        alert(`${response.data.name} is deleted`);
      }, function (e) {
        // Handle the error here
        console.log(e);
        alert(e.data.error.message);
      });
    //   $http.delete("https://bhagbad-bhog.onrender.com/products", config)
    //     .then(function (response) {
    //       // Handle the response here
    //       console.log(response);
    //       alert(`${response.data.name} is deleted`);
    //     }, function (e) {
    //       // Handle the error here
    //       console.log(e);
    //       alert(e.data.error.message);
    //     });
    }
  }]);
  


  app.service("loginService",["$http",function(h){
    this.loginUser=function(ulogin){
        h({
            method:"GET",
            url:"https://bhagbad-bhog.onrender.com/admin"
        }).then(function(response){
            ulogin(response.data);
        }, function(e){
            console.log(e.data.error.message)
        })
    }
}])