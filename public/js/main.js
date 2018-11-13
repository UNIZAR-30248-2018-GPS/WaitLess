(function() {

    var app = angular.module('angularCarta', []);

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


    app.controller('mainController',  ['$scope','$http',mainController]);
})();