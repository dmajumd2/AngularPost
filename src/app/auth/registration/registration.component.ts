import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent implements OnInit {

  regform : any = {};

  constructor(private _authService : AuthService) { }


  signUp(){
    this._authService.registration(this.regform);
  }

  
  ngOnInit() {

  }
  
}
