/**
* Created by daniellundekvam on 29.03.14.
*/

var LocalStorage = (function () {
    function LocalStorage() {
        this.localStorage = window.localStorage;
    }
    LocalStorage.prototype.clear = function () {
        localStorage.clear();
    };

    LocalStorage.prototype.getItem = function (key) {
        var item = localStorage.getItem(key);
        return JSON.parse(item);
    };

    LocalStorage.prototype.setItem = function (key, value) {
        localStorage.setItem(key, JSON.stringify(value));
    };

    LocalStorage.prototype.removeItem = function (key) {
        localStorage.removeItem(key);
    };

    LocalStorage.prototype.getLength = function () {
        return localStorage.length;
    };

    LocalStorage.prototype.getKey = function (index) {
        return localStorage.key(index);
    };
    return LocalStorage;
})();
//# sourceMappingURL=localStorage.js.map
