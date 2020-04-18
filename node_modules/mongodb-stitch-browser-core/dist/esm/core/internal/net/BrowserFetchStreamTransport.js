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
var __assign = (this && this.__assign) || Object.assign || function(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
        s = arguments[i];
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
            t[p] = s[p];
    }
    return t;
};
import { ContentTypes, handleRequestError, Headers, Response } from "mongodb-stitch-core-sdk";
import { fetch as fetch } from 'whatwg-fetch';
import BrowserFetchTransport from "./BrowserFetchTransport";
import EventSourceEventStream from "./EventSourceEventStream";
var BrowserFetchStreamTransport = (function (_super) {
    __extends(BrowserFetchStreamTransport, _super);
    function BrowserFetchStreamTransport() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    BrowserFetchStreamTransport.prototype.stream = function (request, open, retryRequest) {
        if (open === void 0) { open = true; }
        var reqHeaders = __assign({}, request.headers);
        reqHeaders[Headers.ACCEPT] = ContentTypes.TEXT_EVENT_STREAM;
        reqHeaders[Headers.CONTENT_TYPE] = ContentTypes.TEXT_EVENT_STREAM;
        return fetch(request.url + "&stitch_validate=true", {
            body: request.body,
            headers: reqHeaders,
            method: request.method,
            mode: 'cors'
        }).then(function (response) {
            var respHeaders = {};
            response.headers.forEach(function (value, key) {
                respHeaders[key] = value;
            });
            if (response.status < 200 || response.status >= 300) {
                return response.text()
                    .then(function (body) { return handleRequestError(new Response(respHeaders, response.status, body)); });
            }
            return new Promise(function (resolve, reject) {
                return new EventSourceEventStream(new EventSource(request.url), function (stream) { return resolve(stream); }, function (error) { return reject(error); }, retryRequest ?
                    function () { return retryRequest().then(function (es) { return es; }); }
                    : undefined);
            });
        });
    };
    return BrowserFetchStreamTransport;
}(BrowserFetchTransport));
export default BrowserFetchStreamTransport;
//# sourceMappingURL=BrowserFetchStreamTransport.js.map