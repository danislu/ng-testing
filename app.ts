/// <reference path="includes/angularjs/angular.d.ts" />
/// <reference path="includes/angularjs/angular-route.d.ts" />
/// <reference path="services/localStorage.ts" />

var dsl = angular.module("dsl", ['ngRoute'])

.config(function($routeProvider){
    $routeProvider
        .when('/runs',
            {
                controller: "RunListController",
                templateUrl: 'partials/Runs.html'
            })
        .when('/runs/:id',
            {
                controller: "RunDetailsController",
                templateUrl: "partials/RunDetails.html"
            })
        .when('/whatever',
            {
                controller: "WhateverController",
                templateUrl: "partials/whatever.html"
            })
        .otherwise({ redirectTo : '/runs' });
})

.controller("WhateverController", function($scope){
    $scope.title = "whatever";
})

.controller("RunListController", function($scope, tracksFactory : RunningTracks){
    $scope.items = tracksFactory.Tracks;

    $scope.removeItem = function(item){
        if(!confirm("Are you sure?"))
            return;

        tracksFactory.RemoveTrack(item);
    };

    $scope.addItem = function() {
        var track = new RunningTrack($scope.newItem.name, $scope.newItem.length);
        tracksFactory.AddTrack(track);

        $scope.newItem.name = '';
        $scope.newItem.length = 0;
    };

    $scope.clear = function() {
        if(!confirm("Really delete all?"))
            return;

        tracksFactory.Clear();
    };
})

.controller("RunDetailsController", function($scope, $location, $routeParams, tracksFactory : RunningTracks) {
    $scope.selectedItem = tracksFactory.GetTrack($routeParams.id);

    $scope.deleteItem = function() {
        tracksFactory.RemoveTrack($scope.selectedItem);

        $location.path('#/');
    }
})

.factory("tracksFactory", ["RunningTrackStorageFactory", function(RunningTrackStorageFactory) : RunningTracks {
        var factory = RunningTrackStorageFactory;
        return new RunningTracks(factory);
}])

.factory("RunningTrackStorageFactory", RunningTrackStorageFactory);

interface IRunningTrackStorage {
    clear() : void;
    getItems() : RunningTrack[];
    addItem(item: RunningTrack) : void;
    removeItem(item: RunningTrack) : void;
}

function RunningTrackStorageFactory() : IRunningTrackStorage {
    var storage = new LocalStorage<RunningTrack>();

    return {
        clear: function() : void {
            storage.clear();
        },

        getItems: function() : RunningTrack[] {
            var list = [];
            for (var i : number = 0; i<storage.getLength(); i++){
                var key : string = storage.getKey(i);
                var value : RunningTrack = storage.getItem(key);

                list.push(value);
            }
            return list;
        },

        addItem: function(item: RunningTrack) : void {
            storage.setItem(item.id, item);
        },

        removeItem: function(item: RunningTrack) : void {
            storage.removeItem(item.id);
        }
    };
}

class RunningTrack {

    public id: string = GUIDGenerator.CreateGUID();

    constructor(public Name: string, public Length: number, public LastRan: Date = new Date()) {}
}

class GUIDGenerator {

    private static S4() : string {
        return (((1+Math.random())*0x10000)|0).toString(16).substring(1);
    }

    public static CreateGUID() : string {
        return (this.S4()+this.S4()+"-"+this.S4()+"-"+this.S4()+"-"+this.S4()+"-"+this.S4()+this.S4()+this.S4());
    }
}

class RunningTracks {

    private store : IRunningTrackStorage;
    public Tracks : RunningTrack[];

    constructor(storage : IRunningTrackStorage){
        this.store = storage;
        this.Tracks = this.store.getItems();
    }

    public Clear() {
        this.store.clear();
        this.Tracks.splice(0, this.Tracks.length);
    }

    public GetTrack(id : string) : RunningTrack {
        var runs = this.Tracks.filter(function(item) { return item.id == id; });
        return (runs.length > 0)
            ? runs[0]
            : null;
    }

    public AddTrack(item: RunningTrack){
        this.store.addItem(item);

        this.Tracks.push(item);
        //this.Tracks = this.store.getItems();
    }

    public RemoveTrack(item: RunningTrack){
        this.store.removeItem(item);

        var start = this.Tracks.indexOf(item);
        this.Tracks.splice(start, 1);
        //this.Tracks = this.store.getItems();
    }
}