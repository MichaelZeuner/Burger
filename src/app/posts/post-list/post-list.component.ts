import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { PostService } from '../post.service';
import { Subscription } from 'rxjs';
import { Post } from '../post.model';

@Component({
  selector: 'app-post-list',
  templateUrl: './post-list.component.html',
  styleUrls: ['./post-list.component.scss']
})
export class PostListComponent implements OnInit, OnDestroy {

  private postsSub: Subscription;

  posts: Post[] = [];

  constructor(public postService: PostService) { }

  ngOnInit(): void {
    this.postService.getPosts();
    this.postsSub = this.postService.getPostUpdateListener().subscribe((newPosts) => {
      this.posts = newPosts;
    })
  }

  ngOnDestroy() {
    this.postsSub.unsubscribe();
  }
}
