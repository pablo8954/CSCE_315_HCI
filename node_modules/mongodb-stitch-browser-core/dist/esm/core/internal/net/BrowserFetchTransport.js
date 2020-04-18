import { Response, StitchClientError, StitchClientErrorCode } from "mongodb-stitch-core-sdk";
import { fetch as fetch } from 'whatwg-fetch';
var BrowserFetchTransport = (function () {
    function BrowserFetchTransport() {
    }
    BrowserFetchTransport.prototype.roundTrip = function (request) {
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
    BrowserFetchTransport.prototype.stream = function (request, open, retryRequest) {
        if (open === void 0) { open = true; }
        throw new StitchClientError(StitchClientErrorCode.StreamingNotSupported);
    };
    return BrowserFetchTransport;
}());
export default BrowserFetchTransport;
//# sourceMappingURL=BrowserFetchTransport.js.map