/// <reference path="includes/angularjs/angular.d.ts" />
/// <reference path="includes/angularjs/angular-route.d.ts" />
/// <reference path="services/localStorage.ts" />
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

function RunningTrackStorageFactory() {
    var storage = new LocalStorage();

    return {
        clear: function () {
            storage.clear();
        },
        getItems: function () {
            var list = [];
            for (var i = 0; i < storage.getLength(); i++) {
                var key = storage.getKey(i);
                var value = storage.getItem(key);

                list.push(value);
            }
            return list;
        },
        addItem: function (item) {
            storage.setItem(item.id, item);
        },
        removeItem: function (item) {
            storage.removeItem(item.id);
        }
    };
}

var RunningTrack = (function () {
    function RunningTrack(Name, Length, LastRan) {
        if (typeof LastRan === "undefined") { LastRan = new Date(); }
        this.Name = Name;
        this.Length = Length;
        this.LastRan = LastRan;
        this.id = GUIDGenerator.CreateGUID();
    }
    return RunningTrack;
})();

var GUIDGenerator = (function () {
    function GUIDGenerator() {
    }
    GUIDGenerator.S4 = function () {
        return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
    };

    GUIDGenerator.CreateGUID = function () {
        return (this.S4() + this.S4() + "-" + this.S4() + "-" + this.S4() + "-" + this.S4() + "-" + this.S4() + this.S4() + this.S4());
    };
    return GUIDGenerator;
})();

var RunningTracks = (function () {
    function RunningTracks(storage) {
        this.store = storage;
        this.Tracks = this.store.getItems();
    }
    RunningTracks.prototype.Clear = function () {
        this.store.clear();
        this.Tracks.splice(0, this.Tracks.length);
    };

    RunningTracks.prototype.GetTrack = function (id) {
        var runs = this.Tracks.filter(function (item) {
            return item.id == id;
        });
        return (runs.length > 0) ? runs[0] : null;
    };

    RunningTracks.prototype.AddTrack = function (item) {
        this.store.addItem(item);

        this.Tracks.push(item);
        //this.Tracks = this.store.getItems();
    };

    RunningTracks.prototype.RemoveTrack = function (item) {
        this.store.removeItem(item);

        var start = this.Tracks.indexOf(item);
        this.Tracks.splice(start, 1);
        //this.Tracks = this.store.getItems();
    };
    return RunningTracks;
})();
//# sourceMappingURL=app.js.map
