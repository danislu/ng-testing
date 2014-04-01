/// <reference path="../services/localStorage.ts" />
/// <reference path="guidgenerator.ts" />

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
    }

    public RemoveTrack(item: RunningTrack){
        this.store.removeItem(item);

        var start = this.Tracks.indexOf(item);
        this.Tracks.splice(start, 1);
    }
}