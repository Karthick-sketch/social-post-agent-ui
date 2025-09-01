import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { PostModel } from './model/post.model';
import { GeneratePostModel } from './model/generate-post.model';
import { ImageModel } from './model/image.model';
import { ScheduleModel } from './model/schedule.model';
import { PostListModel } from './model/post-list.model';
import { PostPreviewModel } from './model/post-preview.model';
import { ImageSearchQueryModel } from './model/image-search-query.model';

@Injectable({
  providedIn: 'root',
})
export class PostService {
  private basePath = '/post';

  constructor(private http: HttpClient) {}

  getSocialAccounts() {
    return this.http.get<string[]>(`${this.basePath}/accounts`);
  }

  generatePost(generatePost: GeneratePostModel) {
    return this.http.post<PostModel>(`${this.basePath}/generate`, generatePost);
  }

  getPost(postId: string) {
    return this.http.get<PostModel>(`${this.basePath}/${postId}`);
  }

  savePost(post: PostModel) {
    return this.http.put<PostModel>(`${this.basePath}/save`, post);
  }

  savePostImages(postId: string, images: ImageModel[]) {
    return this.http.put<ImageModel[]>(
      `${this.basePath}/${postId}/save-post-images`,
      images,
    );
  }

  suggestImagesPrompt(postId: string) {
    return this.http.get<ImageSearchQueryModel>(
      `${this.basePath}/${postId}/suggest-images-query`,
    );
  }

  suggestImages(
    postId: string,
    query: string,
    pageSize: number,
    perPage: number,
  ) {
    query = query.trim().replaceAll(' ', '%20');
    return this.http.get<ImageModel[]>(
      `${this.basePath}/${postId}/suggest-images?query=${query}&page=${pageSize}&perPage=${perPage}`,
    );
  }

  getPlatforms(postId: string) {
    return this.http.get<string[]>(`${this.basePath}/${postId}/platforms`);
  }

  getSchedule(postId: string) {
    return this.http.get<ScheduleModel>(`${this.basePath}/${postId}/schedule`);
  }

  schedulePost(postId: string, schedule: ScheduleModel) {
    return this.http.post(`${this.basePath}/${postId}/schedule`, schedule);
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
