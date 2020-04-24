import { CoreStitchServiceClient, Decoder, Stream } from "mongodb-stitch-core-sdk";
import StitchServiceClient from "../StitchServiceClient";
export default class StitchServiceClientImpl implements StitchServiceClient {
    private readonly proxy;
    constructor(proxy: CoreStitchServiceClient);
    callFunction<T>(name: string, args: any[], codec?: Decoder<T>): Promise<T>;
    streamFunction<T>(name: string, args: any[], codec?: Decoder<T>): Promise<Stream<T>>;
}
