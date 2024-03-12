import {Component, OnInit} from '@angular/core';
import {FlexModule} from "@angular/flex-layout";
import {FormGroup, FormsModule, ReactiveFormsModule} from "@angular/forms";
import {MatButton} from "@angular/material/button";
import {MatCard, MatCardContent, MatCardHeader, MatCardTitle} from "@angular/material/card";
import {MatFormField, MatLabel} from "@angular/material/form-field";
import {MatInput} from "@angular/material/input";
import {Router, RouterLink} from "@angular/router";
import {MatDialog} from "@angular/material/dialog";
import {UserFacadeService} from "../user-facade.service";
import {AlertDialogComponent} from "../../alert-dialog/alert-dialog.component";
import {NgIf} from "@angular/common";

@Component({
  selector: 'app-password-form',
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
    RouterLink,
    NgIf
  ],
  templateUrl: './password-form.component.html',
  styleUrl: './password-form.component.css'
})
export class PasswordFormComponent  implements OnInit{
  changePasswordForm!: FormGroup;

  constructor(
    private userFacade: UserFacadeService,
    private router: Router,
    public dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.changePasswordForm = this.userFacade.passwordForm()
  }
  onSubmit(){
    console.log("password" ,this.changePasswordForm.value )
    if (this.changePasswordForm.valid) {
      console.log("password" ,this.changePasswordForm.value )

      this.userFacade.submitPasswordForm(this.changePasswordForm.value).subscribe({
          next: (response: any) => {
            this.router.navigate([`/home/profile`]);
          },
          error: (error: any) => {
            console.log("error" ,error )

            this.dialog.open(AlertDialogComponent, {
              data: { message: "Modification de mot de passe est échoué" }
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
