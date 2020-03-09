import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Post } from './post.model';

@Injectable({
  providedIn: 'root'
})
export class PostService {
  private posts: Post[] = [];
  private postsUpdated = new Subject<any[]>();

  constructor(private http: HttpClient) { }

  getPosts() {
    this.http.get<Post[]>('http://localhost:3000/api/posts').subscribe((postData) => {
      this.posts = postData;
      this.postsUpdated.next([...this.posts]);
    });
  }

  getPostUpdateListener() {
    return this.postsUpdated.asObservable();
  }

  addPost(post: Post) {
    this.http.post('http://localhost:3000/api/posts', post).subscribe(() => {
      console.log('added post');
      this.posts.push(post);
      this.postsUpdated.next([...this.posts]);
    });
  }
}
