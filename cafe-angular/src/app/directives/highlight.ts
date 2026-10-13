import { Directive, ElementRef, inject, input } from '@angular/core';

/**
 * Custom attribute directive: highlights the host element's border while hovered.
 * Usage: <div appHighlight="#ff623d">...</div>
 */
@Directive({
  selector: '[appHighlight]',
  host: {
    '(mouseenter)': 'setBorder(appHighlight() || defaultColor)',
    '(mouseleave)': 'setBorder("")',
  },
})
export class Highlight {
  readonly appHighlight = input('');
  protected readonly defaultColor = '#ff623d';
  private readonly el = inject(ElementRef<HTMLElement>);

  protected setBorder(color: string): void {
    this.el.nativeElement.style.borderColor = color;
    this.el.nativeElement.style.transform = color ? 'translateY(-4px)' : '';
  }
}
