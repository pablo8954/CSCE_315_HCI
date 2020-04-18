"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var mongodb_stitch_core_sdk_1 = require("mongodb-stitch-core-sdk");
var whatwg_fetch_1 = require("whatwg-fetch");
var BrowserFetchTransport = (function () {
    function BrowserFetchTransport() {
    }
    BrowserFetchTransport.prototype.roundTrip = function (request) {
        var responsePromise = whatwg_fetch_1.fetch(request.url, {
            body: request.body,
            headers: request.headers,
            method: request.method,
            mode: 'cors'
        });
        var responseTextPromise = responsePromise.then(function (response) {
            return response.text();
        });
        return Promise.all([responsePromise, responseTextPromise]).then(function (values) {
            var response = values[0];
            var body = values[1];
            var headers = {};
            response.headers.forEach(function (value, key) {
                headers[key] = value;
            });
            return new mongodb_stitch_core_sdk_1.Response(headers, response.status, body);
        });
    };
    BrowserFetchTransport.prototype.stream = function (request, open, retryRequest) {
        if (open === void 0) { open = true; }
        throw new mongodb_stitch_core_sdk_1.StitchClientError(mongodb_stitch_core_sdk_1.StitchClientErrorCode.StreamingNotSupported);
    };
    return BrowserFetchTransport;
}());
exports.default = BrowserFetchTransport;
//# sourceMappingURL=BrowserFetchTransport.js.map