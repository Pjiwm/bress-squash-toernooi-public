import { Component, OnInit } from '@angular/core'
import { Router } from '@angular/router'
import { AuthService } from '@auth0/auth0-angular'
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons'

@Component({
	selector: 'bress-squash-toernooi-nav',
	templateUrl: './nav.component.html',
	styleUrls: ['./nav.component.scss']
})
export class NavComponent implements OnInit {
	faArrowLeft = faArrowLeft
	isLoggedIn = false
	constructor(public auth: AuthService, public _router: Router) { }

	async ngOnInit(): Promise<void> {
		this.auth.isAuthenticated$.subscribe((isLoggedIn) => {
			this.isLoggedIn = isLoggedIn
			if (isLoggedIn) {
				this.auth.getAccessTokenSilently().subscribe((token) => {
					localStorage.setItem('ACCESS_TOKEN', token)
				})
			}
		})
	}

	async onLogin() {
		this.auth.loginWithRedirect()
	}

	onLogout() {
		this.auth.logout()
		localStorage.removeItem('ACCESS_TOKEN')
	}

}
