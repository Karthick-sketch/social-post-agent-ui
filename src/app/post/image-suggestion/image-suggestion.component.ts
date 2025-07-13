import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { PostModel } from '../model/post.model';
import { PostService } from '../post.service';

@Component({
  selector: 'app-image-suggestion',
  templateUrl: './image-suggestion.component.html',
  styleUrl: './image-suggestion.component.css',
  imports: [FormsModule],
})
export class ImageSuggestionComponent {
  @Input() post!: PostModel;

  @Output() back = new EventEmitter<void>();

  isProceeded = false;

  constructor(private postService: PostService) {}

  backToGeneratedPostPage() {
    this.back.emit();
  }

  savePost() {
    return;
  }

  proceed() {
    // this.saveAsDraft();
    this.isProceeded = true;
  }
}
