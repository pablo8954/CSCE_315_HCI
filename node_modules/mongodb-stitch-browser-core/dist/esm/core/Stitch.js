import { StitchAppClientConfiguration } from "mongodb-stitch-core-sdk";
import LocalStorage from "./internal/common/LocalStorage";
import BrowserFetchStreamTransport from "./internal/net/BrowserFetchStreamTransport";
import BrowserFetchTransport from "./internal/net/BrowserFetchTransport";
import StitchAppClientImpl from "./internal/StitchAppClientImpl";
var DEFAULT_BASE_URL = "https://stitch.mongodb.com";
var appClients = {};
var Stitch = (function () {
    function Stitch() {
    }
    Object.defineProperty(Stitch, "defaultAppClient", {
        get: function () {
            if (Stitch.defaultClientAppId === undefined) {
                throw new Error("default app client has not yet been initialized/set");
            }
            return appClients[Stitch.defaultClientAppId];
        },
        enumerable: true,
        configurable: true
    });
    Stitch.getAppClient = function (clientAppId) {
        if (appClients[clientAppId] === undefined) {
            throw new Error("client for app '" + clientAppId + "' has not yet been initialized");
        }
        return appClients[clientAppId];
    };
    Stitch.hasAppClient = function (clientAppId) {
        return appClients[clientAppId] !== undefined;
    };
    Stitch.initializeDefaultAppClient = function (clientAppId, config) {
        if (config === void 0) { config = new StitchAppClientConfiguration.Builder().build(); }
        if (clientAppId === undefined || clientAppId === "") {
            throw new Error("clientAppId must be set to a non-empty string");
        }
        if (Stitch.defaultClientAppId !== undefined) {
            throw new Error("default app can only be set once; currently set to '" + Stitch.defaultClientAppId + "'");
        }
        var client = Stitch.initializeAppClient(clientAppId, config);
        Stitch.defaultClientAppId = clientAppId;
        return client;
    };
    Stitch.initializeAppClient = function (clientAppId, config) {
        if (config === void 0) { config = new StitchAppClientConfiguration.Builder().build(); }
        if (clientAppId === undefined || clientAppId === "") {
            throw new Error("clientAppId must be set to a non-empty string");
        }
        if (appClients[clientAppId] !== undefined) {
            throw new Error("client for app '" + clientAppId + "' has already been initialized");
        }
        var builder = config.builder ? config.builder() : new StitchAppClientConfiguration.Builder(config);
        if (builder.storage === undefined) {
            builder.withStorage(new LocalStorage(clientAppId));
        }
        if (builder.transport === undefined) {
            if (window["EventSource"]) {
                builder.withTransport(new BrowserFetchStreamTransport());
            }
            else {
                builder.withTransport(new BrowserFetchTransport());
            }
        }
        if (builder.baseUrl === undefined || builder.baseUrl === "") {
            builder.withBaseUrl(DEFAULT_BASE_URL);
        }
        if (builder.localAppName === undefined || builder.localAppName === "") {
            builder.withLocalAppName(Stitch.localAppName);
        }
        if (builder.localAppVersion === undefined ||
            builder.localAppVersion === "") {
            builder.withLocalAppVersion(Stitch.localAppVersion);
        }
        var client = new StitchAppClientImpl(clientAppId, builder.build());
        appClients[clientAppId] = client;
        return client;
    };
    Stitch.clearApps = function () {
        appClients = {};
    };
    return Stitch;
}());
export default Stitch;
//# sourceMappingURL=Stitch.js.map