import { PostModel } from './post.model';
import { ImageModel } from './image.model';
import { Platform } from '../enum/platform.enum';

export class PostPreviewModel {
  id_!: number;
  post!: PostModel;
  images!: ImageModel[];
  schedule!: string;
  platforms!: Platform[]
}
