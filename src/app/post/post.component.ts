import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { GeneratePostFormComponent } from './generate-post-form/generate-post-form.component';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrl: './post.component.css',
  imports: [FormsModule, GeneratePostFormComponent],
})
export class PostComponent {
  constructor() {}
}
