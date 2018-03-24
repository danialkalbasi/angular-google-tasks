import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { MatSidenavModule, MatProgressSpinnerModule, MatButtonModule } from '@angular/material';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

import { AppComponent } from './app.component';
import { ComponentsModule } from './components/components.module';
import {
  GoogleTasksService,
  GapiService,
  ProgressBarService,
  AuthenticationService,
  GoogleTaskListsService
} from './services';
import { GapiRef } from './services/gapi-ref.service';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    MatSidenavModule,
    NoopAnimationsModule,
    ComponentsModule,
    MatProgressSpinnerModule,
    MatButtonModule
  ],
  providers: [
    GoogleTasksService,
    GapiService,
    ProgressBarService,
    AuthenticationService,
    GapiRef,
    GoogleTaskListsService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
