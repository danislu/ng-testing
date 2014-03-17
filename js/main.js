
var app = angular.module("myApp", ["dsl.test"]);

app.controller("dslConfigController", ["$scope", "$http", function($scope, $http){
	$scope.showConfig = true;
	$scope.title = 'Config';
	$scope.commands = [
		{ title: 'take', action: function() { alert("1")}, canDo: true },
		{ title: 'pause', action: function() { alert("2")}, canDo: true },
		{ title: 'continue', action: function() { alert("3")}, canDo: false },
		{ title: 'takeout', action: function() { alert("4")}, canDo: false }
	];
}]);

app.directive("dslConfigPanel", function(){
	return {
		restrict: 'E',
		replace: false,
		scope: true,
		require: '?ngModel',
		templateUrl: 'html/dslConfigPanel.html'
	};
});



/*function dslConfigPanel() {
	return {
		restrict: 'E',
		replace: false,
		scope: true,
		require: '?ngModel',
		templateUrl: 'html/dslConfigPanel.html'
	};
};*/