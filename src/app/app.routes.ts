import { Routes } from '@angular/router';
import { PostListComponent } from './post/post-list/post-list.component';
import { PostComponent } from './post/post.component';
import { PostPreviewComponent } from './post/post-preview/post-preview.component';
import { PostFormComponent } from './post/post-form/post-form.component';

export const routes: Routes = [
  {
    path: '',
    component: PostListComponent,
  },
  {
    path: 'post/:id',
    component: PostPreviewComponent,
  },
  {
    path: 'post-form',
    component: PostComponent,
  },
  {
    path: 'post-form/:id',
    component: PostFormComponent,
  }
];
