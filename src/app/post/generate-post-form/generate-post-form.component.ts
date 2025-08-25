import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { GeneratePostModel } from '../model/generate-post.model';
import { PostModel } from '../model/post.model';
import { PostService } from '../post.service';
import {
  IDropdownSettings,
  NgMultiSelectDropDownModule,
} from 'ng-multiselect-dropdown';

type Dropdown = {
  label: string;
  value: string;
};

@Component({
  selector: 'app-generate-post-form',
  templateUrl: './generate-post-form.component.html',
  styleUrl: './generate-post-form.component.css',
  imports: [FormsModule, NgMultiSelectDropDownModule],
})
export class GeneratePostFormComponent implements OnInit {
  post = new PostModel();
  generatePostModel = new GeneratePostModel();

  platforms: Dropdown[] = [];
  selectedPlatforms: Dropdown[] = [];

  tone = 'professional';
  tones = [
    'professional',
    'promotional',
    'informative',
    'casual',
    'friendly',
    'humorous',
    'witty',
  ];

  dropdownSettings: IDropdownSettings = {
    singleSelection: false,
    idField: 'value',
    textField: 'label',
    enableCheckAll: false,
    allowSearchFilter: true,
  };

  constructor(
    private router: Router,
    private postService: PostService,
  ) {}

  ngOnInit() {
    this.postService.getSocialAccounts().subscribe((accounts) => {
      this.platforms = accounts.map(account => {
        return { 'label': account, 'value': account}
      });
    });
  }

  generatePost() {
    this.generatePostModel.platforms = this.selectedPlatforms.map(
      (platform) => platform.value,
    );
    this.generatePostModel.tone = this.tone;
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
          this.router.navigate(['/post-form/' + postModel.id]);
        });
    } else {
      console.log(this.generatePostModel);
    }
  }
}
