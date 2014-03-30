/**
 * Created by daniellundekvam on 29.03.14.
 */

interface ILocalStorage<T> {
    clear() : void;
    getItem(key: string) : T;
    setItem(key: string, value: T) : void;
    removeItem(key: string) : void;
    getLength() : number;
    getKey(index: number) : string;
}

class LocalStorage<T> implements ILocalStorage<T> {

    private localStorage : Storage;

    constructor(){
        this.localStorage = window.localStorage;
    }

    public clear() : void {
        localStorage.clear();
    }

    public getItem(key : string) : T {
        var item = localStorage.getItem(key);
        return <T>JSON.parse(item);
    }

    public setItem(key : string, value: T) : void {
        localStorage.setItem(key, JSON.stringify(value));
    }

    public removeItem(key : string) : void {
        localStorage.removeItem(key);
    }

    public getLength() : number {
        return localStorage.length;
    }

    public getKey(index: number) : string{
        return localStorage.key(index);
    }
}