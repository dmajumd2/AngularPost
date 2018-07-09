import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  toggleLinks : Boolean = false;

  constructor(private _authService: AuthService) { }


  logout(){
    this._authService.logout();
  }

  ngOnInit() {
    this._authService.$authObservable.subscribe((data: any)=>{
      this.toggleLinks = data;
    })
  }

}
