import {inject, Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';

import {Observable} from 'rxjs';

import {IComment} from '../interfaces/model-types.interface';

export interface SearchResult {
  id: number;
  title: string;
  description: string;
}

@Injectable({
  providedIn: 'root'
})
export class SearchService {
  private baseUrl = 'https://jsonplaceholder.typicode.com';

  private http = inject(HttpClient);

  searchComments(query: string, page: number, limit: number): Observable<IComment[]> {
    return this.http.get<IComment[]>(`${this.baseUrl}/posts`, {
      params: {
        q: query,
        _page: page.toString(),
        _limit: limit.toString(),
      },
    });
  }
}
