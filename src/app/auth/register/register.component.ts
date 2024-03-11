import {Component, inject, Input} from '@angular/core';
import {FlexModule} from "@angular/flex-layout";
import {FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators} from "@angular/forms";
import {MatButton} from "@angular/material/button";
import {MatCard, MatCardContent, MatCardHeader, MatCardTitle} from "@angular/material/card";
import {MatFormField, MatLabel} from "@angular/material/form-field";
import {MatInput} from "@angular/material/input";
import {Router} from "@angular/router";
import {MatDialog} from "@angular/material/dialog";
import {AlertDialogComponent} from "../../alert-dialog/alert-dialog.component";
import {HttpClientModule} from "@angular/common/http";
import {AuthService} from "../auth.service";
import {AuthFormFacade} from "../auth.facade";
import {NgIf} from "@angular/common";

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [
    FlexModule,
    FormsModule,
    MatButton,
    MatCard,
    MatCardContent,
    MatCardHeader,
    MatCardTitle,
    MatFormField,
    MatInput,
    MatLabel,
    ReactiveFormsModule,
    HttpClientModule,
    NgIf
  ],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {

  registerForm = this.authFormFacade.registerForm();

  constructor(
    private authFormFacade: AuthFormFacade ,
    private router: Router,
    public dialog: MatDialog) {

  }

  onSubmit() {
    this.authFormFacade.submitRegisterForm(this.registerForm).subscribe({
      next: (response) => {
        if (response === null) {
          console.log('Validation error handled.');
          return;
        }
        console.log('User Added Successfully', response);
        localStorage.setItem('accessToken', response.accessToken);
        this.router.navigate(['/home']);
      },
      error: (error) => {
        console.error('Error Adding User', error);
        let message = '';
        if (error.status === 400) {
          message = 'L\'utilisateur existe déjà. Veuillez essayer un autre email.';
        } else {
          message = 'Une erreur est survenue lors de l\'inscription. Veuillez réessayer plus tard.';
        }
        this.dialog.open(AlertDialogComponent, {
          data: { message: message }
        });
      }
    });
  }

}
