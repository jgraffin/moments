import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { IComments } from '../interfaces/IComments';
import { IResponse } from '../interfaces/IResponse';

@Injectable({
  providedIn: 'root',
})
export class CommentsService {
  private baseApiUrl = environment.baseApiUrl;
  private apiUrl = `${this.baseApiUrl}api/moments`;

  constructor(private http: HttpClient) {}

  createComment(data: IComments): Observable<IResponse<IComments>> {
    const url = `${this.apiUrl}/${data.momentId}/comments`;
    return this.http.post<IResponse<IComments>>(url, data);
  }
}
