![github CI](https://github.com/Gaikov/service-locator/actions/workflows/node.js.yml/badge.svg)

# advanced-service-locator
Class based ServiceLocator for use with TypeScript or JS.

[More about ServiceLocator pattern](https://en.wikipedia.org/wiki/Service_locator_pattern)

### Install
```text
npm i advanced-service-locator
```

### Import
```TypeScript
//es5
const {ServiceLocator, ILocatable, ILocator} = require("advanced-service-locator");
//es6+ and ts
import {ServiceLocator, ILocatable, ILocator} from "advanced-service-locator";
```

### Example classes
```TypeScript
class TestClass implements ILocatable {

    init(locator: ILocator): void {
        //will be called after instantiation
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
```

### Locate an instance
```TypeScript
const locator = new ServiceLocator();
const a = locator.locate(TestClass);
```

### Class mapping
```TypeScript
const locator = new ServiceLocator();
locator.mapClass(TestClass).to(TestClassCustom);

const a = locator.locate(TestClass);

console.log(a.getMessage()); //will output "This is custom message!"
```

### Map class as a singleton
```TypeScript
const locator = new ServiceLocator();
locator.mapClass(TestClass).asSingleton();

const a = locator.locate(TestClass);
const b = locator.locate(TestClass);
console.log(a === b); //will output "true"
```

### Recommend to use as a singleton
```TypeScript
class Locator {
    static readonly instance = new ServiceLocator();
}

const a = Locator.instance.locate(TestClass);
```

