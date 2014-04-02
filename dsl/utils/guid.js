var Guid = (function () {
    function Guid() {
    }
    Guid.S4 = function () {
        return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
    };

    Guid.CreateGUID = function () {
        return (this.S4() + this.S4() + "-" + this.S4() + "-" + this.S4() + "-" + this.S4() + "-" + this.S4() + this.S4() + this.S4());
    };
    return Guid;
})();
//# sourceMappingURL=guid.js.map
