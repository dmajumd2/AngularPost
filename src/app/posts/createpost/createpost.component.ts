import { Component, OnInit } from '@angular/core';
import { PostsService } from '../posts.service';

@Component({
  selector: 'app-createpost',
  templateUrl: './createpost.component.html',
  styleUrls: ['./createpost.component.css']
})
export class CreatepostComponent implements OnInit {

  create : any = {};

  constructor(private _postsService: PostsService ) { }


  createPost(){
      this._postsService.addPost(this.create);
  }


  ngOnInit() {
  }

}
