import {Constructor} from "./Constructor";

export interface ILocatable {
    init(locator: ILocator): void
}

export interface ILocator {
    locate<T extends ILocatable>(cls: Constructor<T>): T;
}