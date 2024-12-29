import { Component, OnInit } from '@angular/core';
import { MatFormField, MatLabel } from '@angular/material/form-field';
import { MatInput } from '@angular/material/input';
import { FormControl, ReactiveFormsModule, ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { MatIcon } from '@angular/material/icon';
import { MatIconButton } from '@angular/material/button';
import { debounceTime } from 'rxjs';

@Component({
  selector: 'app-search-input',
  imports: [
    MatLabel,
    MatFormField,
    MatInput,
    ReactiveFormsModule,
    MatIcon,
    MatIconButton
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
  searchControl: FormControl;
  onChange: (value: string) => void = () => {};
  onTouched: () => void = () => {};

  constructor() {
    this.searchControl = new FormControl('');
  }

  ngOnInit(): void {
    this.searchControl.valueChanges.pipe(
      debounceTime(500)
    ).subscribe(value => {
      this.onChange(value);
    });
  }

  writeValue(value: string): void {
    this.searchControl.setValue(value, { emitEvent: false });
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
