import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { PostModel } from '../model/post.model';
import { PostService } from '../post.service';
import { Platform } from '../enum/platform.enum';
import { ImageSuggestionComponent } from '../image-suggestion/image-suggestion.component';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-post-form',
  templateUrl: './post-form.component.html',
  styleUrl: './post-form.component.css',
  imports: [FormsModule, ImageSuggestionComponent],
})
export class PostFormComponent implements OnInit {
  post!: PostModel;

  platform = Platform;
  isProceeded = false;
  tabs: Platform[] = [];
  platformTabs = {
    linkedin: false,
    instagram: false,
    twitter: false,
  };

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private postService: PostService,
  ) {}

  ngOnInit() {
    const id = this.route.snapshot.params['id'];
    if (id) {
      this.postService.getPost(id).subscribe((post) => {
        this.post = post;
        this.post.id = id;
        if (this.post.linkedin) {
          this.tabs.push(Platform.LINKEDIN);
        }
        if (this.post.instagram) {
          this.tabs.push(Platform.INSTAGRAM);
        }
        if (this.post.x) {
          this.tabs.push(Platform.X);
        }
        this.switchTab(this.tabs[0]);
      });
    }
  }

  switchTab(tab: Platform) {
    this.platformTabs.linkedin = false;
    this.platformTabs.instagram = false;
    this.platformTabs.twitter = false;
    if (tab === Platform.LINKEDIN) {
      this.platformTabs.linkedin = true;
    } else if (tab === Platform.INSTAGRAM) {
      this.platformTabs.instagram = true;
    } else if (tab === Platform.X) {
      this.platformTabs.twitter = true;
    }
  }

  isActive(tab: Platform) {
    if (tab === Platform.LINKEDIN) {
      return this.platformTabs.linkedin;
    } else if (tab === Platform.INSTAGRAM) {
      return this.platformTabs.instagram;
    } else if (tab === Platform.X) {
      return this.platformTabs.twitter;
    }
    return false;
  }

  backToGeneratePage() {
    this.router.navigate(['/post-form']);
  }

  backToGeneratedPostPage() {
    this.isProceeded = false;
  }

  savePost() {
    this.postService.savePost(this.post).subscribe();
  }

  proceed() {
    this.savePost();
    this.isProceeded = true;
  }
}
