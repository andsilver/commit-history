import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { CoreModule } from './core/core.module';
import { CommitsModule } from './commits/commits.module';

import { AppComponent } from './app.component';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    CoreModule,
    CommitsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
