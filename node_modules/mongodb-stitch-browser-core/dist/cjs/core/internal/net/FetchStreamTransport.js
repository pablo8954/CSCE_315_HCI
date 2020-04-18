"use strict";
var __assign = (this && this.__assign) || Object.assign || function(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
        s = arguments[i];
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
            t[p] = s[p];
    }
    return t;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var mongodb_stitch_core_sdk_1 = require("mongodb-stitch-core-sdk");
var ReaderEventStream_1 = __importDefault(require("./ReaderEventStream"));
var EventSourceEventStream_1 = __importDefault(require("./EventSourceEventStream"));
var cross_fetch_1 = __importDefault(require("cross-fetch"));
var FetchStreamTransport = (function () {
    function FetchStreamTransport() {
    }
    FetchStreamTransport.prototype.roundTrip = function (request) {
        var responsePromise = cross_fetch_1.default(request.url, {
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
    FetchStreamTransport.prototype.stream = function (request, open, retryRequest) {
        if (open === void 0) { open = true; }
        var rsSupported;
        try {
            new ReadableStream();
            rsSupported = true;
        }
        catch (err) {
            rsSupported = false;
        }
        var headers = __assign({}, request.headers);
        headers[mongodb_stitch_core_sdk_1.Headers.ACCEPT] = mongodb_stitch_core_sdk_1.ContentTypes.TEXT_EVENT_STREAM;
        headers[mongodb_stitch_core_sdk_1.Headers.CONTENT_TYPE] = mongodb_stitch_core_sdk_1.ContentTypes.TEXT_EVENT_STREAM;
        if (!rsSupported) {
            return cross_fetch_1.default(request.url + "&stitch_validate=true", {
                body: request.body,
                headers: headers,
                method: request.method,
                mode: 'cors'
            }).then(function (response) {
                var headers = {};
                response.headers.forEach(function (value, key) {
                    headers[key] = value;
                });
                if (response.status < 200 || response.status >= 300) {
                    return response.text()
                        .then(function (body) { return mongodb_stitch_core_sdk_1.handleRequestError(new mongodb_stitch_core_sdk_1.Response(headers, response.status, body)); });
                }
                return new Promise(function (resolve, reject) {
                    new EventSourceEventStream_1.default(new EventSource(request.url), function (stream) { return resolve(stream); }, function (error) { return reject(error); }, retryRequest ?
                        function () { return retryRequest().then(function (es) { return es; }); }
                        : undefined);
                });
            });
        }
        return cross_fetch_1.default(request.url, {
            body: request.body,
            headers: headers,
            method: request.method,
            mode: 'cors'
        }).then(function (response) {
            var headers = {};
            response.headers.forEach(function (value, key) {
                headers[key] = value;
            });
            if (response.status < 200 || response.status >= 300) {
                return response.text()
                    .then(function (body) { return mongodb_stitch_core_sdk_1.handleRequestError(new mongodb_stitch_core_sdk_1.Response(headers, response.status, body)); });
            }
            if (!retryRequest) {
                throw new mongodb_stitch_core_sdk_1.StitchClientError(mongodb_stitch_core_sdk_1.StitchClientErrorCode.StreamClosed);
            }
            if (!response.body) {
                throw new mongodb_stitch_core_sdk_1.StitchClientError(mongodb_stitch_core_sdk_1.StitchClientErrorCode.StreamingNotSupported);
            }
            return Promise.resolve(new ReaderEventStream_1.default(response.body, open, retryRequest ? function () {
                return retryRequest().then(function (es) { return es; });
            } : undefined));
        });
    };
    return FetchStreamTransport;
}());
exports.default = FetchStreamTransport;
//# sourceMappingURL=FetchStreamTransport.js.map