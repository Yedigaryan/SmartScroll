import {Component, OnInit} from '@angular/core';
import {debounceTime, distinctUntilChanged, Observable, of, tap} from 'rxjs';
import {Store} from '@ngrx/store';
import {loadComments, selectComments} from '../../store';
import {SearchInputComponent} from '../../components/search-input/search-input.component';
import {CdkFixedSizeVirtualScroll, CdkVirtualScrollViewport} from '@angular/cdk/scrolling';
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
    ReactiveFormsModule
  ],
  templateUrl: './search.container.component.html',
  styleUrl: './search.container.component.scss'
})
export class SearchContainerComponent implements OnInit {
  pageSize = 20;
  currentPage = 1;
  comments$: Observable<IComment[]>;
  results: IComment[] = [];
  loading = false;
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
        debounceTime(300), // Wait 300ms after each keystroke
        distinctUntilChanged(), // Ignore duplicate queries
        switchMap((query: string | null) => {
          this.loading = true;
          this.error = null;
          this.currentPage = 1;
          return this.searchService.searchComments(query ?? '', this.currentPage, this.pageSize).pipe(
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
        this.loading = false;
      });
  }

  scrolledIndexChange(index: number) {
    console.log('index', index)
    const endIndex = index + this.pageSize;
    const startIndex = index;

    if (endIndex >= this.results.length - 5 && index < this.results.length - 5) {
      console.log('loadMoreData');
      this.loadMoreData();
    }

    if (startIndex <= this.currentPage && this.currentPage > 1) {
      // this.loadPreviousData();
      console.log('loadPreviousData');
    }
  }

  loadMoreData() {
    this.currentPage++;
    this.loading = true;

    this.searchService.searchComments(this.searchControl.value ?? '', this.currentPage, this.pageSize)
      .pipe(
        catchError(() => {
          this.error = 'Failed to load more results';
          this.loading = false;
          return of([]);
        })
      )
      .subscribe(newData => {
        this.results = [...this.results, ...newData];
        this.loading = false;
      });
  }
}
