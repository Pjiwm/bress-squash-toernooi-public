import { NgModule } from '@angular/core'
import { RouterModule, Routes } from '@angular/router'
import { AboutComponent } from './pages/about/about.component'
import { EmployeeListComponent } from './pages/employee/employee-list/employee-list.component'
import { TournamentListComponent } from './pages/tournament/tournament-list/tournament-list.component'
import { PlayerListComponent } from './pages/players/player-list/player-list.component'
import { PouleDetailComponent } from './pages/poule/poule-detail/poule-detail.component'
import { PouleListComponent } from './pages/poule/poule-list/poule-list.component'
import { TournamentEditComponent } from './pages/tournament/tournament-edit/tournament-edit.component'
import { MatchDetailComponent } from './pages/match/match-detail/match-detail.component'
import { PlanningComponent } from './pages/planning/planning.component'
import { BracketListComponent } from './pages/bracket/bracket-list/bracket-list.component'
import { TournamentComponent } from './pages/tournament/tournament.component'


const routes: Routes = [
	{ path: '', pathMatch: 'full', component: TournamentListComponent },

	{ path: 'tournament/new', component: TournamentEditComponent },

	{ path: 'tournament/:id', component: TournamentComponent,
		children: [
			{ path: 'edit', component: TournamentEditComponent},
			{ path: 'playerlist', component: PlayerListComponent},
			{ path: 'planning', component: PlanningComponent},
			{ path: 'poule', component: PouleListComponent,
				children: [{ path: ':pouleId', component: PouleDetailComponent }],
			},
			{ path: 'bracket', component: BracketListComponent },
		],
	},
  	{ path: 'tournament/:id/poule/:pouleId/match/:matchId', component: MatchDetailComponent},
	{ path: 'about', pathMatch: 'full', component: AboutComponent },
	{ path: 'employees', pathMatch: 'full', component: EmployeeListComponent },
	{ path: 'tournament/:id/bracket', component: BracketListComponent },
	{ path: '**', redirectTo: '/' },
]

@NgModule({
	imports: [RouterModule.forRoot(routes)],
	exports: [RouterModule],
})
export class AppRoutingModule {}
