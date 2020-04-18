import { BasicRequest, EventStream } from "mongodb-stitch-core-sdk";
import BrowserFetchTransport from "./BrowserFetchTransport";
export default class BrowserFetchStreamTransport extends BrowserFetchTransport {
    stream(request: BasicRequest, open?: boolean, retryRequest?: () => Promise<EventStream>): Promise<EventStream>;
}
