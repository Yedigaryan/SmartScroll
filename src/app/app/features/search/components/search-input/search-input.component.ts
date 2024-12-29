import {Component, OnInit} from '@angular/core';
import {MatFormField, MatLabel} from '@angular/material/form-field';
import {MatInput} from '@angular/material/input';
import {FormControl, ReactiveFormsModule} from '@angular/forms';
import {MatIcon} from '@angular/material/icon';
import {MatIconButton} from '@angular/material/button';
import {debounceTime} from 'rxjs';

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
  styleUrl: './search-input.component.scss'
})
export class SearchInputComponent implements OnInit {
  searchControl: FormControl;

  constructor() {
    this.searchControl = new FormControl('');
  }

  ngOnInit(): void {
    this.searchControl.valueChanges.pipe(debounceTime(500)).subscribe((query) => {
      console.log(query)
    })
  }

}
