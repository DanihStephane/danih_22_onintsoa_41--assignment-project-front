import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {AuthService} from "../shared/auth.service";
import { UsersToken } from '../assignments/users.model';
import {SnackbarService} from "../services/snackbar.service";
import {MatSnackBar} from "@angular/material/snack-bar";

@Component({
  providers:[
    AuthService,
    SnackbarService,
    MatSnackBar
  ],
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  nom !: string;
  password !: string;

  ngOnInit(): void {
  }

  constructor(private authService:AuthService, private router: Router,private snackbarService: SnackbarService) { }

  onSubmit() {

    this.authService.logIn(this.nom, this.password)
      .subscribe(reponse => {
        var userT = reponse as UsersToken;
        sessionStorage.setItem("token", userT.token);

        // il va falloir naviguer (demander au router) d'afficher à nouveau la liste
        // en gros, demander de naviguer vers /home
        this.router.navigate(['/homepage']);
      }, error => {
        console.log("erreur = " + error.error);
        this.snackbarService.openSnackBar('Votre authentification est incorrect, veiller recommencer', 'Fermer', 3000);
      })
  }
}
