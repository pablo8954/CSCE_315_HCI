var stitchPrefixKey = "__stitch.client";
var LocalStorage = (function () {
    function LocalStorage(suiteName) {
        this.suiteName = suiteName;
    }
    LocalStorage.prototype.get = function (key) {
        return localStorage.getItem(this.getKey(key));
    };
    LocalStorage.prototype.set = function (key, value) {
        localStorage.setItem(this.getKey(key), value);
    };
    LocalStorage.prototype.remove = function (key) {
        localStorage.removeItem(this.getKey(key));
    };
    LocalStorage.prototype.getKey = function (forKey) {
        return stitchPrefixKey + "." + this.suiteName + "." + forKey;
    };
    return LocalStorage;
}());
export default LocalStorage;
//# sourceMappingURL=LocalStorage.js.map