import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-repo-owner-form',
  templateUrl: './repo-owner-form.component.html',
  styleUrls: ['./repo-owner-form.component.scss']
})
export class RepoOwnerFormComponent implements OnInit {
  public form: FormGroup;

  @Output()
  list = new EventEmitter();

  constructor() { }

  ngOnInit(): void {
    this.form = new FormGroup({
      owner: new FormControl(environment.github.owner, [Validators.required]),
      repo: new FormControl(environment.github.repo, [Validators.required])
    });
    this.list.emit(this.form.value);
  }

  public submit() {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }
    this.list.emit(this.form.value);
  }
}
