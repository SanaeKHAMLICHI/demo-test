import { Injectable } from '@angular/core';
import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from "@angular/common/http";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class AuthInterceptor implements HttpInterceptor {

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    // Récupération du token d'authentification
    const token =  localStorage.getItem('accessToken')

    // Ajout du token dans les entêtes de la requête
    const authReq = request.clone({
      headers: token ? request.headers.set('Authorization', `Bearer ${token}`) : request.headers
    });

    // Envoi de la requête avec les nouvelles entêtes
    return next.handle(authReq);
  }
}
