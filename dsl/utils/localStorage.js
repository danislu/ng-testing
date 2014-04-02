var LocalStorage = (function () {
    function LocalStorage(key) {
        this.key = key;
        this.localStorage = window.localStorage;
    }
    LocalStorage.prototype.get = function () {
        var item = localStorage.getItem(this.key);
        return JSON.parse(item);
    };

    LocalStorage.prototype.set = function (value) {
        localStorage.setItem(this.key, JSON.stringify(value));
    };
    return LocalStorage;
})();
//# sourceMappingURL=localStorage.js.map
