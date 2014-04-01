/// <reference path="../services/localStorage.ts" />
/// <reference path="guidgenerator.ts" />

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
    };

    RunningTracks.prototype.RemoveTrack = function (item) {
        this.store.removeItem(item);

        var start = this.Tracks.indexOf(item);
        this.Tracks.splice(start, 1);
    };
    return RunningTracks;
})();
//# sourceMappingURL=runningtrack.js.map
