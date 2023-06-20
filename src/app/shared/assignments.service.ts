import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, filter, forkJoin, map, Observable, of, pairwise, tap } from 'rxjs';
import { Assignment } from '../assignments/assignment.model';
import { LoggingService } from './logging.service';
import { bdInitialAssignments } from './data';

@Injectable({
  providedIn: 'root'
})

export class AssignmentsService {
  assignments:Assignment[] = [];

  constructor(private loggingService:LoggingService, private http:HttpClient) {
    this.loggingService.setNiveauTrace(2);

  }

  url = "http://localhost:8010/api/assignments";

  getAssignments(page:number, limit:number, token:any):Observable<any> {
    return this.http.get<Assignment[]>(this.url + "?page=" + page + "&limit=" + limit,{headers: {'x-access-token': token}});
  }

  getAssignment(id:number):Observable<Assignment|undefined> {
    return this.http.get<Assignment>(`${this.url}/${id}`)
    .pipe(
      map(a => {
        a.nom = a.nom ;
        return a;
      }),
      tap(a => {
        console.log("Dans le tap, pour debug, assignment recu = " + a.nom)
      }),
      catchError(this.handleError<any>('### catchError: getAssignments by id avec id=' + id))
    );
  }

  private handleError<T>(operation: any, result?: T) {
    return (error: any): Observable<T> => {
      console.log(error); // pour afficher dans la console
      console.log(operation + ' a échoué ' + error.message);

      return of(result as T);
    }
  }

  addAssignment(assignment:Assignment):Observable<any> {
    this.loggingService.log(assignment.nom, "ajouté");

    return this.http.post<Assignment>(this.url, assignment);
  }

  updateAssignment(assignment:Assignment):Observable<any> {
    this.loggingService.log(assignment.nom, "modifié");

    return this.http.put<Assignment>(this.url, assignment);
  }

  deleteAssignment(assignment:Assignment):Observable<any> {
    this.loggingService.log(assignment.nom, "supprimé");

    return this.http.delete(this.url + "/" + assignment._id);
  }

  peuplerBD() {
    bdInitialAssignments.forEach(a => {
      let newAssignment = new Assignment();
      newAssignment.nom = a.nom;
      newAssignment.dateDeRendu = new Date(a.dateDeRendu);
      newAssignment.rendu = a.rendu;
      newAssignment.id = a.id;

      this.addAssignment(newAssignment)
      .subscribe(reponse => {
        console.log(reponse.message);
      })
    })
  }

  peuplerBDAvecForkJoin(): Observable<any> {
    const appelsVersAddAssignment:any = [];

    bdInitialAssignments.forEach((a) => {
      const nouvelAssignment:any = new Assignment();

      nouvelAssignment.id = a.id;
      nouvelAssignment.nom = a.nom;
      nouvelAssignment.dateDeRendu = new Date(a.dateDeRendu);
      nouvelAssignment.rendu = a.rendu;

      appelsVersAddAssignment.push(this.addAssignment(nouvelAssignment));
    });
    return forkJoin(appelsVersAddAssignment);
  }

}
