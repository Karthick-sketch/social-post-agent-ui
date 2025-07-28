import { Component } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  imports: [RouterOutlet],
})
export class HeaderComponent {
  constructor(private router: Router) {}

  openPostForm() {
    this.router.navigate(['/post-form']);
  }
}
