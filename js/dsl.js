var dsl = angular.module("dsl.test", []);

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
				var data = e.dataTransfer.types.join();  //e.dataTransfer.getData('text/html');
				elem.append(data);

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