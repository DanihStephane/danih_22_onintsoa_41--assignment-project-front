import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Users } from '../assignments/users.model';
@Injectable({
  providedIn: 'root'
})
export class AuthService {
  loggedIn = false;

  logIn(nom:string, password:string) {
    return this.http.post('http://localhost:8010/api/login', {
      nom: nom,
      mdp: password
    });
    this.loggedIn = true;
  }

  register(nom:string, password:string, photo:string, profil:Number) {
    var id = Math.round(Math.random()*10000000);
    return this.http.post('http://localhost:8010/api/users', {nom, password, photo, profil,id});
  }

  getLoggedIn(token:string) {
    return this.http.get('http://localhost:8010/api/connected', {headers: {'x-access-token': token}});
  }

  logOut() {
    return this.http.get('http://localhost:8010/api/logout');
  }

  isAdmin() {
    let isUserAdmin = new Promise((resolve, reject) => {
      resolve(sessionStorage.getItem("token"));
    });
    return isUserAdmin;
  }


  constructor(private http:HttpClient) { }
}
