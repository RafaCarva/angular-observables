import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { BasicComponent } from './basic/basic.component';
import { ColdObservableComponent } from './cold-observable/cold-observable.component';

@NgModule({
  declarations: [
    AppComponent,
    BasicComponent,
    ColdObservableComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
