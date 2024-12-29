import {Component, DestroyRef, inject, OnInit} from '@angular/core';
import {AsyncPipe} from '@angular/common';
import {takeUntilDestroyed} from '@angular/core/rxjs-interop';
import {MatFormField, MatLabel} from '@angular/material/form-field';
import {MatAutocomplete, MatAutocompleteTrigger, MatOption} from '@angular/material/autocomplete';
import {MatInput} from '@angular/material/input';
import {ControlValueAccessor, FormControl, NG_VALUE_ACCESSOR, ReactiveFormsModule} from '@angular/forms';

import {map, switchMap} from 'rxjs/operators';
import {Observable} from 'rxjs';
import {Store} from '@ngrx/store';

import {selectSearchQueries} from '../../store';

@Component({
  selector: 'app-search-input',
  imports: [
    MatLabel,
    MatFormField,
    MatInput,
    ReactiveFormsModule,
    MatAutocompleteTrigger,
    MatAutocomplete,
    MatOption,
    AsyncPipe,
  ],
  templateUrl: './search-input.component.html',
  standalone: true,
  styleUrl: './search-input.component.scss',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: SearchInputComponent,
      multi: true
    }
  ]
})
export class SearchInputComponent implements OnInit, ControlValueAccessor {

  searchControl: FormControl = new FormControl('', {nonNullable: true});
  filteredQueries$: Observable<string[]> = this.searchControl.valueChanges.pipe(
    switchMap(value => this._filter(value || ''))
  );
  onChange: (value: string) => void = () => {
  };
  onTouched: () => void = () => {
  };

  private destroyRef = inject(DestroyRef);
  private store = inject(Store);

  ngOnInit(): void {
    this.searchControl.valueChanges.pipe(
      takeUntilDestroyed(this.destroyRef)
    ).subscribe(value => {
      this.onChange(value);
    });
  }

  private _filter(value: string): Observable<string[]> {
    const filterValue = value.toLowerCase();

    return this.store.select(selectSearchQueries).pipe(
      map(queries => queries.filter(query =>
        query.toLowerCase().includes(filterValue)
      ))
    );
  }

  writeValue(value: string): void {
    this.searchControl.setValue(value, {emitEvent: false});
  }

  registerOnChange(fn: (value: string) => void): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    isDisabled ? this.searchControl.disable() : this.searchControl.enable();
  }
}
