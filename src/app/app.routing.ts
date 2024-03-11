import {RouterModule, Routes} from '@angular/router';
import { LoginComponent } from './auth/login/login.component';
import {HomeComponent} from "./home/home.component";
import {NgModule} from "@angular/core";
import {TeamsComponent} from "./teams/teams/teams.component";
import {PlayersComponent} from "./players/players/players.component";
import {RegisterComponent} from "./auth/register/register.component";
import {PageErrorComponent} from "./page-error/page-error.component";
import {TeamFormComponent} from "./teams/team-form/team-form.component";
import {PlayerFormComponent} from "./players/player-form/player-form.component";
import {GroupFormComponent} from "./group/group-form/group-form.component";
import {AuthGuard} from "./auth/auth/auth.guard";
import {ProfileComponent} from "./profile/profile/profile.component";
import {UserFormComponent} from "./profile/user-form/user-form.component";
import {PasswordFormComponent} from "./profile/password-form/password-form.component";

export const routes: Routes = [
  { path: '', component: LoginComponent},
  { path: 'home', component: HomeComponent,canActivate: [AuthGuard] },
  { path: 'home/profile', component: ProfileComponent,canActivate: [AuthGuard] },
  { path: 'home/profile/editUser', component: UserFormComponent,canActivate: [AuthGuard] },
  { path: 'home/profile/editPassword', component: PasswordFormComponent,canActivate: [AuthGuard] },
  { path: 'home/group-form', component: GroupFormComponent, canActivate: [AuthGuard]},
  { path: 'home/group/:idGroup/edit-group', component: GroupFormComponent,canActivate: [AuthGuard] },
  { path: 'register', component: RegisterComponent},
  { path: 'home/group/:idGroup', component: TeamsComponent,canActivate: [AuthGuard] },
  { path: 'home/group/:idGroup/team/:idTeam/newPlayer', component: PlayerFormComponent,canActivate: [AuthGuard] },
  { path: 'home/group/:idGroup/team/:idTeam/player/:idPlayer/editPlayer', component: PlayerFormComponent,canActivate: [AuthGuard] },
  { path: 'home/group/:idGroup/newTeam', component: TeamFormComponent,canActivate: [AuthGuard] },
  { path: 'home/group/:idGroup/team/:idTeam/editTeam', component: TeamFormComponent,canActivate: [AuthGuard] },
  { path: 'home/group/:idGroup/team/:idTeam', component: PlayersComponent,canActivate: [AuthGuard] },
  { path: 'not-found', component: PageErrorComponent },
  { path: '**', component: PageErrorComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
