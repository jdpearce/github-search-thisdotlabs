import { Component, Input, OnChanges } from '@angular/core';
import { UserSearchResponsePage } from 'src/app/core/models/user-search-response';

@Component({
    selector: 'tdl-pagination',
    templateUrl: './pagination.component.html',
    styleUrls: ['./pagination.component.scss']
})
export class PaginationComponent implements OnChanges {
    static readonly MAX_RESULTS: number = 1000;

    @Input() results: UserSearchResponsePage;

    pageBlocks: number[] = [];

    ngOnChanges() {
        this.pageBlocks = this.constructBlocks();
    }

    constructBlocks(): number[] {
        const blocks = [];
        if (this.results.page_count <= 10) {
            for (let i = 1; i <= this.results.page_count; i++) {
                blocks.push(i);
            }
            return blocks;
        }

        // 1 2 3 [4] 5 6 7 ... 10 11
        if (this.results.page_number <= 5) {
            console.log('');
            blocks.push(1, 2, 3, 4, 5, 6, 7, 0);
            blocks.push(this.results.page_count - 1, this.results.page_count);
            return blocks;
        }

        // 1 2 ... 5 6 [7] 8 9 10 11
        if (this.results.page_number >= this.results.page_count - 5) {
            blocks.push(1, 2, 0);
            for (let i = this.results.page_count - 6; i <= this.results.page_count; i++) {
                blocks.push(i);
            }
            return blocks;
        }

        // 1 2 ... 6 7 [8] 9 10 ... 15 16
        blocks.push(1, 2, 0);
        for (let i = this.results.page_number - 2; i <= this.results.page_number + 2; i++) {
            blocks.push(i);
        }
        blocks.push(0, this.results.page_count - 1, this.results.page_count);
        return blocks;
    }

    get shouldShowPreviousLink(): boolean {
        return this.results.page_number > 1;
    }

    get shouldShowNextLink(): boolean {
        return this.results.page_number < this.results.page_count;
    }

    shouldShowLinkForBlock(block: number): boolean {
        return block > 0 && this.results.page_number != block && PaginationComponent.MAX_RESULTS - block * this.results.per_page > 0;
    }

    shouldShowDisabledLinkForBlock(block: number): boolean {
        return block > 0 && PaginationComponent.MAX_RESULTS - block * this.results.per_page < 0;
    }
}
