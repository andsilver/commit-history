export interface ShortPerson {
    name: string;
    email: string;
    date: string;
}

export interface FullPerson {
    avatar_url: string;
    events_url: string;
    followers_url: string;
    following_url: string;
    gists_url: string;
    gravatar_id: string;
    html_url: string;
    id: number;
    login: string;
    node_id: string;
    organizations_url: string;
    received_events_url: string;
    repos_url: string;
    site_admin: boolean;
    starred_url: string;
    subscriptions_url: string;
    type: string;
    url: string;
}

export interface Commit {
    id: string;
    tree_id: string;
    message: string;
    timestamp: Date;
    author: ShortPerson;
    committer: ShortPerson;
    comment_count: number;
    url: string;
}

export interface CommitDetails {
    commit: Commit;
    author: FullPerson;
    committer: FullPerson;
    html_url: string;
    sha: string;
    url: string;
    comments_url: string;
}

export interface ListCommitsParams {
    page: number;
    owner: string;
    repo: string;
    per_page?: number;
}
