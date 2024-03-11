import {Component, Input, OnInit} from '@angular/core';
import {FlexModule} from "@angular/flex-layout";
import {FormGroup, FormsModule, ReactiveFormsModule} from "@angular/forms";
import {MatButton} from "@angular/material/button";
import {MatFormField, MatLabel} from "@angular/material/form-field";
import {MatInput} from "@angular/material/input";
import {AuthFormFacade} from "../../auth/auth.facade";
import {Router} from "@angular/router";
import {MatDialog} from "@angular/material/dialog";
import {AlertDialogComponent} from "../../alert-dialog/alert-dialog.component";
import {UserFacadeService} from "../user-facade.service";
import {PlayerDto} from "../../players/model";
import {UserDto} from "../../auth/model";
import {MatCard, MatCardContent, MatCardHeader, MatCardTitle} from "@angular/material/card";

@Component({
  selector: 'app-user-form',
  standalone: true,
  imports: [
    FlexModule,
    FormsModule,
    MatButton,
    MatFormField,
    MatInput,
    MatLabel,
    ReactiveFormsModule,
    MatCard,
    MatCardContent,
    MatCardHeader,
    MatCardTitle
  ],
  templateUrl: './user-form.component.html',
  styleUrl: './user-form.component.css'
})
export class UserFormComponent implements OnInit {
  userId: string | undefined;
  userForm!: FormGroup;

  user: UserDto | undefined;

  constructor(
    private userFacade: UserFacadeService ,
    private router: Router,
    public dialog: MatDialog) {}
  ngOnInit() {
    // @ts-ignore
    this.userId = localStorage.getItem('userId')
    this.userForm = this.userFacade.userForm();

    console.log("userid", this.userId)
    // @ts-ignore
    this.userFacade.getUser(this.userId).subscribe({
      next: (response) => {
        this.user = response
        this.userForm=this.userFacade.userForm(response )
      },
      error: (error) => {
        console.log("responseerrorplayers" , error)
      }
    });
  }


    onSubmit() {
    this.userFacade.submitUserForm(this.userForm , this.userId).subscribe({
      next: (response) => {
        if (response === null) {
          console.log('Validation error handled.');
          return;
        }
        console.log('User update Successfully', response);
        this.router.navigate(['/home/profile']);
      },
      error: (error) => {
        console.error('Error Adding User', error);
        let message = '';
        if (error.status === 404) {
          message = 'L\'utilisateur n\'existe pas ';
        } else {
          message = 'Une erreur est survenue lors de modification. Veuillez réessayer plus tard.';
        }
        this.dialog.open(AlertDialogComponent, {
          data: { message: message }
        });
      }
    });
  }

}
