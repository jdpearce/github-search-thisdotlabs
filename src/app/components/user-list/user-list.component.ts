import { Component, Input, OnInit } from '@angular/core';
import { UserSearchResponsePage } from 'src/app/core/models/user-search-response';

@Component({
    selector: 'tdl-user-list',
    templateUrl: './user-list.component.html',
    styleUrls: ['./user-list.component.scss']
})
export class UserListComponent implements OnInit {
    @Input() results: UserSearchResponsePage;
    pageStart: number;
    pageEnd: number;

    ngOnInit() {
        this.pageStart = (this.results.page_number - 1) * this.results.per_page + 1;
        this.pageEnd = this.pageStart + this.results.per_page - 1;
        if (this.pageEnd > this.results.total_count) {
            this.pageEnd = this.results.total_count;
        }
    }
}
