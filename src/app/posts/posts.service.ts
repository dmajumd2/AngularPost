import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root'
})
export class PostsService {

  constructor(private _http: HttpClient, private _router: Router,
    private _cookieService : CookieService) { }

  addPost(post: any){
      console.log(post);
      this._http.post('http://localhost:3000/post', post).subscribe((data: any)=>{
          console.log(data);
      });
  }


}
