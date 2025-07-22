import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { PostModel } from './model/post.model';
import { GeneratePostModel } from './model/generate-post.model';
import { ImageModel } from './model/image.model';
import { ScheduleModel } from './model/schedule.model';
import { Platform } from './enum/platform.enum';
import { PostListModel } from './model/post-list.model';
import { PostPreviewModel } from './model/post-preview.model';

@Injectable({
  providedIn: 'root',
})
export class PostService {
  private basePath = '/post';

  constructor(private http: HttpClient) {}

  generatePost(generatePost: GeneratePostModel) {
    return this.http.post<PostModel>(
      `${this.basePath}/generate-post`,
      generatePost,
    );
  }

  savePost(post: PostModel) {
    return this.http.put<PostModel>(`${this.basePath}/save-post`, post);
  }

  savePostImages(postId: number, images: ImageModel[]) {
    return this.http.put<ImageModel[]>(
      `${this.basePath}/save-post-images/${postId}`,
      images,
    );
  }

  suggestImages(postId: number, pageSize: number) {
    return this.http.get<ImageModel[]>(
      `${this.basePath}/suggest-images/${postId}?page=${pageSize}`,
    );
  }

  getPlatforms(postId: number) {
    return this.http.get<Platform[]>(`${this.basePath}/platforms/${postId}`);
  }

  schedulePost(postId: number, schedule: ScheduleModel) {
    return this.http.post(`${this.basePath}/schedule/${postId}`, schedule);
  }

  getPostList() {
    return this.http.get<PostListModel[]>(`${this.basePath}/list`);
  }

  getPostPreview(postId: string) {
    return this.http.get<PostPreviewModel>(
      `${this.basePath}/${postId}/preview`,
    );
  }
}
