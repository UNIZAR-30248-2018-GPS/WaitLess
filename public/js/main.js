(function() {

    var app = angular.module('angularCarta', ['ngMaterial','ngRoute']);

    app.config(function($routeProvider, $locationProvider) {
        $routeProvider
            .when("/", {
                templateUrl : "carta.html",
                controller : "mainController"
            })
            .when("/prueba", {
                templateUrl : "prueba.html",
                controller : "pruebaController"
            });

        // use the HTML5 History API
        $locationProvider.html5Mode(true);
    });

    var mainController = function ($scope, $http) {



        $http({
            method: 'GET',
            url: '/api/carta'
        }).then(function (response) {
            $scope.platos = response.data;
        }, function (error) {
            console.log(error, "No funciona la peticion a la carta "+error);

        });

    }

    var pruebaController = function ($scope, $http) {

        $scope.msg = "I love Paris";

    }





    app.controller('mainController',  ['$scope','$http',mainController]);
    app.controller('pruebaController',  ['$scope','$http',pruebaController]);
})();