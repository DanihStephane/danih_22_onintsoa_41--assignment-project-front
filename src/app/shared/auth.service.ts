import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Users } from '../assignments/users.model';
@Injectable({
  providedIn: 'root'
})
export class AuthService {
  loggedIn = false;

  logIn(nom:string, password:string) {
    return this.http.post('https://mbds-assigment-api.onrender.com/api/login', {
      nom: nom,
      mdp: password
    });
    this.loggedIn = true;
  }

  logOut() {
    return this.http.get('https://mbds-assigment-api.onrender.com/api/logout');
  }

  isAdmin() {
    let isUserAdmin = new Promise((resolve, reject) => {
      resolve(sessionStorage.getItem("token"));
    });
    return isUserAdmin;
  }


  constructor(private http:HttpClient) { }
}
