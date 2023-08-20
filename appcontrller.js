'use strict';
var app = angular.module("app", ['ngRoute']);
app.config(function ($routeProvider) {
  $routeProvider.when("/", {
    templateUrl: "main.html"
  }).when("/products",{
    templateUrl:"products.html"
  }).when("/contact",{
    templateUrl:"contact.html"
  }).when("/admin",{
    templateUrl:"admin.html"
  }).when("/login",{
    templateUrl:"Login.html"
  })
});
app.controller("adminProductcontroller",["$scope","getProducts","deleteProduct",function($scope,getProducts,deleteProduct){
  $scope.name;
  $scope.weight;
  $scope.price;
  
  // $scope.img="./images/kali mirch.png";
  $scope.Productdata;
  getProducts.getProducts(function(prodData){
    $scope.Productdata=prodData;
    console.log($scope.Productdata);
  });
  console.log("name is"+$scope.name)
 $scope.deleteProd=function(){
  deleteProduct.deleteProduct($scope.name);
 }
}])


app.controller("productcontroller",["$scope","getProducts",function($scope,getProducts){
  $scope.name;
  $scope.weight;
  $scope.price;
  // $scope.img="./images/kali mirch.png";
  $scope.data;
  getProducts.getProducts(function(prodData){
    $scope.data=prodData;
    console.log($scope.data);
  });
  

}])


app.controller("slidectrl", ['$scope','$interval' ,'$document', function($scope, $interval,$document) {
  // Set of Photos
  $scope.photos = [
    { src: './images/amchur.png', desc: 'Image 01' },
    { src: './images/biryani.png', desc: 'Image 02' },
    { src: './images/chat.png', desc: 'Image 03' },
    { src: './images/haldi.png', desc: 'Image 04' },
    { src: './images/jeera.png', desc: 'Image 05' },
    { src: './images/pani puri.png', desc: 'Image 06' },
    { src: './images/lal mirch.png', desc: 'Image 07' },
    { src: './images/pav bhaji.png', desc: 'Image 8' }
  ];

  // initial image index
  $scope._Index = 0;

  // if a current image is the same as the requested image
  $scope.isActive = function(index) {
    return $scope._Index === index;
  };

  // show prev image
  $scope.showPrev = function() {
    $scope._Index = ($scope._Index > 0) ? --$scope._Index : $scope.photos.length - 1;
  };

  // show next image
  $scope.showNext = function() {
    $scope._Index = ($scope._Index < $scope.photos.length - 1) ? ++$scope._Index : 0;
  };
  // show a certain image on thumbnail click
  $scope.showPhoto = function(index) {
    $scope._Index = index;
  };
  // Keyboard navigation support
  $document.on('keydown', function(event) {
    $scope.$apply(function() {
      switch (event.keyCode) {
        case 37: // Left arrow key
          $scope.showPrev();
          break;
        case 39: // Right arrow key
          $scope.showNext();
          break;
        default:
          return; // Exit function if other keys are pressed
      }
    });
  });

  $interval(function(){
    $scope.showNext();
   
  },2000);
}]);

app.controller('MasalaController',["$scope","rgtrPodService", function(p,rgtrPodService){
  p.regtrProduct=function(){
   
    var productData={
      category:p.category,
      name: p.name,
      description: p.description,
      ingredients:p.ingredients.split(','),
      weight: p.weight,
      price:p.price,
      image:p.img
    }
  
    rgtrPodService.rgtrProduct(productData);
  }
}])
 


app.controller("loginctrl",["$scope", "$location", "loginService", function (p, $location, loginService){
  p.redirect=function(){
    $location.path('/admin');
  }
  p.login=function(){
    loginService.loginUser(
      function(userdata){
        p.adminArr=userdata;
        if(p.loginemail!=userdata.email || p.loginpassword!= userdata.password){
          alert("incorrect email or password");
        }
        else{
          p.redirect();
        }
      }
    )
  }
} ])