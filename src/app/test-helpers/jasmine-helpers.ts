import { Type } from '@angular/core';

export function spyOnClass<T>(spiedClass: Type<T>): jasmine.SpyObj<T> {
    const prototype = spiedClass.prototype;

    const methods = Object.getOwnPropertyNames(prototype)
        .map(name => [name, Object.getOwnPropertyDescriptor(prototype, name)])
        .filter(([_name, descriptor]) => {
            return (descriptor as PropertyDescriptor).value instanceof Function;
        })
        .map(([name]) => name);

    return jasmine.createSpyObj('spy', [...methods]);
}

export function provideMock<T>(spiedClass: Type<T>) {
    return {
        provide: spiedClass,
        useValue: spyOnClass(spiedClass)
    };
}
