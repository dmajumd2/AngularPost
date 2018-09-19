import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { AuthService } from '../auth/auth.service';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PostsService {
  $authObservable : Subject<any> = new Subject();

  constructor(private _http: HttpClient, private _router: Router,
    private _cookieService : CookieService, private _authService: AuthService) { }

  addPost(post: any){
      console.log(post);
      var token =  this._authService.checkUserStatus();
      this._http.post('http://localhost:3000/post', post,
      ).subscribe((data: any)=>{
      });
  }


  getPost(){
    var token =  this._authService.checkUserStatus();
    return this._http.get('http://localhost:3000/getposts');
  }

  addComment(comments: any){
    var commentsData = [];
     var token =  this._authService.checkUserStatus();
     this._http.post('http://localhost:3000/addcomments', comments).subscribe((data: any)=>{
        console.log(data.data.comments);
     });
  }

  getComments(obj: any){
    var token =  this._authService.checkUserStatus();
    return this._http.post('http://localhost:3000/getcomments', obj);
  }

  
likedUser(user: any){
  console.log(user);
  var token =  this._authService.checkUserStatus();
  return this._http.post('http://localhost:3000/likedUser', user);
}

delete(id: any){
  //console.log(id);
  var obj = {
    id : id
  }

  var token =  this._authService.checkUserStatus();
  return this._http.post('http://localhost:3000/deletepost', obj);
}

}




// export class PostModel {
//   _id:string;
//   name:string;
//   comments:string[];
// }