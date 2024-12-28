import {Component, OnInit} from '@angular/core';
import {Observable} from 'rxjs';
import {Store} from '@ngrx/store';
import {loadComments, selectComments} from '../../store';
import {AsyncPipe} from '@angular/common';
import {SearchInputComponent} from '../../components/search-input/search-input.component';
import {CdkFixedSizeVirtualScroll, CdkVirtualScrollViewport} from '@angular/cdk/scrolling';


@Component({
  selector: 'app-search-container',
  standalone: true,
  imports: [
    AsyncPipe,
    SearchInputComponent,
    CdkVirtualScrollViewport,
    CdkFixedSizeVirtualScroll
  ],
  templateUrl: './search.container.component.html',
  styleUrl: './search.container.component.scss'
})
export class SearchContainerComponent implements OnInit {

  posts$: Observable<any[]>;

  constructor(private store: Store) {
    this.posts$ = this.store.select(selectComments);
  }

  ngOnInit(): void {
    this.store.dispatch(loadComments());
  }

}
