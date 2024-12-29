import {Component, OnInit} from '@angular/core';
import {debounceTime, distinctUntilChanged, Observable, of, tap} from 'rxjs';
import {Store} from '@ngrx/store';
import {loadComments, selectComments, saveSearchQuery} from '../../store';
import {SearchInputComponent} from '../../components/search-input/search-input.component';
import {CdkFixedSizeVirtualScroll, CdkVirtualForOf, CdkVirtualScrollViewport} from '@angular/cdk/scrolling';
import {IComment} from '../../interfaces/model-types.interface';
import {SearchService} from '../../services/search.service';
import {MockDataService} from '../../../../core/services/mock-data.service';
import {FormControl, ReactiveFormsModule} from '@angular/forms';
import {catchError, switchMap} from 'rxjs/operators';


@Component({
  selector: 'app-search-container',
  standalone: true,
  imports: [
    SearchInputComponent,
    CdkVirtualScrollViewport,
    CdkFixedSizeVirtualScroll,
    ReactiveFormsModule,
    CdkVirtualForOf
  ],
  templateUrl: './search.container.component.html',
  styleUrl: './search.container.component.scss'
})
export class SearchContainerComponent implements OnInit {
  limit = 15;
  currentPage = 1;
  comments$: Observable<IComment[]>;
  results: IComment[] = [];
  loading = false;
  loadMore = false;
  error: string | null = null;
  searchControl = new FormControl('');


  constructor(private store: Store, private mockDataService: MockDataService, private searchService: SearchService) {
    this.comments$ = this.store.select(selectComments).pipe(tap((comments) => {
      console.log('comments', comments)
    }));
    this.setupSearch();

  }

  ngOnInit(): void {
      this.store.dispatch(loadComments());
    this.comments$.pipe().subscribe(comments => {
      console.log('this.comments$', comments);
    })

  }

  setupSearch() {
    this.searchControl.valueChanges
      .pipe(
        debounceTime(300),
        distinctUntilChanged(),
        switchMap((query: string | null) => {
          this.loading = true;
          this.error = null;
          this.currentPage = 1;
          return this.searchService.searchComments(query ?? '', this.currentPage, this.limit).pipe(
            tap(results => {
              if (query && query.length >= 3 && results.length > 0) {
                this.store.dispatch(saveSearchQuery({
                  query: query,
                  resultCount: results.length
                }));
              }
            }),
            catchError(() => {
              this.error = 'Something went wrong. Please try again.';
              this.results = [];
              this.loading = false;
              return of([]);
            })
          );
        })
      )
      .subscribe((data: IComment[] | never[]) => {
        this.results = data;
        this.loadMore = data.length > 0;
        this.loading = false;
      });
  }

  scrolledIndexChange() {
    if (this.loadMore) {
      this.loadMoreData();
    }
  }

  loadMoreData() {
    this.loading = true;

    this.currentPage += 1;

    this.searchService.searchComments(this.searchControl.value ?? '', this.currentPage, this.limit)
      .pipe(
        catchError(() => {
          this.error = 'Failed to load more results';

          this.loading = false;

          return of([]);
        })
      )
      .subscribe(newData => {
        this.results = [...this.results, ...newData];

        this.loadMore = newData.length > 0;

        this.loading = false;
      });
  }
}
