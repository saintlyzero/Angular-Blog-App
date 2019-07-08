import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/core/auth.service';
import { PostService } from '../post.service';
import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';
import { AngularFireStorage } from '@angular/fire/storage'

@Component({
  selector: 'app-post-dashboard',
  templateUrl: './post-dashboard.component.html',
  styleUrls: ['./post-dashboard.component.scss']
})
export class PostDashboardComponent implements OnInit {

  title: string
  content: string
  image: string = null
  buttonText: string = 'Create Post'
  uploadPercent: Observable<number>
  downloadURL: Observable<string>

  constructor( private auth: AuthService, private postService: PostService,
    private storage: AngularFireStorage) { }

  ngOnInit() {
  }
  
  createPost(){
    const data = {
      title: this.title,
      content: this.content,
      image: this.image,
      published: new Date(),
      author: this.auth.authState.displayName || this.auth.authState.email,
      authorId: this.auth.currentUserId
    };
    this.postService.create(data);
    this.title = ''
    this.content = ''
    this.image = ''

    // TODO: Display a SnackBar
    
    this.buttonText = 'Post Created'
    setTimeout(() => (this.buttonText = "Create Post"),3000);
  }

  uploadImage(event){
    const file = event.target.files[0]
    const path = `posts/${file.name}`
    if( file.type.split('/')[0] !== 'image'){
      return alert('Only Image Files')
    }
    else{
      const task = this.storage.upload(path, file);
      const ref = this.storage.ref(path);
      this.uploadPercent = task.percentageChanges();
      console.log('Image uploaded!');
      task.snapshotChanges().pipe(
        finalize(() => {
          this.downloadURL = ref.getDownloadURL()
          this.downloadURL.subscribe(url => (this.image = url));
        })
      )
      .subscribe();
    }
    
  }

}
