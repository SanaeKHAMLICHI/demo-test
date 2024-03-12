import {Component, EventEmitter, inject, OnInit, Output} from '@angular/core';
import {FlexModule} from "@angular/flex-layout";
import {MatButton} from "@angular/material/button";
import {MatCard, MatCardContent, MatCardHeader, MatCardTitle} from "@angular/material/card";
import {MatFormField, MatLabel} from "@angular/material/form-field";
import {MatInput} from "@angular/material/input";

import {FormGroup, ReactiveFormsModule} from "@angular/forms";
import {ActivatedRoute, Router} from "@angular/router";
import {MatDialog} from "@angular/material/dialog";


import {NgIf} from "@angular/common";
import {AlertDialogComponent} from "../../alert-dialog/alert-dialog.component";
import {GroupDto} from "../model";
import {TeamDto} from "../../teams/model";
import {TeamsFacadeService} from "../../teams/teams-facade.service";
import {GroupFacadeService} from "../group-facade.service";
import {GroupService} from "../group.service";

@Component({
  selector: 'app-group-form',
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
    NgIf
  ],
  templateUrl: './group-form.component.html',
  styleUrl: './group-form.component.css'
})

export class GroupFormComponent implements OnInit {
  @Output() submitted = new EventEmitter<GroupDto>();
  route: ActivatedRoute = inject(ActivatedRoute);
  groupForm!: FormGroup ;
  groupId: string | undefined ;
  group : GroupDto | undefined;



  constructor(
    private groupService: GroupService,
    private teamFacade: TeamsFacadeService,
    private groupFacade: GroupFacadeService,
    private router: Router,
    public dialog: MatDialog
  ) {}

  ngOnInit(){
    this.groupId = String(this.route.snapshot.params['idGroup']);

    this.teamFacade.getGroupById(this.groupId).subscribe({
      next: (group) => {
        this.group = group
        this.groupForm=this.teamFacade.groupForm(this.group)
      },
      error: (error) => {
      }
    });

  }

  onSubmit(){
    if (this.groupForm.valid) {
      const libelleGroup = this.groupForm.value.libelle
      this.groupService.addGroup(libelleGroup).subscribe({
        next: (response: GroupDto) => {
          this.router.navigate(['/home']);
        },
        error: (error: any) => {
          this.dialog.open(AlertDialogComponent, {
            data: { message: "l'\ajout de group est échoué" }
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
    if (this.groupForm.valid) {
      const team = this.groupForm.value

      this.teamFacade.editGroup(team ,this.groupId).subscribe({
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
  onDelete(groupId :string) {
    this.groupFacade.deleteGroup(groupId).subscribe({
      next: (response) => {
        this.router.navigateByUrl('/home')
      },
      error: (error) => {
        console.error('Erreur lors de la suppression de l’équipe', error);
      }
    });
  }
}
