import {ServiceLocator} from "../src/ServiceLocator";
import {ILocatable, ILocator} from "../src/ILocatable";

export class TestClass implements ILocatable {
    value: number = 0;

    init(locator: ILocator): void {
    }
}

export class TestClassCustom extends TestClass {

}

describe("ServiceLocator", () => {
    it("no mapping", () => {
        const locator = new ServiceLocator();

        const a = locator.locate(TestClass);
        a.value = 1;

        const b = locator.locate(TestClass);

        expect(a instanceof TestClass).toEqual(true);
        expect(a !== b).toEqual(true);
        expect(b.value).toEqual(0);
    })
})