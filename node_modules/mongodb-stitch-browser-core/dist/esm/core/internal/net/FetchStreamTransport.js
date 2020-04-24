var __assign = (this && this.__assign) || Object.assign || function(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
        s = arguments[i];
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
            t[p] = s[p];
    }
    return t;
};
import { ContentTypes, Headers, Response, StitchClientError, StitchClientErrorCode, handleRequestError } from "mongodb-stitch-core-sdk";
import ReaderEventStream from "./ReaderEventStream";
import EventSourceEventStream from "./EventSourceEventStream";
import fetch from "cross-fetch";
var FetchStreamTransport = (function () {
    function FetchStreamTransport() {
    }
    FetchStreamTransport.prototype.roundTrip = function (request) {
        var responsePromise = fetch(request.url, {
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
            return new Response(headers, response.status, body);
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
        headers[Headers.ACCEPT] = ContentTypes.TEXT_EVENT_STREAM;
        headers[Headers.CONTENT_TYPE] = ContentTypes.TEXT_EVENT_STREAM;
        if (!rsSupported) {
            return fetch(request.url + "&stitch_validate=true", {
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
                        .then(function (body) { return handleRequestError(new Response(headers, response.status, body)); });
                }
                return new Promise(function (resolve, reject) {
                    new EventSourceEventStream(new EventSource(request.url), function (stream) { return resolve(stream); }, function (error) { return reject(error); }, retryRequest ?
                        function () { return retryRequest().then(function (es) { return es; }); }
                        : undefined);
                });
            });
        }
        return fetch(request.url, {
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
                    .then(function (body) { return handleRequestError(new Response(headers, response.status, body)); });
            }
            if (!retryRequest) {
                throw new StitchClientError(StitchClientErrorCode.StreamClosed);
            }
            if (!response.body) {
                throw new StitchClientError(StitchClientErrorCode.StreamingNotSupported);
            }
            return Promise.resolve(new ReaderEventStream(response.body, open, retryRequest ? function () {
                return retryRequest().then(function (es) { return es; });
            } : undefined));
        });
    };
    return FetchStreamTransport;
}());
export default FetchStreamTransport;
//# sourceMappingURL=FetchStreamTransport.js.map