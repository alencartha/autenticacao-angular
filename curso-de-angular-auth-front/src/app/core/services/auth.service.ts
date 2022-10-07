import { Injectable } from '@angular/core';
import { Observable, map, catchError, throwError } from 'rxjs'
import { HttpClient } from '@angular/common/http'
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt'

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private url: string = 'http://localhost:3000'

  constructor(private http: HttpClient, private router: Router) { }

  public sign(payload: { email: string, password: string }): Observable<any> {
    return this.http.post<{ token: string }>(`${this.url}/sign`, payload).pipe(
      map((data) => {
        localStorage.removeItem('access_token')
        localStorage.setItem('access_token', JSON.stringify(data.token))
        return this.router.navigate(['admin'])
      }),
      catchError((err) => {
        console.log(err)
        if (err.error.message)
          return throwError(() => err.error.message)
        return throwError(() => "No momento nao conseguimos validar od dados, tente novamente mais tarde")
      })
    )
  }

  public logout() {
    localStorage.removeItem('access_token')
    return this.router.navigate([''])
  }

  public isAutenticaded(): boolean {
    const token = localStorage.getItem('access_token')

    if (!token) {
      return false
    } else {
      const jwtHelper = new JwtHelperService();
      return !jwtHelper.isTokenExpired(token)
    }


  }
}
