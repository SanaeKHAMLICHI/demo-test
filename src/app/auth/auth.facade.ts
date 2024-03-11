import { Injectable } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import {AuthService} from "./auth.service";
import {AlertDialogComponent} from "../alert-dialog/alert-dialog.component";
import {Observable, of, throwError} from "rxjs";

@Injectable({ providedIn: 'root' })
export class AuthFormFacade {
  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private dialog: MatDialog
  ) {}

  loginForm(): FormGroup {
    return this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });
  }

  registerForm(): FormGroup {
    return this.formBuilder.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8)]],
      confirmPassword: ['', Validators.required]
    }, {validator: this.checkPasswords });
  }
  checkPasswords(group: FormGroup) {
    // @ts-ignore
    let pass = group.get('password').value;
    // @ts-ignore
    let confirmPass = group.get('confirmPassword').value;
    return pass === confirmPass ? null : { notSame: true }
  }


  submitLoginForm(form: FormGroup): Observable<any> {
    if (!form.valid) {
      this.dialog.open(AlertDialogComponent, {
        data: { message: 'Le formulaire contient des erreurs.' }
      });
      return throwError(() => new Error('Le formulaire contient des erreurs.'));
    }
    const { email, password } = form.value;
    return this.authService.login({ email, password });
  }

  submitRegisterForm(registerForm: FormGroup): Observable<any> {
    if (!registerForm.valid) {
      let message = '';
      if (registerForm.hasError('notSame')) {
        message = 'Les mots de passe saisis ne correspondent pas.';
      } else {
        message = 'Veuillez remplir correctement tous les champs requis.';
      }
      this.dialog.open(AlertDialogComponent, {
        data: { message: message }
      });
      return of(null);
    }
    const user = registerForm.value;
    return this.authService.addUser(user);
  }
  logout() {
    localStorage.removeItem('accessToken');
  }


}
