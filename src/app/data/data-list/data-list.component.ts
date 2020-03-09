import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { DataService } from '../data.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-data-list',
  templateUrl: './data-list.component.html',
  styleUrls: ['./data-list.component.scss']
})
export class DataListComponent implements OnInit, OnDestroy {

  private postsSub: Subscription;

  posts = [];

  constructor(public data: DataService) { }

  ngOnInit(): void {
    this.posts = this.data.getPosts();
    this.postsSub = this.data.getPostUpdateListener().subscribe((newPosts) => {
      this.posts = newPosts;
    })
  }

  ngOnDestroy() {
    this.postsSub.unsubscribe();
  }
}
