import { NO_ERRORS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { MatExpansionModule } from '@angular/material';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { UserSearchResponsePage } from 'src/app/core/models/user-search-response';
import { UserListComponent } from './user-list.component';

describe('UserListComponent', () => {
    let component: UserListComponent;
    let fixture: ComponentFixture<UserListComponent>;
    let results: UserSearchResponsePage;

    beforeEach(async(() => {
        results = {
            total_count: 12,
            page_count: 1,
            per_page: 30,
            page_number: 1,
            query: 'Tom',
            incomplete_results: false,
            items: [
                {
                    login: 'mojombo',
                    id: 1,
                    node_id: 'MDQ6VXNlcjE=',
                    avatar_url:
                        'https://secure.gravatar.com/avatar/25c7c18223fb42a4c6ae1c8db6f50f9b?d=https://a248.e.akamai.net/assets.github.com%2Fimages%2Fgravatars%2Fgravatar-user-420.png',
                    gravatar_id: '',
                    url: 'https://api.github.com/users/mojombo',
                    html_url: 'https://github.com/mojombo',
                    followers_url: 'https://api.github.com/users/mojombo/followers',
                    subscriptions_url: 'https://api.github.com/users/mojombo/subscriptions',
                    organizations_url: 'https://api.github.com/users/mojombo/orgs',
                    repos_url: 'https://api.github.com/users/mojombo/repos',
                    received_events_url: 'https://api.github.com/users/mojombo/received_events',
                    type: 'User',
                    score: 105.47857
                }
            ]
        };

        TestBed.configureTestingModule({
            imports: [MatExpansionModule, NoopAnimationsModule],
            declarations: [UserListComponent],
            schemas: [NO_ERRORS_SCHEMA]
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(UserListComponent);
        component = fixture.componentInstance;
        component.results = results;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
