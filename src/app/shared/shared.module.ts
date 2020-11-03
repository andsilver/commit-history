import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';


@NgModule({
    exports: [
        FormsModule,
        ReactiveFormsModule,
        RouterModule
    ]
})
export class SharedModule { }
