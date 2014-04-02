/// <reference path="../all.ts" />

interface IStorage {
    clear() : void;
    getItems() : Run[];
    setItems(item: Run[]) : void;
}

class RunStorage implements IStorage {

    private store : ILocalStorage<Run[]>
    constructor(){
        this.store = new LocalStorage<Run[]>("dsl.runs.application");
    }

    public clear() : void {
        this.store.set([]);
    }

    public getItems() : Run[] {
        return this.store.get() || [];
    }

    public setItems(items : Run[]) : void {
        this.store.set(items);
    }
}