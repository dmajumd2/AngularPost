import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { CookieService } from 'ngx-cookie-service';

import { AppComponent } from './app.component';
import { RegistrationComponent } from './auth/registration/registration.component';
import { NavbarComponent } from './auth/navbar/navbar.component';
import { LoginComponent } from './auth/login/login.component';
import { HomeComponent } from './auth/home/home.component';
import { CreatepostComponent } from './posts/createpost/createpost.component';
import { ListpostComponent } from './posts/listpost/listpost.component';
import { ViewpostComponent } from './posts/viewpost/viewpost.component';

@NgModule({
  declarations: [
    AppComponent,
    RegistrationComponent,
    NavbarComponent,
    LoginComponent,
    HomeComponent,
    CreatepostComponent,
    ListpostComponent,
    ViewpostComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    RouterModule.forRoot([
      {path: "registration", component:RegistrationComponent},
      {path: "login", component:LoginComponent},
      {path: "home", component:HomeComponent},
      {path: "createpost", component: CreatepostComponent},
      {path: "listpost", component: ListpostComponent},
      {path: "viewpost", component: ViewpostComponent},
      {path: "", redirectTo:"registration", pathMatch:"full"},
      {path: "**", redirectTo:"home"}
    ])
  ],
  providers: [CookieService],
  bootstrap: [AppComponent]
})
export class AppModule { }
