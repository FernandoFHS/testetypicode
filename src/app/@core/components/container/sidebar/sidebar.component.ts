import { ChangeDetectorRef, Component, OnDestroy } from '@angular/core';
import { MediaMatcher } from '@angular/cdk/layout';
import { menuItems } from 'src/app/@core/consts/menu-items';

@Component({
  selector: 'app-container-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: []
})
export class ContainerSidebarComponent implements OnDestroy {
  mobileQuery: MediaQueryList;
  menuList = menuItems;

  private _mobileQueryListener: () => void;

  constructor(
    private _changeDetectorRef: ChangeDetectorRef,
    private _media: MediaMatcher
  ) {
    this.mobileQuery = _media.matchMedia('(min-width: 768px)');
    this._mobileQueryListener = () => _changeDetectorRef.detectChanges();
    this.mobileQuery.addListener(this._mobileQueryListener);
  }

  ngOnDestroy(): void {
    this.mobileQuery.removeListener(this._mobileQueryListener);
  }
}
