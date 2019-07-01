export interface UserSearchResponsePage {
    total_count: number;
    incomplete_results: boolean;
    page_count: number;
    per_page: number;
    page_number: number;
    query: string;
    items: UserInfo[];
}

export interface UserInfo {
    login: string;
    id: number;
    node_id: string;
    avatar_url: string;
    gravatar_id: string;
    url: string;
    html_url: string;
    followers_url: string;
    subscriptions_url: string;
    organizations_url: string;
    repos_url: string;
    received_events_url: string;
    type: 'User' | 'Organization';
    score: number;
}
