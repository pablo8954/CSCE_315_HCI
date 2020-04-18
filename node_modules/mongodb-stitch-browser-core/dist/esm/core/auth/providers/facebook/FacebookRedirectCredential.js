import { FacebookAuthProvider } from "mongodb-stitch-core-sdk";
var FacebookRedirectCredential = (function () {
    function FacebookRedirectCredential(redirectUrl, providerName, providerType) {
        if (providerName === void 0) { providerName = FacebookAuthProvider.DEFAULT_NAME; }
        if (providerType === void 0) { providerType = FacebookAuthProvider.TYPE; }
        this.redirectUrl = redirectUrl;
        this.providerName = providerName;
        this.providerType = providerType;
    }
    return FacebookRedirectCredential;
}());
export default FacebookRedirectCredential;
//# sourceMappingURL=FacebookRedirectCredential.js.map