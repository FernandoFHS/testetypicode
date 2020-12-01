import { Directive, AfterContentChecked } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { AccordionLinkDirective } from './accordion-link.directive';
import { filter } from 'rxjs/operators';

@Directive({
  selector: '[accordion]'
})
export class AccordionDirective implements AfterContentChecked {
  protected _navlinks: Array<AccordionLinkDirective> = [];

  constructor(
    private _router: Router
  ) {
    setTimeout(() => this.checkOpenLinks());
  }

  closeOtherLinks(selectedLink: AccordionLinkDirective): void {
    this._navlinks.forEach((link: AccordionLinkDirective) => {
      if (link !== selectedLink) {
        link.selected = false;
        link.menuItem.open = false;
      }
    });
  }

  addLink(link: AccordionLinkDirective): void {
    this._navlinks.push(link);
  }

  removeGroup(link: AccordionLinkDirective): void {
    const index = this._navlinks.indexOf(link);
    if (index !== -1) {
      this._navlinks.splice(index, 1);
    }
  }

  checkOpenLinks(): void {
    this._navlinks.forEach((link: AccordionLinkDirective) => {
      if (link.group) {
        const routeUrl = this._router.url;
        const currentUrl: string[] = routeUrl.split('/');
        const groupUrl: string[] = link.group.split('/');

        const urlFounds = groupUrl.filter(g => currentUrl.includes(g));

        if (urlFounds.length == groupUrl.length) {
          link.selected = true;
          link.menuItem.open = true;
          this.closeOtherLinks(link);
        }
      }
    });
  }

  ngAfterContentChecked(): void {
    this._router.events
      .pipe(filter(event => event instanceof NavigationEnd))
      .subscribe(e => this.checkOpenLinks());
  }
}
