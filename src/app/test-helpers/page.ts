import { DebugElement, Predicate, Type } from '@angular/core';
import { ComponentFixture } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

export class Page<T> {
    get buttons(): HTMLButtonElement[] {
        return this.queryAll<HTMLButtonElement>('button');
    }

    constructor(public fixture: ComponentFixture<T>) {}

    query<TElement>(selector: string): TElement {
        return this.fixture.nativeElement.querySelector(selector);
    }

    queryAll<TElement>(selector: string): TElement[] {
        return this.fixture.nativeElement.querySelectorAll(selector);
    }

    queryByClass(className: string): DebugElement {
        return this.fixture.debugElement.query(By.css(className));
    }

    queryAllByClass(className: string): DebugElement[] {
        return this.fixture.debugElement.queryAll(By.css(className));
    }

    queryByDirective(type: Type<any>): DebugElement {
        return this.fixture.debugElement.query(By.directive(type));
    }

    queryAllByDirective(type: Type<any>): DebugElement[] {
        return this.fixture.debugElement.queryAll(By.directive(type));
    }

    queryByTestAttribute(value: string): DebugElement {
        return this.fixture.debugElement.query(By.css(`[data-test="${value}"]`));
    }

    queryAllByTestAttribute(value: string): DebugElement[] {
        return this.fixture.debugElement.queryAll(By.css(`[data-test="${value}"]`));
    }

    textContent(predicate: Predicate<DebugElement>): string {
        return this.fixture.debugElement.query(predicate).nativeElement.textContent;
    }
}
