"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var mongodb_stitch_core_sdk_1 = require("mongodb-stitch-core-sdk");
var GoogleRedirectCredential = (function () {
    function GoogleRedirectCredential(redirectUrl, providerName, providerType) {
        if (providerName === void 0) { providerName = mongodb_stitch_core_sdk_1.GoogleAuthProvider.DEFAULT_NAME; }
        if (providerType === void 0) { providerType = mongodb_stitch_core_sdk_1.GoogleAuthProvider.TYPE; }
        this.redirectUrl = redirectUrl;
        this.providerName = providerName;
        this.providerType = providerType;
    }
    return GoogleRedirectCredential;
}());
exports.default = GoogleRedirectCredential;
//# sourceMappingURL=GoogleRedirectCredential.js.map