import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { PostModel } from '../model/post.model';
import { PostService } from '../post.service';
import { ImageModel } from '../model/image.model';

@Component({
  selector: 'app-image-suggestion',
  templateUrl: './image-suggestion.component.html',
  styleUrl: './image-suggestion.component.css',
  imports: [FormsModule],
})
export class ImageSuggestionComponent implements OnInit {
  @Input() post!: PostModel;

  @Output() back = new EventEmitter<void>();

  isProceeded = false;
  pageSize = 5;
  images: ImageModel[] = [];

  constructor(private postService: PostService) {}

  ngOnInit() {
    this.suggestImages();
  }

  suggestImages() {
    this.postService
      .suggestImages(this.post.id_, this.pageSize)
      .subscribe((images) => (this.images = images));
  }

  toUrl(url: string) {
    return `url('${url}')`;
  }

  backToGeneratedPostPage() {
    this.back.emit();
  }

  savePostImages() {
    this.postService.savePostImages(this.post.id_, this.images).subscribe();
  }

  proceed() {
    this.savePostImages();
    this.isProceeded = true;
  }
}
