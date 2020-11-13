import { Component, ViewEncapsulation } from '@angular/core';
import { StorageService } from 'src/app/@core/services/storage.service';
import { AuthService } from 'src/app/services/auth.service';

@Component({
	selector: 'core-container-header',
	templateUrl: './header.component.html',
	styleUrls: ['./header.component.scss'],
	encapsulation: ViewEncapsulation.None
})
export class ContainerHeaderComponent {

	constructor(
		private _authService: AuthService
	) { }

	logout(): void {
		this._authService.logout();
	}

}
