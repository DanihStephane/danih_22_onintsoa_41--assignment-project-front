import { Component, OnInit } from '@angular/core';
import { Router, RouterStateSnapshot } from '@angular/router';
import {MatCardModule} from '@angular/material/card';
import {MatListModule} from '@angular/material/list';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatNativeDateModule} from '@angular/material/core';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { Matiere } from "../matiere/matiere.model";
import { Users } from "../assignments/users.model";
import { Assignment } from "../assignments/assignment.model";
import { MatiereService } from "../shared/matiere.service";

//Drag and drop
import {NgFor} from '@angular/common';
import {
  CdkDragDrop,
  CdkDrag,
  CdkDropList,
  CdkDropListGroup,
  moveItemInArray,
  transferArrayItem,
  DragDropModule,
} from '@angular/cdk/drag-drop';
import { NewAssignmentComponent } from "../assignments/new-assignment/new-assignment.component";
import { Dialog,  DialogModule } from '@angular/cdk/dialog';
import {ShowAssignmentComponent} from "../assignments/show-assignment/show-assignment.component";
import {SnackbarService} from "../services/snackbar.service";
import {MatSnackBarModule} from "@angular/material/snack-bar";
import {ConfirmAssignmentComponent} from "../assignments/confirm-assignment/confirm-assignment.component";
import {ReturnAssignmentComponent} from "../assignments/return-assignment/return-assignment.component";
import {DeleteAssignmentComponent} from "../assignments/delete-assignment/delete-assignment.component";

//navbar info
import { UsersWithoutPassword } from '../assignments/users.model';

import { AuthService } from '../shared/auth.service';

import { AssignmentsService } from "../shared/assignments.service";

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.css'],
  standalone: true,
  imports: [
    MatCardModule,
    MatListModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatInputModule,
    MatButtonModule,
    //drag and drop
    CdkDropListGroup, CdkDropList, NgFor, CdkDrag,DragDropModule,
    //Modal
    DialogModule,
    MatIconModule,
    MatSnackBarModule
  ],
  providers: [
    SnackbarService
  ]
})
export class HomepageComponent implements OnInit {
  username: string = '';

  constructor(
    private router: Router,
    public dialog: Dialog,
    private authService:AuthService,
    private assignmentsService:AssignmentsService,
    private matiereService:MatiereService
  ) {

  }

  todo = ['Get to work', 'Pick up groceries', 'Go home', 'Fall asleep'];

  done = ['Get up', 'Brush teeth', 'Take a shower', 'Check e-mail', 'Walk dog'];

  delete : string[] = []

  drop(event: CdkDragDrop<string[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex,
      );
    }

    if (event.currentIndex === 0) {
      console.log('Élément déplacé current :', event.currentIndex);
      console.log('Élément déplacé :', event.container.data);
      console.log('Conteneur de destination :', event.container.id);
      if (event.container.id === 'cdk-drop-list-0'){
        this.openDeleteAssignmentModal();
      }
      if (event.container.id === 'cdk-drop-list-1'){
        this.openReturnAssignmentModal();
      }
      if (event.container.id === 'cdk-drop-list-2'){
        this.openConfirmAssignmentModal();
      }
    }
  }

  openNewAssignmentModal(): void {
    this.dialog.open<string>(NewAssignmentComponent);
  }

  openShowAssignmentModal(): void {
    this.dialog.open<string>(ShowAssignmentComponent);
  }

  openConfirmAssignmentModal(): void {
    this.dialog.open<string>(ConfirmAssignmentComponent);
  }

  openReturnAssignmentModal(): void {
    this.dialog.open<string>(ReturnAssignmentComponent);
  }

  openDeleteAssignmentModal(): void {
    this.dialog.open<string>(DeleteAssignmentComponent);
  }


  //debut traitement sur la navbar connextion

  logout(): void{
    this.authService.logOut().subscribe(reponse => {
      sessionStorage.removeItem('token');
      this.router.navigate(["/login"]);
    });
  }

  //fin traitement navbar logout


  //affichage des assignements

  assignments:Assignment[] = [];
  displayedColumns: string[] = ['id', 'nom', 'dateDeRendu', 'rendu','note','remarques','idMatiere','idEleve'];

  matiere:Matiere[] = [];
  eleve:Users[] =[];
  prof:Users[] =[];
  users:Users[] =[];
  rendu:Assignment[] = [];
  nonRendu:Assignment[] = [];
  selectedDate: Date | null = new Date();
  afaireToday:Assignment[] | undefined = [];

  // pagination
  page=1;
  limit=5;
  totalPages=0;
  pagingCounter=0;
  hasPrevPage=false;
  hasNextPage=true;
  prevPage= 1;
  nextPage= 2;

  token: any;

  search: string = "";

  assignmentClicker!: Assignment;
  matiereClicker!: Matiere;
  profClicker!: Users;
  eleveClicker!: Users;

  ngOnInit(): void {
    console.log("Dans ngOnInit, appelé avant l'affichage");
    this.token = sessionStorage.getItem('token');
    console.log('token : '+this.token);
    this.getAssignments(this.token);
  }

  getAssignments(token: any) {
    // demander les données au service de gestion des assignments...
    this.assignmentsService.getAssignments(this.page, this.limit,token)
      .subscribe(reponse => {
        console.log("données arrivées");
        this.assignments = reponse.docs;
        this.page = reponse.page;
        this.limit=reponse.limit;
        this.totalPages=reponse.totalPages;
        this.pagingCounter=reponse.pagingCounter;
        this.hasPrevPage=reponse.hasPrevPage;
        this.hasNextPage=reponse.hasNextPage;
        this.prevPage= reponse.prevPage;
        this.nextPage= reponse.nextPage;
        this.rendu = this.assignments.filter(x=>x.rendu == true);
        this.nonRendu = this.assignments.filter(x=>x.rendu == false);
      });

    console.log("Après l'appel au service");
  }


}
