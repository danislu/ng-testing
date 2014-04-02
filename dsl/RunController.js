/// <reference path="../all.ts" />
var RunController = (function () {
    function RunController(s) {
        this.store = s;
        this.Tracks = this.store.getItems();
    }
    RunController.prototype.Clear = function () {
        this.Tracks.splice(0, this.Tracks.length);
        this.store.clear();
    };

    RunController.prototype.GetTrack = function (id) {
        var runs = this.Tracks.filter(function (item) {
            return item.id == id;
        });
        return (runs.length > 0) ? runs[0] : null;
    };

    RunController.prototype.AddTrack = function (item) {
        this.Tracks.push(item);

        this.store.setItems(this.Tracks);
    };

    RunController.prototype.RemoveTrack = function (item) {
        var start = this.Tracks.indexOf(item);
        this.Tracks.splice(start, 1);

        this.store.setItems(this.Tracks);
    };
    return RunController;
})();
//# sourceMappingURL=RunController.js.map
