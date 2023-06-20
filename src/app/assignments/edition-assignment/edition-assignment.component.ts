import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {AssignmentsService} from 'src/app/shared/assignments.service';
import {Assignment, Eleve, Matiere} from '../assignment.model';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {MatiereService} from 'src/app/shared/matiere.service';
import {EleveService} from 'src/app/shared/eleve.service';
import {MatSnackBar} from '@angular/material/snack-bar';
import {HttpStatusCode} from '@angular/common/http';
import {MAT_DIALOG_DATA} from '@angular/material/dialog';
import {Inject} from '@angular/core';

@Component({
  selector: 'app-edition-assignment',
  templateUrl: './edition-assignment.component.html',
  styleUrls: ['./edition-assignment.component.css'],
})
export class EditionAssignmentComponent { firstFormGroup: FormGroup;
  secondFormGroup: FormGroup;
  thirdFormGroup: FormGroup;
  eleves: Eleve[] | undefined;
  eleveSelected: Eleve | undefined;
  matieres: Matiere[] | undefined;
  matiereSelected: Matiere | undefined;
  assignment: Assignment | undefined;
  submit: boolean = false;

  constructor(
    private _formBuilder: FormBuilder,
    private assignmentsService: AssignmentsService,
    private router: Router,
    private matiereService: MatiereService,
    private eleveService: EleveService,
    private snackBar: MatSnackBar,
    private route: ActivatedRoute,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.firstFormGroup = this._formBuilder.group({
      nomDevoir: ['', Validators.required],
    });
    this.secondFormGroup = this._formBuilder.group({
      matiere: ['', Validators.required],
    });
    this.thirdFormGroup = this._formBuilder.group({
      eleve: ['', Validators.required],
    });
  }

  ngOnInit() {
    this.initializeEleves();
    this.initializeMatieres();
    this.getAssignment();
  }

  onError = (err: any) => {
    this.showSnackBar("Une erreur s'est produite", "error");
  }

  initializeMatieres() {
    this.matiereService.getAllMatieres().subscribe(
      r => this.matieres = r.data,
      this.onError
    )
  }

  initializeEleves() {
    this.eleveService.getAllEleves().subscribe(
      r => this.eleves = r.data,
      this.onError
    )
  }

  changeMatiere(id: string) {
    this.matiereSelected = this.matieres?.find(m => m._id == id)
  }

  changeEleve(id: string) {
    this.eleveSelected = this.eleves?.find(m => m._id == id)
  }

  showSnackBar(message: string, type: string) {
    this.snackBar.open(message, 'Fermer', {
      duration: 2000,
      panelClass: [type === 'success' ? 'success-snackbar' : 'error-snackbar']
    });
  }

  onUpdateAssignment() {
    if (!this.assignment) return;
    const updatedAssignment: Assignment = {
      ...this.assignment,
      nom: this.firstFormGroup.value.nomDevoir,
      matiere: this.matiereSelected,
      eleve: this.eleveSelected,
      matiere_id: this.matiereSelected?._id,
      eleve_id: this.eleveSelected?._id
    };
    this.assignmentsService.updateAssignment(updatedAssignment)
      .subscribe(
        (message) => {
          if (message.code == HttpStatusCode.Accepted) {
            console.log(message);
            this.showSnackBar("Assignement modifié avec succès", "success");
            this.router.navigate(['/homepage']);
            location.reload()
          } else {
            this.showSnackBar(message.message, "erreur");
          }
        }, (error: any) => {
          console.log(error);
          this.showSnackBar("Une erreur est survenue lors du modification", "error");
        });
  }

  getAssignment() {
    const id = this.data.itemId;
    this.assignmentsService.getAssignment(id).subscribe(
      (assignment) => {
        if (!assignment) return;
        console.log(assignment);
        this.assignment = assignment.data;
        this.matiereSelected = assignment.data.matiere;
        this.eleveSelected = assignment.data.eleve;
        this.firstFormGroup.patchValue({
          nomDevoir: this.assignment?.nom,
        });
        this.secondFormGroup.get('matiere')?.setValue(this.assignment?.matiere._id);
        this.thirdFormGroup.get('eleve')?.setValue(this.assignment?.eleve._id);
      }, (error) => {
        console.log(error);
      }
    );
  }

}
