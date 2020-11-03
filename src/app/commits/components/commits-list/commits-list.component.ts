import { formatDate } from '@angular/common';
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, HostListener, OnDestroy, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { take } from 'rxjs/operators';

import { CommitDetails } from '../../interfaces';
import { GithubService } from '../../services/github.service';

interface RepoOwner {
  repo: string;
  owner: string;
}

@Component({
  selector: 'app-commits-list',
  templateUrl: './commits-list.component.html',
  styleUrls: ['./commits-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CommitsListComponent implements OnInit, OnDestroy {
  public grouped: {
    [date: string]: CommitDetails[];
  } = {};

  public groups: {
    date: string;
    commits: CommitDetails[]
  }[] = [];

  public repoOwner: RepoOwner;
  public loading = false;
  public allLoaded = false;
  public perPage = 20;
  public page = 1;
  public error = '';

  private _ngUnsubscribe = new Subject();

  constructor(
    private github: GithubService,
    private cdr: ChangeDetectorRef
  ) { }

  @HostListener('window:scroll', ['$event.target.scrollingElement'])
  onScroll(scrollingElement: HTMLElement) {
    if (this.loading || this.allLoaded) {
      return;
    }
    const { scrollTop, clientHeight, scrollHeight } = scrollingElement;

    if (scrollTop + clientHeight >= scrollHeight - 100) {
      this.page += 1;
      this.fetchCommits();
    }
  }

  ngOnInit(): void { }

  public list(repoOwner: RepoOwner) {
    this.page = 1;
    this.grouped = {};
    this.groups = [];
    this.repoOwner = repoOwner;
    this.fetchCommits();
  }

  public fetchCommits() {
    this.loading = true;

    this.github.listCommits({ page: this.page, per_page: this.perPage, ...this.repoOwner })
      .pipe(take(1))
      .subscribe(list => {
        this.loading = false;
        this.error = '';
        this.allLoaded = list.length < this.perPage;

        list.forEach(c => {
          const date = formatDate(c.commit.committer.date, 'yyyy-MM-dd', 'en');
          this.grouped[date] || (this.grouped[date] = []);
          this.grouped[date].push(c);
        });

        this.groups = Object
          .entries(this.grouped)
          .sort(([d1], [d2]) => d1 < d2 ? 1 : -1)
          .map(([date, commits]) => ({
            date: formatDate(date, 'MMM d, yyyy', 'en'),
            commits
          }));
        this.cdr.detectChanges();
      }, (err) => {
        this.loading = false;
        this.error = err.error.message;
        this.cdr.detectChanges();
      });
  }

  ngOnDestroy() {
    this._ngUnsubscribe.next();
    this._ngUnsubscribe.complete();
  }
}
