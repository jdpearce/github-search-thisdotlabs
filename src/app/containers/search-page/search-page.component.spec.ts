import { NO_ERRORS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { MatProgressSpinnerModule } from '@angular/material';
import { ActivatedRoute } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { Store } from '@ngrx/store';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { of } from 'rxjs';
import { AppState } from 'src/app/store/app.reducers';
import { initialSearchState } from 'src/app/store/search/search.reducer';
import { SearchPageComponent } from './search-page.component';

describe('SearchPageComponent', () => {
    let component: SearchPageComponent;
    let fixture: ComponentFixture<SearchPageComponent>;
    let store: MockStore<AppState>;
    let initialState: Partial<AppState>;

    beforeEach(async(() => {
        initialState = {
            search: initialSearchState
        };

        TestBed.configureTestingModule({
            imports: [MatProgressSpinnerModule, RouterTestingModule],
            declarations: [SearchPageComponent],
            schemas: [NO_ERRORS_SCHEMA],
            providers: [
                provideMockStore({ initialState }),
                {
                    provide: ActivatedRoute,
                    useValue: {
                        queryParams: of({ q: 'alice' })
                    }
                }
            ]
        }).compileComponents();

        store = TestBed.get(Store);
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(SearchPageComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
