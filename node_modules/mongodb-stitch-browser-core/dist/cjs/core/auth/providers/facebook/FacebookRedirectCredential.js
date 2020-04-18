"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var mongodb_stitch_core_sdk_1 = require("mongodb-stitch-core-sdk");
var FacebookRedirectCredential = (function () {
    function FacebookRedirectCredential(redirectUrl, providerName, providerType) {
        if (providerName === void 0) { providerName = mongodb_stitch_core_sdk_1.FacebookAuthProvider.DEFAULT_NAME; }
        if (providerType === void 0) { providerType = mongodb_stitch_core_sdk_1.FacebookAuthProvider.TYPE; }
        this.redirectUrl = redirectUrl;
        this.providerName = providerName;
        this.providerType = providerType;
    }
    return FacebookRedirectCredential;
}());
exports.default = FacebookRedirectCredential;
//# sourceMappingURL=FacebookRedirectCredential.js.map