import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Pet } from '../interfaces/pet.interface';
import { Pets } from '../interfaces/pets.interface';

const API = '/api/v1/pets';

@Injectable({
  providedIn: 'root'
})
export class PetsService {

  constructor(
    private httpClient: HttpClient
  ) { }

  get(page: number, pageSize: number, filter?: string, fields?: string, sort?: string): Observable<Pets> {
    const parameters = new HttpParams()
      .append('page', page ? page.toString() : '')
      .append('pageSize', pageSize ? pageSize.toString() : '')
      .append('FILTER', filter ? filter : '')
      .append('FIELDS', fields ? fields : '')
      .append('SORT', sort ? sort : 'id')

    return this.httpClient.get<Pets>(API, { params: parameters });
  }

  post(body: Pet): Observable<any> {
    return this.httpClient.post<any>(API, body);
  }

  put(body: Pet): Observable<Pet> {
    return this.httpClient.put<Pet>(`${API}/${body.id}`, body);
  }

  delete(id: string): Observable<Pet> {
    return this.httpClient.delete<Pet>(`${API}/${id}`);
  }

  getById(id: string): Observable<Pet> {
    return this.httpClient.get<Pet>(`${API}/${id}`);
  }
}
