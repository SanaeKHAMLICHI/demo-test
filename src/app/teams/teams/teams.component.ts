import {Component, inject, Input, OnInit} from '@angular/core';
import {Article} from "../../home/article";
import {ArticleService} from "../../home/article.service";
import {Team} from "../group";
import {GroupService} from "../group.service";
import {
  MatCard,
  MatCardContent,
  MatCardHeader,
  MatCardImage,
  MatCardSubtitle,
  MatCardTitle
} from "@angular/material/card";
import {FlexModule} from "@angular/flex-layout";
import {Location, NgForOf} from "@angular/common";
import {ActivatedRoute, Router, RouterLink} from "@angular/router";
import {TeamsService} from "../teams.service";
import {MatIcon} from "@angular/material/icon";
import {MatFabButton, MatIconButton} from "@angular/material/button";
import {
  MatCell,
  MatCellDef,
  MatColumnDef,
  MatHeaderCell, MatHeaderCellDef,
  MatHeaderRow,
  MatHeaderRowDef,
  MatRow, MatRowDef, MatTable
} from "@angular/material/table";
import {GroupDto} from "../../group/model";
import {TeamDto} from "../model";
import {TeamsFacadeService} from "../teams-facade.service";
import {AlertDialogComponent} from "../../alert-dialog/alert-dialog.component";
import {Dialog} from "@angular/cdk/dialog";

@Component({
  selector: 'app-groupe',
  standalone: true,
  imports: [
    MatCard,
    MatCardContent,
    MatCardImage,
    FlexModule,
    MatCardTitle,
    MatCardSubtitle,
    NgForOf,
    MatCardHeader,
    RouterLink,
    MatIcon,
    MatIconButton,
    MatCell,
    MatCellDef,
    MatColumnDef,
    MatHeaderCell,
    MatHeaderRow,
    MatHeaderRowDef,
    MatRow,
    MatRowDef,
    MatTable,
    MatHeaderCellDef,
    MatFabButton
  ],
  templateUrl: './teams.component.html',
  styleUrl: './teams.component.css'
})

export class TeamsComponent implements OnInit {
  displayedColumns: string[] = ['name', 'flagUrl' ,'icon'];
  groupId: string;
  group : GroupDto | undefined;
  teams: TeamDto[] = [];

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private teamsFacade: TeamsFacadeService,
    private dialog :Dialog
  ) {
    this.groupId = this.route.snapshot.params['idGroup'];
  }

  ngOnInit() {
    this.loadGroups();
    this.loadTeams();
  }

  private loadGroups() {
     this.teamsFacade.getGroupById(this.groupId).subscribe({
      next: (group) => {
        this.group = group;
        // @ts-ignore
        if (group === null) {
          this.router.navigate(['/not-found']);
        }
      },
      error: (error) => {
        this.dialog.open(AlertDialogComponent, {
          data: { message: error }
        });
      }
    });
  }

  private loadTeams() {
     this.teamsFacade.getTeams(this.groupId).subscribe({
      next: (teams) => {
        this.teams = teams;
      },
      error: (error) => {
        this.dialog.open(AlertDialogComponent, {
          data: { message: error }
        });      }
    });
  }
  goBack() {
    this.router.navigateByUrl(`/home`)
  }
  onDelete(teamId :string) {
      this.teamsFacade.deleteTeam(teamId).subscribe({
        next: (response) => {
          this.teams = this.teams.filter(team => team._id !== teamId);
        },
        error: (error) => {
          console.error('Erreur lors de la suppression de l’équipe', error);
        }
      });
  }

}
