import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { CommitDetails, ListCommitsParams } from '../interfaces';

import { environment } from 'src/environments/environment';



@Injectable({
  providedIn: 'root'
})
export class GithubService {
  private _url = `https://api.github.com/repos`;

  constructor(
    private http: HttpClient
  ) { }

  listCommits({ page, owner, repo, per_page }: ListCommitsParams) {
    owner || (owner = environment.github.owner);
    repo || (repo = environment.github.repo);
    !page && (page = 1);
    !per_page && (per_page = 20);

    return this.http.get<CommitDetails[]>(`${this._url}/${owner}/${repo}/commits`, {
      params: {
        page: `${page}`,
        per_page: `${per_page}`
      },
      headers: {
        accept: 'application/vnd.github.v3+json'
      }
    });
  }
}
