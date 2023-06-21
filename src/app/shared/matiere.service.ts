import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {catchError, filter, forkJoin, map, Observable, of, pairwise, tap} from 'rxjs';
import {Matiere} from '../matiere/matiere.model';
import {environment} from 'src/environments/environment';
import {MATIERE} from './constants';

@Injectable({
  providedIn: 'root'
})

export class MatiereService {
  uri_api = environment.apiUrl + MATIERE;

  constructor(
    private http: HttpClient) {
  }

  getAllMatieres(): Observable<{ code: number, data: Matiere[] | any }> {
    return this.http.get<{ code: number, data: Matiere[] }>(this.uri_api)
  }
}
