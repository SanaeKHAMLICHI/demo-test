import {Component, OnInit} from '@angular/core';
import {
  MatCard,
  MatCardActions,
  MatCardContent,
  MatCardHeader,
  MatCardModule,
  MatCardTitle
} from '@angular/material/card';
import {UserDto} from "../../auth/model";
import {UserFacadeService} from "../user-facade.service";
import {Router, RouterLink} from "@angular/router";
import {MatDialog} from "@angular/material/dialog";
import {MatButton} from "@angular/material/button";
import {FlexModule} from "@angular/flex-layout";
import {MatFormField, MatLabel} from "@angular/material/form-field";
import {MatInput} from "@angular/material/input";
import {ReactiveFormsModule} from "@angular/forms";

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [
    MatCardHeader,
    MatCardContent,
    MatCardActions,
    MatButton,
    RouterLink,
    MatCard,
    MatCardTitle,
    FlexModule,
    MatFormField,
    MatInput,
    MatLabel,
    ReactiveFormsModule
  ],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css'
})
export class ProfileComponent implements OnInit{
  user: UserDto | undefined;
  userId: string | undefined;
  constructor(
    private userFacade: UserFacadeService ,
    private router: Router,
    public dialog: MatDialog) {}
  ngOnInit(){
    // @ts-ignore
    this.userId = localStorage.getItem('userId')
    // @ts-ignore
    this.userFacade.getUser(this.userId).subscribe({
      next: (response) => {
        this.user = response
      },
      error: (error) => {
        console.log("responseerrorplayers" , error)
      }
    });
  }



}
