var dsl = angular.module("dsl.dnd", []);

dsl.directive("dndTarget", function(){
	return {
		restrict: 'AEC',
		replace: false,
		scope: {},
		templateUrl: 'html/dslDndTarget.html',
		link: function(scope, elem, attr){
			var dragOver = function(jqEvent){
				var e = jqEvent.originalEvent;
				if (e.preventDefault) {
    				e.preventDefault(); // Necessary. Allows us to drop.
  				}

  				e.dataTransfer.dropEffect = 'copy';  // See the section on the DataTransfer object.
  				return false;
			};
			var dragDrop = function(jqEvent){
				var e = jqEvent.originalEvent;
				if (e.stopPropagation) {
    				e.stopPropagation(); // stops the browser from redirecting.
  				}

  				// See the section on the DataTransfer object.
  				var types = e.dataTransfer.types;
				elem.append('Formats: ' + types.join());

				for (var i = types.length - 1; i >= 0; i--) {
					elem.append('<br />');
					elem.append(types[i] + ': ' + e.dataTransfer.getData(types[i]));
				};

  				return false;
			};

			elem.bind('dragenter dragleave', function(e){
				elem.toggleClass('over');
			});
			elem.bind('dragover', dragOver);
			elem.bind('drop', dragDrop);
		}
	};
});

dsl.directive('dndSource', function(){
	// Runs during compile
	return {
		// name: '',
		// priority: 1,
		// terminal: true,
		// scope: {}, // {} = isolate, true = child, false/undefined = no change
		// controller: function($scope, $element, $attrs, $transclude) {},
		// require: 'ngModel', // Array = multiple requires, ? = optional, ^ = check parent elements
		restrict: 'AEC', // E = Element, A = Attribute, C = Class, M = Comment
		// template: '',
		templateUrl: 'html/dslDndSource.html',
		replace: false,
		// transclude: true,
		// compile: function(tElement, tAttrs, function transclude(function(scope, cloneLinkingFn){ return function linking(scope, elm, attrs){}})),
		link: function($scope, iElm, iAttrs, controller) {
			iAttrs.dragable = true;

			iElm.bind('dragstart', function(jqEvent) {
				var e = jqEvent.originalEvent;

				e.dataTransfer.effectAllowed = 'all';
				e.dataTransfer.setData('whatever', 'this is the drag content');
			});
		}
	};
});