import { PostModel } from './post.model';
import { ImageModel } from './image.model';

export class PostPreviewModel {
  id!: number;
  post!: PostModel;
  images!: ImageModel[];
  schedule!: string;
  platforms!: string[]
}
