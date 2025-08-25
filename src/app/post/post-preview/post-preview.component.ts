import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { DatePipe, NgClass } from '@angular/common';
import { PostService } from '../post.service';
import { PostPreviewModel } from '../model/post-preview.model';

@Component({
  selector: 'app-post-list',
  templateUrl: './post-preview.component.html',
  imports: [FormsModule, DatePipe, NgClass],
})
export class PostPreviewComponent implements OnInit {
  content = '';
  selectedPlatform = '';

  postPreview!: PostPreviewModel;

  constructor(
    private route: ActivatedRoute,
    private postService: PostService,
  ) {}

  ngOnInit() {
    const postId = this.route.snapshot.params['id'];
    if (postId) {
      this.postService.getPostPreview(postId).subscribe((preview) => {
        this.postPreview = preview;
        this.switchTab(preview.platforms[0]);
      });
    }
  }

  switchTab(platform: string) {
    this.selectedPlatform = platform;
    this.setContent();
  }

  isActive(platform: string) {
    return this.selectedPlatform === platform;
  }

  setContent() {
    if (this.selectedPlatform === "LinkedIn") {
      this.content = this.postPreview.post.linkedin;
    } else if (this.selectedPlatform === "Instagram") {
      this.content = this.postPreview.post.instagram;
    } else if (this.selectedPlatform === "X/Twitter") {
      this.content = this.postPreview.post.x;
    }
  }

  toUrl(url: string) {
    return `url('${url}')`;
  }
}
