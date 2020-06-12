import { Model } from "mongoose";

export interface IDBContext<T> {
    connect(): void;
    disconnect():void;
    dispose():void;
    getDBContext():T;
    registerSchemas():void;
}