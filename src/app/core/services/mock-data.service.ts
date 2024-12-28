import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {IComment} from '../../features/search/interfaces/model-types.interface';

@Injectable({
  providedIn: 'root',
})
export class MockDataService {
  private baseUrl = 'https://jsonplaceholder.typicode.com';

  constructor(private http: HttpClient) {}

  getComments(): Observable<any[]> {
    return this.http.get<IComment[]>(`${this.baseUrl}/comments`);
  }
}
