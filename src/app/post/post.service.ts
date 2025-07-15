import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { PostModel } from './model/post.model';
import { GeneratePostModel } from './model/generate-post.model';
import { ImageModel } from './model/image.model';
import { ScheduleModel } from './model/schedule.model';
import { Platform } from './enum/platform.enum';

@Injectable({
  providedIn: 'root',
})
export class PostService {
  private baseUrl = 'http://localhost:8000';

  constructor(private http: HttpClient) {}

  generatePost(generatePost: GeneratePostModel) {
    return this.http.post<PostModel>(
      `${this.baseUrl}/generate-post`,
      generatePost,
    );
  }

  savePost(post: PostModel) {
    return this.http.put<PostModel>(`${this.baseUrl}/save-post`, post);
  }

  savePostImages(post_id: number, images: ImageModel[]) {
    return this.http.put<ImageModel[]>(`${this.baseUrl}/save-post-images/${post_id}`, images);
  }

  suggestImages(post_id: number, pageSize: number) {
    return this.http.get<ImageModel[]>(
      `${this.baseUrl}/suggest-images/${post_id}?page=${pageSize}`,
    );
  }

  getPlatforms(post_id: number) {
    return this.http.get<Platform[]>(`${this.baseUrl}/platforms/${post_id}`);
  }

  schedulePost(post_id: number, schedule: ScheduleModel) {
    return this.http.post(`${this.baseUrl}/schedule/${post_id}`, schedule);
  }
}
