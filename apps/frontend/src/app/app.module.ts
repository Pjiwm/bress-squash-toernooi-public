import { NgModule } from '@angular/core'
import { BrowserModule } from '@angular/platform-browser'
import { CommonModule } from '@angular/common'
import { AuthModule } from '@auth0/auth0-angular'
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http'
import { AuthHttpInterceptor } from '@auth0/auth0-angular'

import { NgbModule } from '@ng-bootstrap/ng-bootstrap'
import { FormsModule } from '@angular/forms'
import { AppComponent } from './app.component'
import { RouterModule } from '@angular/router'
import { AboutComponent } from './pages/about/about.component'
import { AppRoutingModule } from './app-routing.module'
import { NavComponent } from './shared/nav/nav.component'
import { TournamentListComponent } from './pages/tournament/tournament-list/tournament-list.component'
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome'
import { PlayerListComponent } from './pages/players/player-list/player-list.component'
import { BottomnavComponent } from './shared/bottomnav/bottomnav.component'
import { EmployeeListComponent } from './pages/employee/employee-list/employee-list.component'
import { SidenavComponent } from './shared/sidenav/sidenav.component'
const domain = 'https://bress-squash-toernooi.eu.auth0.com'
import { PouleListComponent } from './pages/poule/poule-list/poule-list.component'
import { PouleDetailComponent } from './pages/poule/poule-detail/poule-detail.component'
import { TournamentEditComponent } from './pages/tournament/tournament-edit/tournament-edit.component'
import { MatchDetailComponent } from './pages/match/match-detail/match-detail.component'
import { PlanningComponent } from './pages/planning/planning.component'
import { ServiceWorkerModule } from '@angular/service-worker'
import { environment } from '../environments/environment'
import { BracketListComponent } from './pages/bracket/bracket-list/bracket-list.component'
import { TournamentComponent } from './pages/tournament/tournament.component'


@NgModule({
	declarations: [
		AppComponent,
		AboutComponent,
		NavComponent,
		TournamentListComponent,
		EmployeeListComponent,
		PlayerListComponent,
		SidenavComponent,
		BottomnavComponent,
		PouleListComponent,
		PouleDetailComponent,
		TournamentEditComponent,
		TournamentComponent,
		MatchDetailComponent,
		PlanningComponent,
		BracketListComponent,
	],
	imports: [
		BrowserModule,
		AppRoutingModule,
		RouterModule,
		NgbModule,
		FormsModule,
		FontAwesomeModule,
		CommonModule,
		HttpClientModule,
		ServiceWorkerModule.register('ngsw-worker.js', { 
			enabled: environment.production,
			registrationStrategy: 'registerWhenStable:30000'
		}),
		AuthModule.forRoot({
			domain: domain,
			clientId: 'ARwW2jWiJTqMjoJ9TeaoX1FKGfcQLzoW',
			// Request this audience at user authentication time
			audience: `${domain}/api/v2/`,

			// Request this scope at user authentication time
			scope: 'read:current_user',

			// Specify configuration for the interceptor
			httpInterceptor: {
				allowedList: [
					{
						// Match any request that starts 'https://YOUR_DOMAIN/api/v2/' (note the asterisk)
						uri: `${domain}/api/v2/*`,
						tokenOptions: {
							// The attached token should target this audience
							audience: `${domain}/api/v2/`,

							// The attached token should have these scopes
							scope: 'read:current_user',
						},
					},
				],
			},
		}),
		ServiceWorkerModule.register('ngsw-worker.js', {
			enabled: environment.production,
			// Register the ServiceWorker as soon as the app is stable
			// or after 30 seconds (whichever comes first).
			registrationStrategy: 'registerWhenStable:30000'
		}),
	],
	providers: [
		{ provide: HTTP_INTERCEPTORS, useClass: AuthHttpInterceptor, multi: true },
	],
	bootstrap: [AppComponent],
})
export class AppModule {}
