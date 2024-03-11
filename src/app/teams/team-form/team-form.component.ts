import {Component, EventEmitter, inject, Input, OnChanges, OnInit, Output, SimpleChanges} from '@angular/core';
import {FlexModule} from "@angular/flex-layout";
import {MatButton} from "@angular/material/button";
import {MatCard, MatCardContent, MatCardHeader, MatCardTitle} from "@angular/material/card";
import {MatFormField, MatLabel} from "@angular/material/form-field";
import {MatInput} from "@angular/material/input";
import {MatOption} from "@angular/material/autocomplete";
import {MatSelect} from "@angular/material/select";
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {Team} from "../group";
import {TeamsService} from "../teams.service";
import {ActivatedRoute, Router} from "@angular/router";
import {MatDialog} from "@angular/material/dialog";
import {Player, PlayersService} from "../../players/players/players.service";
import {NgForOf, NgIf} from "@angular/common";
import {AlertDialogComponent} from "../../alert-dialog/alert-dialog.component";
import {Observable} from "rxjs";
import {TeamDto} from "../model";
import {TeamsFacadeService} from "../teams-facade.service";
import {GroupDto} from "../../group/model";
import {GroupFacadeService} from "../../group/group-facade.service";


@Component({
  selector: 'app-team-form',
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
        ReactiveFormsModule,
        MatOption,
        MatSelect,
        NgForOf
    ],
  templateUrl: './team-form.component.html',
  styleUrl: './team-form.component.css'
})
export class TeamFormComponent implements OnInit{
  teamForm!: FormGroup ;
  team : TeamDto | undefined;
  route: ActivatedRoute = inject(ActivatedRoute);
  teamId: string | undefined ;
  groupId: string | undefined ;
  groups :GroupDto[]=[]


  constructor(
  private teamFacade: TeamsFacadeService,
  private router: Router,
  public dialog: MatDialog,
  private groupFacade: GroupFacadeService,
  ) {
  }

  ngOnInit(){
    this.teamId = String(this.route.snapshot.params['idTeam']);
    this.groupId = String(this.route.snapshot.params['idGroup']);
    this.teamForm = this.teamFacade.teamForm();


    if(this.teamId) {
      this.teamFacade.getTeam(this.teamId).subscribe({
        next: (response) => {
          this.team = response
          this.teamForm = this.teamFacade.teamForm(response)
        },
        error: (error) => {
        }
      });
    }
    this.groupFacade.getGroups().subscribe({
      next: (response) => {
        this.groups = response
        this.setDefaultFormValues();
      },
      error: (error) => {
      }
    });

  }
  setDefaultFormValues() {
    console.log("Setting default values for group:", this.groupId);
    this.teamForm.patchValue({
      group: this.groupId,
    });
  }
  onSubmit(){
    if (this.teamForm.valid) {
      const team = this.teamForm.value

      this.teamFacade.addTeam(team).subscribe({
          next: (response:TeamDto) => {
            this.router.navigate(['/home/group/' , this.groupId]);
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
    if (this.teamForm.valid) {
      const team = this.teamForm.value

      this.teamFacade.editTeam(team, this.teamId).subscribe({
          next: (response:TeamDto) => {
            this.router.navigate(['/home/group/' , this.groupId]);
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
