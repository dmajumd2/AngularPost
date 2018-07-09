import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private _http: HttpClient, private _router: Router) { }

  registration(regdetails: any){
      console.log(regdetails);
      this._http.post('http://localhost:3000/registration', regdetails).subscribe((data: any)=>{
          console.log(data);
          if(data.isRegistered){
            this._router.navigate(['/login']);
          }
      });
  }

}
