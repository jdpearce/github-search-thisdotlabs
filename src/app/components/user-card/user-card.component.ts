import { Component, Input, OnInit } from '@angular/core';
import { UserInfo } from 'src/app/core/models/user-search-response';

@Component({
    selector: 'tdl-user-card',
    templateUrl: './user-card.component.html',
    styleUrls: ['./user-card.component.scss']
})
export class UserCardComponent implements OnInit {
    @Input() user: UserInfo;

    constructor() {}

    ngOnInit() {}
}
