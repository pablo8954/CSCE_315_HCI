import { NamedServiceClientFactory } from "mongodb-stitch-browser-core";
import RemoteMongoDatabase from "./RemoteMongoDatabase";
export interface RemoteMongoClient {
    db(name: string): RemoteMongoDatabase;
}
export declare namespace RemoteMongoClient {
    const factory: NamedServiceClientFactory<RemoteMongoClient>;
}
