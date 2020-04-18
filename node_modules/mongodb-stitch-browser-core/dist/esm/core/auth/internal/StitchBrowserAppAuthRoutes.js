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
import { base64Encode, StitchAppAuthRoutes } from "mongodb-stitch-core-sdk";
var StitchBrowserAppAuthRoutes = (function (_super) {
    __extends(StitchBrowserAppAuthRoutes, _super);
    function StitchBrowserAppAuthRoutes(clientAppId) {
        return _super.call(this, clientAppId) || this;
    }
    StitchBrowserAppAuthRoutes.prototype.getAuthProviderRedirectRoute = function (credential, redirectUrl, state, deviceInfo) {
        return this.getAuthProviderLoginRoute(credential.providerName) + "?redirect=" + encodeURI(redirectUrl) + "&state=" + state + "&device=" + this.uriEncodeObject(deviceInfo);
    };
    StitchBrowserAppAuthRoutes.prototype.getAuthProviderLinkRedirectRoute = function (credential, redirectUrl, state, deviceInfo) {
        return this.getAuthProviderLoginRoute(credential.providerName) + "?redirect=" + encodeURI(redirectUrl) + "&state=" + state + "&device=" + this.uriEncodeObject(deviceInfo) + "&link=true&providerRedirectHeader=true";
    };
    StitchBrowserAppAuthRoutes.prototype.uriEncodeObject = function (obj) {
        return encodeURIComponent(base64Encode(JSON.stringify(obj)));
    };
    return StitchBrowserAppAuthRoutes;
}(StitchAppAuthRoutes));
export default StitchBrowserAppAuthRoutes;
//# sourceMappingURL=StitchBrowserAppAuthRoutes.js.map