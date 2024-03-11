import { Injectable } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {AuthService} from "../auth/auth.service";
import {MatDialog} from "@angular/material/dialog";
import {UserService} from "./user.service";
import {Observable, of} from "rxjs";
import {AlertDialogComponent} from "../alert-dialog/alert-dialog.component";
import {ChangePasswordDto, UserUpdateDto} from "./model";
import {PlayerDto} from "../players/model";
import {UserDto} from "../auth/model";

@Injectable({
  providedIn: 'root'
})
export class UserFacadeService {

  constructor(
    private formBuilder: FormBuilder,
    private userService: UserService,
    private dialog: MatDialog
  ) { }
  userForm(user?:UserUpdateDto): FormGroup {
    return this.formBuilder.group({
      firstName: [user?.firstName ?? '', Validators.required],
      lastName: [user?.lastName ?? '', Validators.required],
      email: [user?.email ?? '', [Validators.required, Validators.email]],
     });
  }
  passwordForm(): FormGroup {
    return this.formBuilder.group({
      previousPassword: ['', Validators.required],
      newPassword: ['', Validators.required],
    });
  }

  submitUserForm(userForm: FormGroup, userId: string | undefined): Observable<any> {
    const user = userForm.value;
    // @ts-ignore
    return this.userService.editUser(user , userId );
  }
  getUser(userId: string  ): Observable<UserDto> {
    return this.userService.getUser(userId)
  }
  submitPasswordForm(passwordForm: ChangePasswordDto): Observable<any> {
    console.log("password", passwordForm);
    // Assurez-vous que editPassword attend un objet avec les bonnes propriétés
    return this.userService.editPassword(passwordForm);
  }


}
