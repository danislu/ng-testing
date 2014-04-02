/// <reference path="../all.ts" />

var RunStorage = (function () {
    function RunStorage() {
        this.store = new LocalStorage("dsl.runs.application");
    }
    RunStorage.prototype.clear = function () {
        this.store.set([]);
    };

    RunStorage.prototype.getItems = function () {
        return this.store.get() || [];
    };

    RunStorage.prototype.setItems = function (items) {
        this.store.set(items);
    };
    return RunStorage;
})();
//# sourceMappingURL=RunStorage.js.map
