import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { PostModel } from '../model/post.model';
import { PostService } from '../post.service';
import { ScheduleModel } from '../model/schedule.model';
import { Platform } from '../enum/platform.enum';

@Component({
  selector: 'app-schedule-post',
  templateUrl: './schedule-post.component.html',
  styleUrl: './schedule-post.component.css',
  imports: [FormsModule],
})
export class SchedulePostComponent implements OnInit {
  @Input() post!: PostModel;

  @Output() back = new EventEmitter<void>();

  schedule = new ScheduleModel();
  platforms: Platform[] = [];

  constructor(private postService: PostService) {}

  ngOnInit() {
    this.postService
      .getPlatforms(this.post.id_)
      .subscribe((platforms) => (this.platforms = platforms));
  }

  toPlatformString() {
    return this.platforms
      .map((platform) =>
        platform === Platform.TWITTER ? 'X/Twitter' : platform,
      )
      .join(', ');
  }

  backToImagesSuggestPage() {
    this.back.emit();
  }

  preview() {
    return;
  }

  postNow() {
    return;
  }

  schedulePost() {
    this.postService.schedulePost(this.post.id_, this.schedule).subscribe();
  }
}
