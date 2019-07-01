import { NO_ERRORS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { UserInfo } from 'src/app/core/models/user-search-response';
import { UserCardComponent } from './user-card.component';

describe('UserCardComponent', () => {
    let component: UserCardComponent;
    let fixture: ComponentFixture<UserCardComponent>;
    let mockUser: UserInfo;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [UserCardComponent],
            schemas: [NO_ERRORS_SCHEMA]
        }).compileComponents();
    }));

    beforeEach(() => {
        mockUser = {
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
        };

        fixture = TestBed.createComponent(UserCardComponent);
        component = fixture.componentInstance;
        component.user = mockUser;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
