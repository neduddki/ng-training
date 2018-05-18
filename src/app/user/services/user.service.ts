import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';

import { environment } from '../../../environments/environment';
import { User } from '../user.barrel';
import { AuthService } from '../../shared/shared.barrel';
// import { AuthService, ApiRequestConfig } from '../../shared/shared.barrel';
// import { ApiService, ApiResponseConfig } from '../../shared/shared.barrel';
import { HttpErrorResponse, HttpClient, HttpHeaders } from '@angular/common/http';


@Injectable()
export class UserService {

  public constructor(private _http: HttpClient, private _authService: AuthService) {
    //
  }

  public register(user: User): Observable<Response> {
    return this._http.post<Response>(
      environment.apiEndpoint + '/user/register',
      user
    );
  }
    /*

  public modify(user: User): Observable<Response> {
    return this._http.put(
      environment.apiEndpoint + '/user/' + user.id,
      {
        body: user,
        // headers: this._getHeaders()
        headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
        'Authorization': 'Bearer ' + this._authService.token
        }
      }
    );
}
*/

public modify(user: User): Observable<Response> {
  const observable = this._http.request(
    'PUT',
    environment.apiEndpoint + '/user/' + user.id,
    { body: user,
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
        'Authorization': 'Bearer ' + this._authService.token
      })
    }
  );
  const subject = new Subject<any>();
  observable.subscribe(
    response => subject.next(response),
    errorResponse => {
      const errorBody = (errorResponse as HttpErrorResponse).error;
      if (['token_expired', 'token_invalid', 'token_not_provided'].indexOf(errorBody['error']) !== -1) {
        this._authService.logout();
      }
      window.alert(errorBody['error'] ? errorBody['error'] : 'Unexpected system error.');
      subject.error(errorResponse);
    }
  );
  return subject.asObservable();
}



}
