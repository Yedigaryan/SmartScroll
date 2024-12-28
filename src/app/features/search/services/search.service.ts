import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

export interface SearchResult {
  id: number;
  title: string;
  description: string;
}

@Injectable({
  providedIn: 'root'
})
export class SearchService {
  constructor() { }

  search(query: string): Observable<SearchResult[]> {
    // Here you would typically make an HTTP call to your backend API
    // For now returning a mock observable with sample data
    const mockResults: SearchResult[] = [
      {
        id: 1,
        title: `Result for ${query}`,
        description: 'First search result description'
      },
      {
        id: 2,
        title: `Another result for ${query}`,
        description: 'Second search result description'
      }
    ];

    return of(mockResults);
  }
}
