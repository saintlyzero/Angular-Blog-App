import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { PostService } from '../post.service';
import { Post } from '../post';
import { AuthService } from 'src/app/core/auth.service';


@Component({
  selector: 'app-post-detail',
  templateUrl: './post-detail.component.html',
  styleUrls: ['./post-detail.component.scss']
})
export class PostDetailComponent implements OnInit {
  post:Post;
  editing: boolean = false;

  constructor(private route: ActivatedRoute,
    private postService: PostService,
    private auth: AuthService,
    private router: Router) { }

  ngOnInit() {
   let pst =  this.getPost();
    console.log(this);
    
  }
  getPost(){
    const id = this.route.snapshot.paramMap.get('id');
    return this.postService.getPostData(id)
    .subscribe(data => this.post = data);
  }
  delete(){
    const id = this.route.snapshot.paramMap.get('id')
    this.postService.delete(id)
    this.router.navigate(['/blog'])
  }
  updatePost(){
    const id = this.route.snapshot.paramMap.get('id')
    const formData = {
      title: this.post.title,
      content: this.post.content
    }
    this.postService.update(id,formData)
    this.editing = false
  }
}
