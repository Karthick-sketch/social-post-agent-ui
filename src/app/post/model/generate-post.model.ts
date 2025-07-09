import { Platform } from '../enum/platform.enum';

export class GeneratePostModel {
  brief!: string;
  brand!: string;
  tone!: string;
  platforms!: Platform[];

  constructor() {
    this.platforms = [];
    this.brief = 'Introduced Dark mode';
    this.brand = 'Kalories';
    this.tone = 'Professional';
  }
}
