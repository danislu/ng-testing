/// <reference path="includes/angularjs/angular.d.ts" />
/// <reference path="includes/angularjs/angular-route.d.ts" />
/// <reference path="model/runningtrack.ts" />
var dsl = angular.module("dsl", ['ngRoute']).config(function ($routeProvider) {
    $routeProvider.when('/runs', {
        controller: "RunListController",
        templateUrl: 'partials/Runs.html'
    }).when('/runs/:id', {
        controller: "RunDetailsController",
        templateUrl: "partials/RunDetails.html"
    }).when('/whatever', {
        controller: "WhateverController",
        templateUrl: "partials/whatever.html"
    }).otherwise({ redirectTo: '/runs' });
}).controller("WhateverController", function ($scope) {
    $scope.title = "whatever";
}).controller("RunListController", function ($scope, tracksFactory) {
    $scope.items = tracksFactory.Tracks;

    $scope.removeItem = function (item) {
        if (!confirm("Are you sure?"))
            return;

        tracksFactory.RemoveTrack(item);
    };

    $scope.addItem = function () {
        var track = new RunningTrack($scope.newItem.name, $scope.newItem.length);
        tracksFactory.AddTrack(track);

        $scope.newItem.name = '';
        $scope.newItem.length = 0;
    };

    $scope.clear = function () {
        if (!confirm("Really delete all?"))
            return;

        tracksFactory.Clear();
    };
}).controller("RunDetailsController", function ($scope, $location, $routeParams, tracksFactory) {
    $scope.selectedItem = tracksFactory.GetTrack($routeParams.id);

    $scope.deleteItem = function () {
        tracksFactory.RemoveTrack($scope.selectedItem);

        $location.path('#/');
    };
}).factory("tracksFactory", [
    "RunningTrackStorageFactory", function (RunningTrackStorageFactory) {
        var factory = RunningTrackStorageFactory;
        return new RunningTracks(factory);
    }]).factory("RunningTrackStorageFactory", RunningTrackStorageFactory);
//# sourceMappingURL=app.js.map
