/// <reference path="../all.ts" />
var Run = (function () {
    function Run(Name, Length, LastRan) {
        if (typeof LastRan === "undefined") { LastRan = new Date(); }
        this.Name = Name;
        this.Length = Length;
        this.LastRan = LastRan;
        this.id = Guid.CreateGUID();
    }
    return Run;
})();
//# sourceMappingURL=Run.js.map
