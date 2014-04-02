/// <reference path="../all.ts" />

class RunController {
    'use strict';

    public Tracks : Run[];
    private store : IStorage;

    constructor(s : IStorage){
        this.store = s;
        this.Tracks = this.store.getItems();
    }

    public Clear() {
        this.Tracks.length = 0;
        this.store.clear();
    }

    public GetTrack(id : string) : Run {
        var runs = this.Tracks.filter(function(item) { return item.id == id; });
        return (runs.length > 0)
            ? runs[0]
            : null;
    }

    public AddTrack(item: Run){
        this.Tracks.push(item);

        this.store.setItems(this.Tracks);
    }

    public RemoveTrack(item: Run){
        var start = this.Tracks.indexOf(item);
        this.Tracks.splice(start, 1);

        this.store.setItems(this.Tracks);
    }
}

