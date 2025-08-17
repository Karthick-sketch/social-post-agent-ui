import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { DatePipe, NgClass } from '@angular/common';
import { PostService } from '../post.service';
import { PostPreviewModel } from '../model/post-preview.model';
import { Platform } from '../enum/platform.enum';

@Component({
  selector: 'app-post-list',
  templateUrl: './post-preview.component.html',
  imports: [FormsModule, DatePipe, NgClass],
})
export class PostPreviewComponent implements OnInit {
  content = '';

  postPreview!: PostPreviewModel;
  selectedPlatform!: Platform;

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

  switchTab(platform: Platform) {
    this.selectedPlatform = platform;
    this.setContent();
  }

  isActive(platform: Platform) {
    return this.selectedPlatform === platform;
  }

  setContent() {
    if (this.selectedPlatform === Platform.LINKEDIN) {
      this.content = this.postPreview.post.linkedin;
    } else if (this.selectedPlatform === Platform.INSTAGRAM) {
      this.content = this.postPreview.post.instagram;
    } else if (this.selectedPlatform === Platform.X) {
      this.content = this.postPreview.post.x;
    }
  }

  toUrl(url: string) {
    return `url('${url}')`;
  }
}
