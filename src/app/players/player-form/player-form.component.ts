import {Component,inject,  OnInit} from '@angular/core';
import {FlexModule} from "@angular/flex-layout";
import {MatButton} from "@angular/material/button";
import {MatCard, MatCardContent, MatCardHeader, MatCardTitle} from "@angular/material/card";
import {MatFormField, MatLabel} from "@angular/material/form-field";
import {MatInput} from "@angular/material/input";
import {MatOption} from "@angular/material/autocomplete";
import {MatSelect} from "@angular/material/select";
import {FormGroup, ReactiveFormsModule} from "@angular/forms";
import {ActivatedRoute, Router} from "@angular/router";
import {MatDialog} from "@angular/material/dialog";
import {NgForOf, NgIf} from "@angular/common";
import {PlayersFacadeService} from "../players-facade.service";
import {TeamDto} from "../../teams/model";
import {AlertDialogComponent} from "../../alert-dialog/alert-dialog.component";
import {PlayerDto} from "../model";
import {TeamsFacadeService} from "../../teams/teams-facade.service";
import {GroupDto} from "../../group/model";
import {GroupFacadeService} from "../../group/group-facade.service";

@Component({
  selector: 'app-player-form',
  standalone: true,
  imports: [
    FlexModule,
    MatButton,
    MatCard,
    MatCardContent,
    MatCardHeader,
    MatCardTitle,
    MatFormField,
    MatInput,
    MatLabel,
    MatOption,
    MatSelect,
    ReactiveFormsModule,
    NgIf,
    NgForOf
  ],
  templateUrl: './player-form.component.html',
  styleUrl: './player-form.component.css'
})

export class PlayerFormComponent implements OnInit {
  player: PlayerDto | undefined;
  route: ActivatedRoute = inject(ActivatedRoute);
  playerForm!: FormGroup;
  playerId!: string ;
  teamId!: string  ;
  groupId!: string ;
  teams :TeamDto[]=[]
  groups :GroupDto[]=[]

  constructor(
    private playerFacade: PlayersFacadeService,
    private teamsFacade: TeamsFacadeService,
    private groupFacade: GroupFacadeService,
    private router: Router,
    public dialog: MatDialog
  ) {}

  ngOnInit() {
    this.playerId = this.route.snapshot.params['idPlayer'];
    this.teamId = String(this.route.snapshot.params['idTeam']);
    this.groupId = this.route.snapshot.params['idGroup'];
    this.playerForm = this.playerFacade.playerForm();

    this.groupFacade.getGroups().subscribe({
      next: (response) => {
        this.groups = response
        this.loadTeams(this.groupId);
        //this.setDefaultFormValues();
      },
      error: (error) => {
      }
    });

    if(this.playerId){
      this.playerFacade.getPlayer(this.playerId).subscribe({
        next: (response) => {
          this.player = response
          this.playerForm=this.playerFacade.playerForm(response )
        },
        error: (error) => {
          console.log("responseerrorplayers" , error)
        }
      });
    }
  }
  onGroupSelectionChange(event: { value: any; }) {
    const groupId = event.value;
    this.loadTeams(groupId);
  }


  loadTeams(groupId: string) {
    this.teamsFacade.getTeams(groupId).subscribe({
      next: (response) => {
        this.teams = response;
        this.setDefaultFormValues();
      },
      error: (error) => {
      }
    });
  }
  setDefaultFormValues() {
    console.log("Setting default values for group:", this.groupId, "and team:", this.teamId);
    this.playerForm.patchValue({
      group: this.groupId,
      team: this.teamId
    });
  }


  onSubmit(){
    console.log("player" ,this.playerForm.value )
    if (this.playerForm.valid) {
      const player = this.playerForm.value

      this.playerFacade.addPlayer(player).subscribe({
          next: (response:PlayerDto) => {
            this.router.navigate([`/home/group/${this.groupId}/team/` , this.teamId]);
          },
          error: (error: any) => {
            this.dialog.open(AlertDialogComponent, {
              data: { message: "l'\ajout de team est échoué" }
            });
          }
        }
      );
    }else {
      this.dialog.open(AlertDialogComponent, {
        data: { message: 'Le formulaire contient des erreurs.' }
      });
    }
  }
  onEdit(){
    if (this.playerForm.valid) {
      const player = this.playerForm.value

      this.playerFacade.editPlayer(player, this.playerId).subscribe({
          next: (response:PlayerDto) => {
            this.router.navigate([`/home/group/${this.groupId}/team/` , this.teamId]);
          },
          error: (error: any) => {
            this.dialog.open(AlertDialogComponent, {
              data: { message: "Modification de team est échoué" }
            });
          }
        }
      );
    }else {
      this.dialog.open(AlertDialogComponent, {
        data: { message: 'Le formulaire contient des erreurs.' }
      });
    }
  }

}
