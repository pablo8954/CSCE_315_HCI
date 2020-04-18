"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var mongodb_stitch_core_sdk_1 = require("mongodb-stitch-core-sdk");
var LocalStorage_1 = __importDefault(require("./internal/common/LocalStorage"));
var BrowserFetchStreamTransport_1 = __importDefault(require("./internal/net/BrowserFetchStreamTransport"));
var BrowserFetchTransport_1 = __importDefault(require("./internal/net/BrowserFetchTransport"));
var StitchAppClientImpl_1 = __importDefault(require("./internal/StitchAppClientImpl"));
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
        if (config === void 0) { config = new mongodb_stitch_core_sdk_1.StitchAppClientConfiguration.Builder().build(); }
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
        if (config === void 0) { config = new mongodb_stitch_core_sdk_1.StitchAppClientConfiguration.Builder().build(); }
        if (clientAppId === undefined || clientAppId === "") {
            throw new Error("clientAppId must be set to a non-empty string");
        }
        if (appClients[clientAppId] !== undefined) {
            throw new Error("client for app '" + clientAppId + "' has already been initialized");
        }
        var builder = config.builder ? config.builder() : new mongodb_stitch_core_sdk_1.StitchAppClientConfiguration.Builder(config);
        if (builder.storage === undefined) {
            builder.withStorage(new LocalStorage_1.default(clientAppId));
        }
        if (builder.transport === undefined) {
            if (window["EventSource"]) {
                builder.withTransport(new BrowserFetchStreamTransport_1.default());
            }
            else {
                builder.withTransport(new BrowserFetchTransport_1.default());
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
        var client = new StitchAppClientImpl_1.default(clientAppId, builder.build());
        appClients[clientAppId] = client;
        return client;
    };
    Stitch.clearApps = function () {
        appClients = {};
    };
    return Stitch;
}());
exports.default = Stitch;
//# sourceMappingURL=Stitch.js.map