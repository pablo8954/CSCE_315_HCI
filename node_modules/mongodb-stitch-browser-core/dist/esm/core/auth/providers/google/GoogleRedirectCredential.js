import { GoogleAuthProvider } from "mongodb-stitch-core-sdk";
var GoogleRedirectCredential = (function () {
    function GoogleRedirectCredential(redirectUrl, providerName, providerType) {
        if (providerName === void 0) { providerName = GoogleAuthProvider.DEFAULT_NAME; }
        if (providerType === void 0) { providerType = GoogleAuthProvider.TYPE; }
        this.redirectUrl = redirectUrl;
        this.providerName = providerName;
        this.providerType = providerType;
    }
    return GoogleRedirectCredential;
}());
export default GoogleRedirectCredential;
//# sourceMappingURL=GoogleRedirectCredential.js.map