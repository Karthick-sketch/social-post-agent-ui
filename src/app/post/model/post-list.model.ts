import { Platform } from '../enum/platform.enum';
import { Status } from '../enum/status.enum';

export class PostListModel {
  id_!: number;
  brief!: string;
  status!: Status;
  scheduledDate!: string;
  platforms!: Platform[]
}
