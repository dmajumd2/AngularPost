import { Component, OnInit } from '@angular/core';
import { PostsService } from '../posts.service';

@Component({
  selector: 'app-listpost',
  templateUrl: './listpost.component.html',
  styleUrls: ['./listpost.component.css']
})
export class ListpostComponent implements OnInit {

  toggleComments : any = [];
  posts : any = [];
  comment : any = [];
  data: any = [];
  commentsArray : any = [];
  rowId : any;
  hide : any = [];
  comm : any = [];
  likedUser : any = [];
  modalIf: boolean[] = [];
  likedUser1 : any =[[]];
  modal_show = false;
  like : any = [];
  target: any;
  show: any = -1;

  constructor(private _postsService: PostsService) { }

  ngOnInit() {
    this.loadData();
    this.loadComments();
  }

  loadData(){
    this._postsService.getPost().subscribe((data: any)=>{
      this.posts = data.data;
      this.loadBooleanArray();
      this.toggleComments = Array(this.posts.length).fill(false);
    });
  }

  loadBooleanArray(){
    if(this.posts){
      for(var i = 0 ; i < this.posts.length; i++){
          this.modalIf[i] = false;
          this.likedUser1.push(this.posts[i].liked);
      }
    } 
  }


  loadComments(){
    //console.log("In the load")
    this._postsService.$authObservable.subscribe((data: any)=>{
      //console.log("In the loadts");
      console.log(data);
      this.commentsArray = data.data[0].comments;
    });
  }

  modal(post, i){
    this.modalIf[i]=true;
  }

  closeModal(post, i){
    this.modalIf[i]=false;
  }

  addComment(i){
    this.toggleComments[i] = !this.toggleComments[i];
  }

  getcomments(post, i){ 
    this.comm = this.posts[i].comments;
    this.hide[i] = !this.hide[i];
    this.loadComments();
  }

  saveComment(comment, i, id){
      var obj = {
          comment: comment[i],
          id: id
      };
      this._postsService.addComment(obj);
     alert("Comment Saved");
     this.comm.push(comment)
  }

  addLikedUsers(post, id, i){
    var obj = {
      likedName: post.uname,
      id: id
  };
    this._postsService.likedUser(obj).subscribe(
      result=>{
         if(!post.liked){
           post.liked=[];
         } 
         post.liked.push(post.uname);
      }, error1=>{
        console.log(error1);
      } );
  }

  getLikes(post:any){
    if(post.liked){
      return post.liked.length;
    }
    return 0;
  }

  delete(id, i){
    console.log(i);
    this.show = i;
      this._postsService.delete(id).subscribe(
        result =>{
            this.loadData();
        },
        error1=>{
            
        });
  }
}
