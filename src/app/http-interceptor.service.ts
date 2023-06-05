import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent} from '@angular/common/http';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class HTTPInterceptorService implements HttpInterceptor {
    readonly todosAPIUrl = "https://localhost:7237/api";
  constructor() { }
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    let headers = req.headers;
    if (req.url=="/weatherforecast/summaries")
    {
      const token = localStorage.getItem('token');
      headers = headers.append('Authorization', `Bearer ${token}`);
    }
    const request = req.clone({
      headers,
      url:`${this.todosAPIUrl}${req.url}`,
    });
    return next.handle(request);
  }
}