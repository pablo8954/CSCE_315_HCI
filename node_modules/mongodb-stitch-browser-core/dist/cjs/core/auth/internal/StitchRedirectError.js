"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var mongodb_stitch_core_sdk_1 = require("mongodb-stitch-core-sdk");
var StitchRedirectError = (function (_super) {
    __extends(StitchRedirectError, _super);
    function StitchRedirectError(msg) {
        return _super.call(this, msg) || this;
    }
    return StitchRedirectError;
}(mongodb_stitch_core_sdk_1.StitchError));
exports.default = StitchRedirectError;
//# sourceMappingURL=StitchRedirectError.js.map