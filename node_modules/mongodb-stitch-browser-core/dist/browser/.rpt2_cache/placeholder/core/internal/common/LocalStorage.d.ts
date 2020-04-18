import { Storage } from "mongodb-stitch-core-sdk";
export default class LocalStorage implements Storage {
    private readonly suiteName;
    constructor(suiteName: string);
    get(key: string): any;
    set(key: string, value: string): void;
    remove(key: string): void;
    private getKey;
}
