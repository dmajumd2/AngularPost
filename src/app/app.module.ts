import { AuthGuard } from './auth/auth.guard';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { CookieService } from 'ngx-cookie-service';
import { BootstrapModalModule } from 'ng2-bootstrap-modal';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthinterceptorService } from './auth/authinterceptor.service';

import { AppComponent } from './app.component';
import { RegistrationComponent } from './auth/registration/registration.component';
import { NavbarComponent } from './auth/navbar/navbar.component';
import { LoginComponent } from './auth/login/login.component';
import { HomeComponent } from './auth/home/home.component';
import { CreatepostComponent } from './posts/createpost/createpost.component';
import { ListpostComponent } from './posts/listpost/listpost.component';
import { ViewpostComponent } from './posts/viewpost/viewpost.component';
import { AuthService } from './auth/auth.service';

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
    BootstrapModalModule,
    RouterModule.forRoot([
      {path: "registration", component:RegistrationComponent},
      {path: "login", component:LoginComponent},
      {path: "home", component:HomeComponent , canActivate:[AuthGuard]},
      {path: "createpost", component: CreatepostComponent, canActivate:[AuthGuard]},
      {path: "listpost", component: ListpostComponent, canActivate:[AuthGuard]},
      {path: "listpost/:pCode", component: ViewpostComponent, canActivate:[AuthGuard]},
      {path: "", redirectTo:"registration", pathMatch:"full"},
      {path: "**", redirectTo:"home"}
    ])
  ],
  providers: [AuthService, CookieService, AuthGuard, {
    provide: HTTP_INTERCEPTORS,
    useClass: AuthinterceptorService,
    multi: true
  }],
  bootstrap: [AppComponent]
})
export class AppModule { }
