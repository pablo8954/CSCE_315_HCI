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
import { StitchAppRoutes } from "mongodb-stitch-core-sdk";
import StitchBrowserAppAuthRoutes from "./StitchBrowserAppAuthRoutes";
var StitchBrowserAppRoutes = (function (_super) {
    __extends(StitchBrowserAppRoutes, _super);
    function StitchBrowserAppRoutes(clientAppId) {
        var _this = _super.call(this, clientAppId) || this;
        _this.authRoutes = new StitchBrowserAppAuthRoutes(clientAppId);
        return _this;
    }
    return StitchBrowserAppRoutes;
}(StitchAppRoutes));
export default StitchBrowserAppRoutes;
//# sourceMappingURL=StitchBrowserAppRoutes.js.map