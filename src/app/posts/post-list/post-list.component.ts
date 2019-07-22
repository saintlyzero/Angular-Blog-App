import { Component, OnInit } from '@angular/core';
import { Post } from '../post';
import { Observable } from 'rxjs';
import { PostService } from '../post.service';
import { AuthService } from 'src/app/core/auth.service';

@Component({
  selector: 'app-post-list',
  templateUrl: './post-list.component.html',
  styleUrls: ['./post-list.component.scss']
})
export class PostListComponent implements OnInit {
  posts: Observable<Post[]>;
  myPosts: any;

  constructor(private postService: PostService,
    private auth: AuthService) {
    this.posts = this.postService.getPosts();
   }

  ngOnInit() {
  }

  delete(id: string){
    this.postService.delete(id)
  }

}
