import {IClassMapping} from "./IClassMapping";
import {Constructor} from "./Constructor";
import {ILocatable, ILocator} from "./ILocatable";

export class ServiceLocator implements ILocator {

    protected _map = new Map<Constructor<ILocatable>, ClassMapping<ILocatable>>()

    mapClass<T extends ILocatable, T2 extends T>(ctor: Constructor<T>): IClassMapping<T2> {
        const mapping = this._map.get(ctor) || new ClassMapping<ILocatable>(this._map, this);
        this._map.set(ctor, mapping);
        return mapping;
    }

    locate<T extends ILocatable>(cls: Constructor<T>): T {
        const mapping = this._map.get(cls);
        if (mapping) {
            return mapping.getInstance() as T;
        }
        return new cls();
    }

    reset(): void {
        this._map.clear();
    }
}

class ClassMapping<TClass extends ILocatable> implements IClassMapping<TClass> {

    private _ctor: Constructor<TClass>;
    private _singleton: boolean = false;
    private _instance: TClass;

    constructor(readonly mapping: Map<Constructor<ILocatable>, ClassMapping<ILocatable>>, readonly locator: ILocator) {
    }

    asSingleton(): IClassMapping<TClass> {
        this._singleton = true;
        return this;
    }

    to(cls: Constructor<TClass>): IClassMapping<TClass> {
        this.mapping.set(cls, this);
        if (this._ctor !== cls) {
            this._ctor = cls;
            this._instance = null;
        }
        return this;
    }

    getInstance(): TClass {
        if (this._singleton) {
            if (!this._instance) {
                this._instance = this.createInstance(this._ctor);
            }
            return this._instance;
        }
        return this.createInstance(this._ctor);
    }

    private createInstance<TClass extends ILocatable>(ctor: Constructor<TClass>): TClass {
        const instance = new ctor();
        instance.init(this.locator);
        return instance;
    }
}