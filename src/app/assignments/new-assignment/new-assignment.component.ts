import { Component, OnInit } from '@angular/core';
import {FormBuilder, Validators, FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MatButtonModule} from '@angular/material/button';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatSelectModule} from '@angular/material/select';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatNativeDateModule} from '@angular/material/core';
import { SnackbarService } from '../../services/snackbar.service';
import { Assignment, Eleve, Matiere } from '../assignment.model';
import { AssignmentsService } from '../../shared/assignments.service';
import { Router } from '@angular/router';
import { MatiereService } from '../../shared/matiere.service';
import { EleveService } from '../../shared/eleve.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Dialog,  DialogModule } from '@angular/cdk/dialog';
import { MatStepperModule } from '@angular/material/stepper';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import {MatCardModule} from "@angular/material/card";
import { CommonModule } from '@angular/common';
import {DialogRef} from '@angular/cdk/dialog';


@Component({
  selector: 'app-new-assignment',
  templateUrl: './new-assignment.component.html',
  styleUrls: ['./new-assignment.component.css'],
  standalone:true,
  imports: [
    MatDatepickerModule,
    MatNativeDateModule,
    MatInputModule,
    MatButtonModule,
    MatSelectModule,
    DialogModule,
    MatSnackBarModule,
    MatFormFieldModule,
    MatCardModule,
    MatStepperModule,
    FormsModule,
    ReactiveFormsModule,
    CommonModule
  ],
  providers: [
    SnackbarService,
    MatStepperModule,
    MatSnackBarModule
  ]
})

export class NewAssignmentComponent implements OnInit{

  constructor(
    private _formBuilder: FormBuilder,
    private assignmentsService: AssignmentsService,
    private router: Router,
    private matiereService: MatiereService,
    private eleveService: EleveService,
    private snackBar: MatSnackBar,
    public dialog: Dialog,
    public dialogRef: DialogRef
  ) {}

  nomDevoir = '';
  dateDeRendu!: Date;
  matiere!: string;
  matieres?: Matiere[];
  matiereSelected?: Matiere;
  eleve!: string;
  eleves?: Eleve[];
  eleveSelected?: Eleve;
  submit: boolean = false;

  firstFormGroup = this._formBuilder.group({
    nomDevoir: [this.nomDevoir, Validators.required],
  });
  secondFormGroup = this._formBuilder.group({
    matiere: [this.matiere, Validators.required],
  });
  thirdFormGroup = this._formBuilder.group({
    eleve: [this.eleve, Validators.required],
  });

  ngOnInit(): void {
    this.initializeMatieres();
    this.initializeEleves();
  }

  showSnackBar(message: string, type: string) {
    this.snackBar.open(message, 'Fermer', {
      duration: 2000,
      panelClass: [type === 'success' ? 'success-snackbar' : 'error-snackbar']
    });
  }

  onSuccess = (message: any) => {
    this.showSnackBar("Assignement enregistré avec succès", "success");
    this.router.navigate(['/homepage']);
    location.reload();
  }

  onError = (err: any) =>{
    console.log(err);
    this.showSnackBar("Une erreur s'est produite", "error");
  }

  initializeMatieres(){
    this.matiereService.getAllMatieres().subscribe(
      r => this.matieres = r.data,
      this.onError
    )
  }

  initializeEleves(){
    this.eleveService.getAllEleves().subscribe(
      r => this.eleves = r.data,
      this.onError
    )
  }

  changeMatiere(id: string){
    this.matiereSelected = this.matieres?.find(m => m._id == id)
  }

  changeEleve(id: string){
    this.eleveSelected = this.eleves?.find(m => m._id == id)
  }

  onSubmit() {
    this.submit = true;
    if(this.firstFormGroup.invalid || this.secondFormGroup.invalid || this.thirdFormGroup.invalid){
      this.showSnackBar("Veuillez renseigner tous les champs", "error");
      return;
    }

    let nouvelAssignment = new Assignment();
    nouvelAssignment.id = Math.abs(Math.random() * 1000000000000000);
    nouvelAssignment.nom = this.nomDevoir;
    nouvelAssignment.rendu = false;
    nouvelAssignment.eleve_id = this.eleve;
    nouvelAssignment.matiere_id = this.matiere;
    this.assignmentsService
      .addAssignment(nouvelAssignment)
      .subscribe(this.onSuccess, this.onError)
  }
}
