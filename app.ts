/// <reference path="all.ts" />

angular.module("dsl", ['ngRoute'])

    .config(function($routeProvider){
        $routeProvider
            .when('/runs',
            {
                controller: "RunViewModel",
                templateUrl: 'partials/Runs.html'
            })
            .when('/runs/:id',
            {
                controller: "DetailsViewModel",
                templateUrl: "partials/RunDetails.html"
            })
            .when('/whatever',
            {
                controller: "WhateverController",
                templateUrl: "partials/whatever.html"
            })
            .otherwise({ redirectTo : '/runs' });
    })

    .controller("RootController", function($scope, $location){
        $scope.location = $location;
    })

    .controller("WhateverController", function($scope){
        $scope.title = "whatever";
    })

    .controller("RunViewModel", function($scope, runController : RunController){
        $scope.items = runController.Tracks;
        $scope.removeItem = function(item){
            if(!confirm("Are you sure?")) return;
            runController.RemoveTrack(item);
        };
        $scope.addItem = function() {
            var track = new Run($scope.newItem.name, $scope.newItem.length);
            runController.AddTrack(track);
            $scope.newItem.name = '';
            $scope.newItem.length = 0;
        };
        $scope.clear = function() {
            if(!confirm("Really delete all?")) return;
            runController.Clear();
        };
    })

    .controller("DetailsViewModel", function($scope, $location, $routeParams, runController : RunController) {
        $scope.selectedItem = runController.GetTrack($routeParams.id);
        $scope.deleteItem = function() {
            runController.RemoveTrack($scope.selectedItem);
            $scope.selectedItem = null;
            $location.path('#/');
        }
    })

    .service("runController", function() : RunController {
        return new RunController(new RunStorage);
    });