import {Component, OnInit} from '@angular/core';
import {Observable, timer} from 'rxjs';
import {Store} from '@ngrx/store';
import {loadComments, selectComments} from '../../store';
import {AsyncPipe} from '@angular/common';
import {SearchInputComponent} from '../../components/search-input/search-input.component';
import {CdkFixedSizeVirtualScroll, CdkVirtualScrollViewport} from '@angular/cdk/scrolling';
import {IComment} from '../../interfaces/model-types.interface';


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

  comments$: Observable<IComment[]>;

  constructor(private store: Store) {
    this.comments$ = this.store.select(selectComments);
  }

  ngOnInit(): void {
    timer(500).subscribe(() => {
      this.store.dispatch(loadComments());
    })
  }

}
