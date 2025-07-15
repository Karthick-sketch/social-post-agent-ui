import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { GeneratePostModel } from '../model/generate-post.model';
import { PostModel } from '../model/post.model';
import { PostService } from '../post.service';
import { Platform } from '../enum/platform.enum';
import { PostComponent } from '../post-form/post-form.component';

@Component({
  selector: 'app-generate-post-form',
  templateUrl: './generate-post-form.component.html',
  styleUrl: './generate-post-form.component.css',
  imports: [FormsModule, PostComponent],
})
export class GeneratePostFormComponent {
  postGenerated = false;
  platform: Platform = Platform.LINKEDIN;
  post = new PostModel();
  generatePostModel = new GeneratePostModel();

  platforms = [
    { value: 'LinkedIn', label: 'LinkedIn' },
    { value: 'Instagram', label: 'Instagram' },
    { value: 'Twitter', label: 'X/Twitter' },
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
          this.postGenerated = true;
        });
    } else {
      console.log(this.generatePostModel);
    }
  }

  backToGeneratePost() {
    this.postGenerated = false;
  }
}
