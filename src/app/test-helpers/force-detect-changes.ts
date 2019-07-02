import { ComponentFixture } from '@angular/core/testing';

export function forceDetectChanges<T>(f: ComponentFixture<T>) {
    // Trigger fake (click) event to mark the component as needing CD
    f.debugElement.triggerEventHandler('click', null);
    f.detectChanges();
}
