import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SharedModule } from './shared/shared.module';
import { CoreModule } from './core/core.module';
import { AdminProfileComponent } from './screens/admin-profile/admin-profile.component';
import { ErrorComponent } from './screens/error/error.component';
import { VehicleComponent } from './screens/vehicle/vehicle.component';
@NgModule({
  declarations: [
    AppComponent,
    AdminProfileComponent,
    ErrorComponent,
    VehicleComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    SharedModule,
    CoreModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
