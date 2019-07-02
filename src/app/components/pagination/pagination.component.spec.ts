import { NO_ERRORS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { UserSearchResponsePage } from 'src/app/core/models/user-search-response';
import { PaginationComponent } from './pagination.component';

describe('PaginationComponent', () => {
    let component: PaginationComponent;
    let fixture: ComponentFixture<PaginationComponent>;
    let mockResults: UserSearchResponsePage;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [PaginationComponent],
            schemas: [NO_ERRORS_SCHEMA]
        }).compileComponents();
    }));

    beforeEach(() => {
        mockResults = {
            total_count: 70,
            incomplete_results: false,
            page_count: 7,
            per_page: 10,
            page_number: 1,
            items: []
        };

        fixture = TestBed.createComponent(PaginationComponent);
        component = fixture.componentInstance;
        component.results = mockResults;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    describe('constructBlocks', () => {
        it('should return full list when page count is less than 11', () => {
            component.results.page_count = 7;
            const actual = component.constructBlocks();
            expect(actual).toEqual([1, 2, 3, 4, 5, 6, 7]);
        });

        it('should return left biased list when page count > 10 and page number <= 5', () => {
            component.results.page_count = 15;
            component.results.page_number = 5;
            const actual = component.constructBlocks();
            expect(actual).toEqual([1, 2, 3, 4, 5, 6, 7, 0, 14, 15]);
        });

        it('should return right biased list when page count > 10 and page number is within 5 of the end', () => {
            component.results.page_count = 15;
            component.results.page_number = 10;
            const actual = component.constructBlocks();
            expect(actual).toEqual([1, 2, 0, 9, 10, 11, 12, 13, 14, 15]);
        });

        it('should return centre biased list when page count > 10 and page number in the middle somewhere', () => {
            component.results.page_count = 15;
            component.results.page_number = 8;
            const actual = component.constructBlocks();
            expect(actual).toEqual([1, 2, 0, 6, 7, 8, 9, 10, 0, 14, 15]);
        });

        it('should work for large numbers', () => {
            component.results.page_count = 1212;
            component.results.page_number = 8;
            const actual = component.constructBlocks();
            expect(actual.length).toBe(11);
            expect(actual).toEqual([1, 2, 0, 6, 7, 8, 9, 10, 0, 1211, 1212]);
        });
    });
});
