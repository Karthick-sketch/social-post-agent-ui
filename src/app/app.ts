import { Component } from '@angular/core';
import { HeaderComponent } from './post/header/header.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.html',
  styleUrl: './app.css',
  imports: [HeaderComponent],
})
export class App {}
