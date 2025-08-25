import { Status } from '../enum/status.enum';

export class PostListModel {
  id!: number;
  brief!: string;
  status!: Status;
  schedule!: string;
  platforms!: string[]
}
