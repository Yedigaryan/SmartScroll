import {Component, OnInit} from '@angular/core';
import {MatFormField, MatLabel} from '@angular/material/form-field';
import {MatInput} from '@angular/material/input';
import {ControlValueAccessor, FormControl, NG_VALUE_ACCESSOR, ReactiveFormsModule} from '@angular/forms';
import {MatIcon} from '@angular/material/icon';
import {MatIconButton} from '@angular/material/button';
import {debounceTime, Observable, startWith} from 'rxjs';
import {MatAutocomplete, MatAutocompleteTrigger, MatOption} from '@angular/material/autocomplete';
import {AsyncPipe} from '@angular/common';
import {map, switchMap} from 'rxjs/operators';
import {selectSearchQueries} from '../../store';
import {Store} from '@ngrx/store';

@Component({
  selector: 'app-search-input',
  imports: [
    MatLabel,
    MatFormField,
    MatInput,
    ReactiveFormsModule,
    MatIcon,
    MatIconButton,
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
    startWith(''),
    switchMap(value => this._filter(value || ''))
  );
  onChange: (value: string) => void = () => {
  };
  onTouched: () => void = () => {
  };

  constructor(private store: Store) {
  }

  ngOnInit(): void {
    this.searchControl.valueChanges.pipe(
      debounceTime(500)
    ).subscribe(value => {
      this.onChange(value);
    });

    this.store.select(selectSearchQueries).subscribe(values => {
      console.log('values', values)})
  }

  private _filter(value: string): Observable<string[]> {
    const filterValue = value.toLowerCase();
    return this.store.select(selectSearchQueries).pipe(
      map(queries => queries.filter(query =>
        query.toLowerCase().includes(filterValue)
      ) ?? [])
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
