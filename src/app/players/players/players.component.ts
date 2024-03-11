import {Component, HostListener, inject, OnInit} from '@angular/core';
import {ActivatedRoute, Router, RouterLink} from "@angular/router";
import {GroupService} from "../../teams/group.service";
import {TeamsService} from "../../teams/teams.service";
import { Team} from "../../teams/group";
import { PlayersService} from "../../players/players.service";
import {NgForOf} from "@angular/common";
import { Location } from '@angular/common';
import {MatIcon} from "@angular/material/icon";
import {MatFabButton, MatIconButton} from "@angular/material/button";
import {
  MatCell, MatCellDef,
  MatColumnDef,
  MatHeaderCell, MatHeaderCellDef,
  MatHeaderRow, MatHeaderRowDef,
  MatRow, MatRowDef,
  MatTable,
  MatTableDataSource
} from "@angular/material/table";
import {PlayerFormComponent} from "../player-form/player-form.component";
import {TeamsFacadeService} from "../../teams/teams-facade.service";
import {PlayersFacadeService} from "../players-facade.service";
import {AlertDialogComponent} from "../../alert-dialog/alert-dialog.component";
import {TeamDto} from "../../teams/model";
import {Dialog} from "@angular/cdk/dialog";
import {PlayerDto} from "../model";


@Component({
  selector: 'app-team-details',
  standalone: true,
  imports: [
    NgForOf,
    MatIcon,
    MatIconButton,
    MatTable,
    MatHeaderCell,
    MatCell,
    MatColumnDef,
    MatHeaderRow,
    MatRow,
    MatHeaderCellDef,
    MatCellDef,
    MatRowDef,
    MatHeaderRowDef,
    MatFabButton,
    PlayerFormComponent,
    RouterLink
  ],
  templateUrl: './players.component.html',
  styleUrl: './players.component.css'
})
export class PlayersComponent implements  OnInit{

  displayedColumns: string[] = ['name', 'poste', 'clubName', 'icon'];
  players: PlayerDto[] =[];
  team: TeamDto | undefined;
  teamId: string ;
  groupId: string ;

  teamsService = inject(TeamsService);




  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private playersFacade: PlayersFacadeService,
    private dialog :Dialog,
    private playersService : PlayersService
  ) {
    this.teamId = String(this.route.snapshot.params['idTeam']);
    this.groupId = String(this.route.snapshot.params['idGroup']);

    console.log("teamid" ,this.teamId)


  }
  ngOnInit() {
    this.loadTeam();
    this.loadPlayers();
  }
  private loadTeam() {
    this.playersFacade.getTeam(this.teamId).subscribe({
      next: (team) => {
        this.team = team;
        // @ts-ignore
        if (team === null) {
          this.router.navigate(['/not-found']);
        }
      },
      error: (error) => {
        console.error('Error fetching teams:', error);
        this.dialog.open(AlertDialogComponent, {
          data: { message: error }
        });
      }
    });
  }
  private loadPlayers() {

    this.playersFacade.getPlayers(this.teamId).subscribe({
      next: (players) => {
        console.log(players)
        this.players = players;
      },
      error: (error) => {
        console.error('Error fetching Players:', error);
        this.dialog.open(AlertDialogComponent, {
          data: { message: error }
        });      }
    });
  }
  goBack() {
    this.router.navigateByUrl(`/home/group/${this.groupId}`)
  }
  onDelete(playerId :string) {
    this.playersFacade.deletePlayer(playerId).subscribe({
      next: (response) => {
        this.players = this.players.filter(player => player._id !== playerId);
      },
      error: (error) => {
        console.error('Erreur lors de la suppression de l’équipe', error);
      }
    });
  }
}
