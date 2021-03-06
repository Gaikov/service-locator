import {Constructor} from "./Constructor";
import {ILocatable} from "./ILocatable";

export interface IClassMapping<TClass extends ILocatable> {
    to(cls: Constructor<TClass>): IClassMapping<TClass>
    asSingleton(): IClassMapping<TClass>
}