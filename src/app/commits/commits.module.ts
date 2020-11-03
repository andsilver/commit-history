import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedModule } from '../shared/shared.module';

import { CommitsListComponent } from './components/commits-list/commits-list.component';
import { CommitComponent } from './components/commit/commit.component';
import { RepoOwnerFormComponent } from './components/repo-owner-form/repo-owner-form.component';


@NgModule({
  declarations: [CommitsListComponent, CommitComponent, RepoOwnerFormComponent],
  imports: [
    CommonModule,
    SharedModule
  ],
  exports: [CommitsListComponent, CommitComponent]
})
export class CommitsModule { }
