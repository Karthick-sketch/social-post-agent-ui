import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { PostModel } from './model/post.model';
import { GeneratePostModel } from './model/generate-post.model';

@Injectable({
  providedIn: 'root',
})
export class PostService {
  private baseUrl = 'http://localhost:8000';

  constructor(private http: HttpClient) {}

  generatePost(generatePost: GeneratePostModel) {
    return this.http.post<PostModel>(
      `${this.baseUrl}/generate-post`,
      generatePost
    );
  }

  savePost(post: PostModel) {
    return this.http.put<PostModel>(`${this.baseUrl}/save-post`, post);
  }
}
