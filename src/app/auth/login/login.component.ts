import { Component } from '@angular/core';
import {MatFormField, MatInput, MatInputModule, MatLabel} from '@angular/material/input';
import {MatButton, MatButtonModule} from '@angular/material/button';
import {MatCard, MatCardContent, MatCardHeader, MatCardModule , MatCardTitle } from '@angular/material/card';
import { MatDialog } from '@angular/material/dialog';
import {FlexModule} from "@angular/flex-layout";
import {Router, RouterLink} from "@angular/router";
import {HomeComponent} from "../../home/home.component";
import {NgIf} from "@angular/common";
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {AlertDialogComponent} from "../../alert-dialog/alert-dialog.component";
import {AuthFormFacade} from "../auth.facade";


@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    MatLabel,
    MatCardTitle,
    MatCardContent,
    MatCardHeader,
    MatFormField,
    MatCard,
    MatInput,
    FlexModule,
    MatButton,
    RouterLink,
    HomeComponent,
    NgIf,
    ReactiveFormsModule
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})


export class LoginComponent {
  loginForm = this.authFormFacade.loginForm();
  constructor(
    private authFormFacade: AuthFormFacade ,
    private router: Router,
    private dialog: MatDialog
  ) {}
  onSubmit() {
    this.authFormFacade.submitLoginForm(this.loginForm).subscribe({
      next: (response: any) => {
        localStorage.setItem('accessToken', response.accessToken);
        localStorage.setItem('userId', response.user._id);

        this.router.navigate(['/home']);
      },
      error: (error: any) => {
        console.log("connexion echouer ")

        this.dialog.open(AlertDialogComponent, {
          data: { message: 'Veuillez vérifier vos identifiants et réessayer.' }
        });
      }
    });
  }

}
