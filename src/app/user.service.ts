
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService{
  private apiUrl = 'https://localhost:7237/api'; // URL to web API

  constructor(private http: HttpClient) {}

  login(username: string, password: string): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };
    const body = { username: username, password: password };
    return this.http.post<any>(`${this.apiUrl}/Auth`, body, httpOptions)
      .pipe(
        catchError(this.handleError)
      );
  }

  private handleError(error: any): Observable<any> {
    console.error('An error occurred', error); // for demo purposes only
    return throwError(() => new Error('error.message || error'))
  }
}

@Injectable({
  providedIn: 'root'
})
export class UserService {

  readonly todosAPIUrl = "https://localhost:7237/api";
  constructor(private http:HttpClient) { }

  //Person
  getUserList():Observable<any[]>{
    return this.http.get<any[]>(this.todosAPIUrl + '/Person');
  }

  addUser(data:any){
    return this.http.post(this.todosAPIUrl + '/Person', data);
  }

  updateUser(id:number, data:any){
    return this.http.put(this.todosAPIUrl + `/Person/${id}`, data)
  }

  deleteUser(id:number){
    return this.http.delete(this.todosAPIUrl + `/Person/${id}`)
  }

  //Requests
  getRequestsList():Observable<any[]>{
    return this.http.get<any[]>(this.todosAPIUrl + '/Requests');
  }

  addRequests(data:any){
    return this.http.post(this.todosAPIUrl + '/Requests', data);
  }

  updateRequests(id:number, data:any){
    return this.http.put(this.todosAPIUrl + `/Requests/EditRequest`,id, data)
  }

  deleteRequests(id:number){
    return this.http.delete(this.todosAPIUrl + `/Requests/${id}`)
  }
}
