import { Component, Input, OnInit } from '@angular/core';
import { CommitDetails } from '../../interfaces';

@Component({
  selector: 'app-commit',
  templateUrl: './commit.component.html',
  styleUrls: ['./commit.component.scss']
})
export class CommitComponent implements OnInit {
  @Input()
  commit: CommitDetails;

  constructor() { }

  ngOnInit(): void {
  }

  public get author() {
    return this.commit.author;
  }

  public get committer() {
    return this.commit.committer;
  }

  public get message() {
    return this.commit.commit.message;
  }

  public get commitDate() {
    return this.commit.commit.committer.date;
  }

  public get item() {
    return this.commit.commit;
  }
}
