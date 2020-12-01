import { Directive, HostBinding, Inject, Input, OnInit, OnDestroy } from '@angular/core';
import { Menu } from '../models/menu.model';
import { AccordionDirective } from './accordion.directive';

@Directive({
  selector: '[accordion-link]'
})
export class AccordionLinkDirective implements OnInit, OnDestroy {
  protected _selected: boolean = false;
  protected _nav: AccordionDirective;

  @Input()
  public group: any;

  @HostBinding('class.selected')
  @Input()
  get selected() {
    return this._selected;
  }

  @Input()
  public menuItem: Menu;

  constructor(
    @Inject(AccordionDirective) nav: AccordionDirective
  ) {
    this._nav = nav;
  }

  ngOnInit(): void {
    this._nav.addLink(this);
  }

  ngOnDestroy(): void {
    this._nav.removeGroup(this);
  }

  toggle(): void {
    if (!this.selected) {
      this.selected = true;
    }
  }

  set selected(value: boolean) {
    this._selected = value;

    if (value) {
      this._nav.closeOtherLinks(this);
    }
  }
}
