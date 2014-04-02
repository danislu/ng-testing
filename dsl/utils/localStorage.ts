interface ILocalStorage<T> {
    get() : T;
    set(value: T) : void;
}

class LocalStorage<T> implements ILocalStorage<T> {

    private localStorage : Storage;
    private key : string;

    constructor(key: string){
        this.key = key;
        this.localStorage = window.localStorage;
    }

    public get() : T {
        var item = localStorage.getItem(this.key);
        return <T>JSON.parse(item);
    }

    public set(value: T) : void {
        localStorage.setItem(this.key, JSON.stringify(value));
    }
}

