import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { PostModel } from '../model/post.model';
import { PostService } from '../post.service';
import { Platform } from '../enum/platform.enum';
import { ImageSuggestionComponent } from '../image-suggestion/image-suggestion.component';

@Component({
  selector: 'app-post-form',
  templateUrl: './post-form.component.html',
  styleUrl: './post-form.component.css',
  imports: [FormsModule, ImageSuggestionComponent],
})
export class PostComponent implements OnInit {
  @Input() post!: PostModel;

  @Output() back = new EventEmitter<void>();

  isProceeded = false;
  tabs: string[] = [];
  platformTabs = {
    linkedin: false,
    instagram: false,
    twitter: false,
  };

  constructor(private postService: PostService) {}

  ngOnInit() {
    if (this.post.linkedin) {
      this.tabs.push('LinkedIn');
    }
    if (this.post.instagram) {
      this.tabs.push('Instagram');
    }
    if (this.post.twitter) {
      this.tabs.push('X/Twitter');
    }
    this.switchTab(this.tabs[0]);
  }

  switchTab(tab: string) {
    tab = tab.toLowerCase();
    this.platformTabs.linkedin = false;
    this.platformTabs.instagram = false;
    this.platformTabs.twitter = false;
    if (tab === Platform.LinkedIn) {
      this.platformTabs.linkedin = true;
    } else if (tab === Platform.Instagram) {
      this.platformTabs.instagram = true;
    } else if (tab === 'x/twitter') {
      this.platformTabs.twitter = true;
    }
  }

  isActive(tab: string) {
    tab = tab.toLowerCase();
    if (tab === Platform.LinkedIn) {
      return this.platformTabs.linkedin;
    } else if (tab === Platform.Instagram) {
      return this.platformTabs.instagram;
    } else if (tab === 'x/twitter') {
      return this.platformTabs.twitter;
    }
    return false;
  }

  backToGeneratePage() {
    this.back.emit();
  }

  backToGeneratedPostPage() {
    this.isProceeded = false;
  }

  savePost() {
    this.postService.savePost(this.post).subscribe();
  }

  proceed() {
    // this.saveAsDraft();
    this.isProceeded = true;
  }
}
