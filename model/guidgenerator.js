var GUIDGenerator = (function () {
    function GUIDGenerator() {
    }
    GUIDGenerator.S4 = function () {
        return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
    };

    GUIDGenerator.CreateGUID = function () {
        return (this.S4() + this.S4() + "-" + this.S4() + "-" + this.S4() + "-" + this.S4() + "-" + this.S4() + this.S4() + this.S4());
    };
    return GUIDGenerator;
})();
//# sourceMappingURL=guidgenerator.js.map
