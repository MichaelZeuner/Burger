import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  private posts = [];
  private postsUpdated = new Subject<any[]>();

  constructor() { }

  getPosts() {
    return [...this.posts];
  }

  getPostUpdateListener() {
    return this.postsUpdated.asObservable();
  }

  addPost(post) {
    this.posts.push(post);
    this.postsUpdated.next([...this.posts]);
  }
}
