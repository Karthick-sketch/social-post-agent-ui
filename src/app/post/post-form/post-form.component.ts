import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { PostModel } from '../model/post.model';
import { PostService } from '../post.service';
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

  isProceeded = false;
  tabs: string[] = [];
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
          this.tabs.push('LinkedIn');
        }
        if (this.post.instagram) {
          this.tabs.push('Instagram');
        }
        if (this.post.x) {
          this.tabs.push('X/Twitter');
        }
        this.switchTab(this.tabs[0]);
      });
    }
  }

  switchTab(tab: string) {
    this.platformTabs.linkedin = false;
    this.platformTabs.instagram = false;
    this.platformTabs.twitter = false;
    if (tab === 'LinkedIn') {
      this.platformTabs.linkedin = true;
    } else if (tab === 'Instagram') {
      this.platformTabs.instagram = true;
    } else if (tab === 'X/Twitter') {
      this.platformTabs.twitter = true;
    }
  }

  isActive(tab: string) {
    if (tab === 'LinkedIn') {
      return this.platformTabs.linkedin;
    } else if (tab === 'Instagram') {
      return this.platformTabs.instagram;
    } else if (tab === 'X/Twitter') {
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
