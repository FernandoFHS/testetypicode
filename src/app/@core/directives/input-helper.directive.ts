import { Directive, ElementRef, HostListener, Input, Renderer2 } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { InputHelperComponent } from '../components/input-helper/input-helper.component';

@Directive({
  selector: '[input-helper]'
})
export class InputHelperDirective {

  @Input('input-helper-text') text: string;

  @Input('input-helper-messages') messages: string[] = [];

  constructor(
    private _renderer: Renderer2,
    private _hostElement: ElementRef,
    private _dialog: MatDialog
  ) {
    _renderer.addClass(_hostElement.nativeElement, 'input-helper');
  }

  @HostListener('click') onMouseEnter() {
    const dialog = this._dialog.open(InputHelperComponent, {
      disableClose: true,
      autoFocus: true,
      width: '400px',
      data: {
        title: this.text,
        messages: this.messages
      }
    });

    dialog.afterClosed().subscribe(() => {

    });
  }

}
