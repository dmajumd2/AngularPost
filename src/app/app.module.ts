import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { RegistrationComponent } from './auth/registration/registration.component';
import { NavbarComponent } from './auth/navbar/navbar.component';
import { LoginComponent } from './auth/login/login.component';
import { HomeComponent } from './auth/home/home.component';
import { CreatepostComponent } from './posts/createpost/createpost.component';
import { ListpostComponent } from './posts/listpost/listpost.component';

@NgModule({
  declarations: [
    AppComponent,
    RegistrationComponent,
    NavbarComponent,
    LoginComponent,
    HomeComponent,
    CreatepostComponent,
    ListpostComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    RouterModule.forRoot([
      {path: "registration", component:RegistrationComponent},
      {path: "login", component:LoginComponent},
      {path: "home", component:HomeComponent},
      {path: "createpost", component: CreatepostComponent},
      {path: "listpost", component: ListpostComponent},
      {path: "", redirectTo:"registration", pathMatch:"full"},
      {path: "**", redirectTo:"home"}
    ])
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
