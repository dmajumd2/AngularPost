import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PostsService } from '../posts.service';

@Component({
  selector: 'app-viewpost',
  templateUrl: './viewpost.component.html',
  styleUrls: ['./viewpost.component.css']
})
export class ViewpostComponent implements OnInit {

  posts : any = [];
  postDetails: any = []; 
  pCode : any;
  toggleComments : any = [];
  comments : any = [];
  hide : boolean = true;
  liked : number = 0;

  constructor(private _activatedRoute : ActivatedRoute,
                private _route: Router, private _postsService: PostsService) { }

  ngOnInit() {
      this._activatedRoute.params.subscribe((data)=>{
        console.log(data);
        this.pCode = data.pCode;
        console.log(this.pCode);
      });

      this._postsService.getPost().subscribe((data: any)=>{
        this.posts = data.data;
        for(var i = 0; i < this.posts.length; i++){
          if(this.pCode == this.posts[i]._id){
              console.log("Inside get posts details");
              this.postDetails = this.posts[i];
          }
        }
      }); 

      this._postsService.getPost().subscribe((data: any)=>{
        this.posts = data.data;
        console.log(this.posts);
        //this.toggleComments = Array(this.posts.length).fill(false);
      });
  }

  back(){
      this._route.navigate(['/listpost']);
  }

  getComment(){
    for(var i = 0 ; i < this.posts.length; i++){
      if(this.pCode == this.posts[i]._id){
        this.comments = this.posts[i].comments;
      }
    }
      console.log(this.comments);
  }

  likes(){
    this.liked++;
  }

}
