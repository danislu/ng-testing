/// <reference path="../all.ts" />

class Run {
    public id:string = Guid.CreateGUID();

    constructor(public Name:string, public Length:number, public LastRan:Date = new Date()) {}
}
