import {ServiceLocator} from "../src/ServiceLocator";
import {ILocatable, ILocator} from "../src/ILocatable";

class TestClass implements ILocatable {

    init(locator: ILocator): void {
    }

    getMessage(): string {
        return "Hello from ServiceLocator!";
    }
}

class TestClassCustom extends TestClass {
    getMessage(): string {
        return "This is custom message!";
    }
}

describe("ServiceLocator", () => {
    it("no mapping", () => {
        const locator = new ServiceLocator();

        const a = locator.locate(TestClass);
        const b = locator.locate(TestClass);

        expect(a instanceof TestClass).toEqual(true);
        expect(b instanceof TestClass).toEqual(true);
        expect(a !== b).toEqual(true);
    })

    it("mapping", () => {
        const locator = new ServiceLocator();
        locator.mapClass(TestClass).to(TestClassCustom);

        const a = locator.locate(TestClass);
        expect(a instanceof TestClassCustom).toEqual(true);

        const b = locator.locate(TestClassCustom);
        expect(b instanceof TestClassCustom).toEqual(true);

        expect(a !== b).toEqual(true);
    })

    it("singleton", () => {
        const locator = new ServiceLocator();
        locator.mapClass(TestClass).asSingleton();

        const a = locator.locate(TestClass);
        expect(a instanceof TestClass).toEqual(true);

        const b = locator.locate(TestClass);
        expect(b instanceof TestClass).toEqual(true);

        expect(a == b).toEqual(true);
    })

    it("singleton re-mapping", () => {
        const locator = new ServiceLocator();
        locator.mapClass(TestClass).asSingleton().to(TestClassCustom);

        const a = locator.locate(TestClass);
        expect(a instanceof TestClassCustom).toEqual(true);

        const b = locator.locate(TestClass);
        expect(b instanceof TestClassCustom).toEqual(true);

        expect(a == b).toEqual(true);
    })
})