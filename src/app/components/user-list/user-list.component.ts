import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatSelectChange } from '@angular/material';
import { UserSearchResponsePage } from 'src/app/core/models/user-search-response';
import { SortOrder } from 'src/app/store/search/search.reducer';

@Component({
    selector: 'tdl-user-list',
    templateUrl: './user-list.component.html',
    styleUrls: ['./user-list.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class UserListComponent implements OnInit {
    @Input() results: UserSearchResponsePage;
    @Input() query: string;
    @Input() sortOrder: SortOrder;

    @Output() changeSortOrder: EventEmitter<SortOrder> = new EventEmitter();

    pageStart: number;
    pageEnd: number;
    sortOrderControl: FormControl;
    sortOrderKeys: string[] = Object.keys(SortOrder);
    SortOrder = SortOrder;

    ngOnInit() {
        this.pageStart = (this.results.page_number - 1) * this.results.per_page + 1;
        this.pageEnd = this.pageStart + this.results.per_page - 1;
        if (this.pageEnd > this.results.total_count) {
            this.pageEnd = this.results.total_count;
        }
    }

    onSortOrderChange(change: MatSelectChange): void {
        this.changeSortOrder.emit(change.value);
    }
}
