import { Component, input } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.html',
  styleUrl: './header.css',
})
export class Header {
  // Values passed in from the parent component
  readonly title = input.required<string>();
  readonly tagline = input('');
  readonly cartCount = input(0);

  protected readonly logo = 'logo.png';
}
