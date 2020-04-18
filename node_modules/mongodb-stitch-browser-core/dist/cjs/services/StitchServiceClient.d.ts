import { Decoder, Stream } from "mongodb-stitch-core-sdk";
export default interface StitchServiceClient {
    callFunction<T>(name: string, args: any[], codec?: Decoder<T>): Promise<T>;
    streamFunction<T>(name: string, args: any[], decoder?: Decoder<T>): Promise<Stream<T>>;
}
