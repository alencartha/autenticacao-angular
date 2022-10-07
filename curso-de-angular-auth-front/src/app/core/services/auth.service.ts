import { Injectable } from '@angular/core';
import {Observable, map, catchError, throwError} from 'rxjs'
import {HttpClient} from '@angular/common/http'

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private url: string = 'http://localhost:3000'

  constructor(private http: HttpClient) { }

  public sign(payload: {email:string, password: string}): Observable<any>{
    return this.http.post(`${this.url}/sign`, payload).pipe(
      map((data) =>{
        return console.log(data)
      }),
      catchError((err)=>{
        console.log(err)
        if(err.error.message)
          return throwError(()=> err.error.message)
        
          return throwError(()=> "No momento nao conseguimos validar od dados, tente novamente mais tarde")
      })
    )
  }
}
