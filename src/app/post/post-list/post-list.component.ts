import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { PostListModel } from '../model/post-list.model';
import { PostService } from '../post.service';
import { Status } from '../enum/status.enum';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-post-list',
  templateUrl: './post-list.component.html',
  styleUrl: './post-list.component.css',
  imports: [FormsModule, DatePipe],
})
export class PostListComponent implements OnInit {
  Status = Status;

  postList: PostListModel[] = [];

  constructor(
    private router: Router,
    private postService: PostService,
  ) {}

  ngOnInit() {
    this.postService
      .getPostList()
      .subscribe((posts) => (this.postList = posts));
  }

  getStatusKey(value: Status): string | undefined {
    return Status[value - 1];
  }

  openPostForm() {
    this.router.navigate(['/post-form']);
  }
}
