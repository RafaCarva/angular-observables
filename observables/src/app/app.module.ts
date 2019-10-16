import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { BasicComponent } from './basic/basic.component';
import { ColdObservableComponent } from './cold-observable/cold-observable.component';
import { HotObservableIntroComponent } from './hot-observable-intro/hot-observable-intro.component';
import { HotObservablesComponent } from './hot-observables/hot-observables.component';

@NgModule({
  declarations: [
    AppComponent,
    BasicComponent,
    ColdObservableComponent,
    HotObservableIntroComponent,
    HotObservablesComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
