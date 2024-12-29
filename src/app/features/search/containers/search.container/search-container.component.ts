import {Component, DestroyRef, inject, OnInit, Signal} from '@angular/core';
import {takeUntilDestroyed} from '@angular/core/rxjs-interop';
import {FormControl, ReactiveFormsModule} from '@angular/forms';
import {CdkFixedSizeVirtualScroll, CdkVirtualForOf, CdkVirtualScrollViewport} from '@angular/cdk/scrolling';
import {MatProgressSpinner} from '@angular/material/progress-spinner';

import {debounceTime, distinctUntilChanged} from 'rxjs';
import {Store} from '@ngrx/store';

import {loadResults, selectLoading, selectLoadMore, selectResults} from '../../store';
import {SearchInputComponent} from '../../components/search-input/search-input.component';
import {IComment} from '../../interfaces/model-types.interface';


@Component({
  selector: 'app-search-container',
  standalone: true,
  imports: [
    SearchInputComponent,
    CdkVirtualScrollViewport,
    CdkFixedSizeVirtualScroll,
    ReactiveFormsModule,
    CdkVirtualForOf,
    MatProgressSpinner
  ],
  templateUrl: './search-container.component.html',
  styleUrl: './search-container.component.scss'
})
export class SearchContainerComponent implements OnInit {
  limit = 15;
  currentPage = 1;

  searchControl = new FormControl('');

  private store = inject(Store);
  private destroyRef = inject(DestroyRef);

  results: Signal<IComment[]> = this.store.selectSignal(selectResults);
  loading: Signal<boolean> = this.store.selectSignal(selectLoading);
  loadMore: Signal<boolean> = this.store.selectSignal(selectLoadMore);

  ngOnInit(): void {
    this.setupSearch();

    this.loadData();
  }

  setupSearch() {
    this.searchControl.valueChanges
      .pipe(
        debounceTime(500 ),
        distinctUntilChanged(),
        takeUntilDestroyed(this.destroyRef)
      )
      .subscribe(() => {
        this.resetPage();
        this.loadData();
      });
  }

  onScrollEnd() {
    if (this.loadMore()) {
      this.currentPage += 1;

      this.loadData(true);
    }
  }

  private loadData(addToExisting: boolean = false) {
    this.store.dispatch(loadResults({
      query: this.searchControl.value || '',
      page: this.currentPage,
      limit: this.limit,
      addToExisting
    }));
  }

  private resetPage(): void {
    this.currentPage = 1;
  }
}
