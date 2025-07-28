import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { PostListModel } from '../model/post-list.model';
import { PostService } from '../post.service';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-post-list',
  templateUrl: './post-list.component.html',
  styleUrl: './post-list.component.css',
  imports: [FormsModule, DatePipe],
})
export class PostListComponent implements OnInit {
  postList: PostListModel[] = [];

  constructor(private postService: PostService) {}

  ngOnInit() {
    this.postService
      .getPostList()
      .subscribe((posts) => (this.postList = posts));
  }
}
