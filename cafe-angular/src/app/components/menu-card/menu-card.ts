import { Component, input, output } from '@angular/core';
import { CurrencyPipe, NgClass, NgStyle } from '@angular/common';
import { RouterLink } from '@angular/router';
import { MenuItem } from '../../models/menu-item';
import { Highlight } from '../../directives/highlight';

@Component({
  selector: 'app-menu-card',
  imports: [NgClass, NgStyle, CurrencyPipe, RouterLink, Highlight],
  templateUrl: './menu-card.html',
  styleUrl: './menu-card.css',
})
export class MenuCard {
  readonly item = input.required<MenuItem>();

  // Event sent up to the parent when "Add" is clicked
  readonly add = output<MenuItem>();

  protected ratingColor(rating: number): string {
    return rating >= 4.7 ? '#4caf50' : rating >= 4.4 ? '#ffc107' : '#ff9800';
  }
}
