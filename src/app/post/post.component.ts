import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { GeneratePostModel } from './model/generate-post.model';
import { PostModel } from './model/post.model';
import { PostService } from './post.service';
import { Platform } from './enum/platform.enum';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrl: './post.component.css',
  imports: [FormsModule],
})
export class PostComponent {
  platform: Platform = Platform.LinkedIn;
  post = new PostModel();
  generatePostModel = new GeneratePostModel();

  platforms = [
    { value: 'linkedin', label: 'LinkedIn' },
    { value: 'instagram', label: 'Instagram' },
    { value: 'twitter', label: 'X/Twitter' },
  ];
  tones = [
    { value: 'professional', label: 'Professional' },
    { value: 'promotional', label: 'Promotional' },
    { value: 'informative', label: 'Informative' },
    { value: 'casual', label: 'Casual' },
    { value: 'friendly', label: 'Friendly' },
    { value: 'humorous', label: 'Humorous' },
    { value: 'witty', label: 'Witty' },
  ];

  constructor(private postService: PostService) {}

  generatePost() {
    this.generatePostModel.platforms = [this.platform];
    if (
      this.generatePostModel.brief &&
      this.generatePostModel.platforms.length &&
      this.generatePostModel.brand &&
      this.generatePostModel.tone
    ) {
      this.postService
        .generatePost(this.generatePostModel)
        .subscribe((postModel: PostModel) => {
          this.post = postModel;
        });
    } else {
      console.log(this.generatePostModel);
    }
  }
}
