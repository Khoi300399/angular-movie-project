import {
  AfterContentInit,
  Component,
  ContentChildren,
  Input,
  OnInit,
  QueryList,
} from '@angular/core';
import { DestroyService } from '../../core/services/destroy.service';
import { debounceTime, takeUntil } from 'rxjs';
import { FormControl } from '@angular/forms';
import { Store } from '@ngrx/store';
import { AppState } from '../../core/store/app.state';
import { getMoviesByName } from '../../core/store/movie/movie.action';
import { OptionComponent } from '../option/option.component';
import { DropdownService } from '../../core/services/dropdown.service';

@Component({
  selector: 'dropdown',
  templateUrl: './dropdown.component.html',
  styleUrls: ['./dropdown.component.scss'],
})
export class DropdownComponent implements OnInit, AfterContentInit {
  isActive: boolean = false;
  @Input() selectedValue: string = '';
  @Input() search: boolean = false;
  @ContentChildren(OptionComponent) options!: QueryList<OptionComponent>;
  queryControl: FormControl = new FormControl('');

  ngOnInit(): void {
    this.queryControl.valueChanges
      .pipe(debounceTime(200), takeUntil(this.destroy$))
      .subscribe((query: string) => {
        this.onSearch(query);
      });
    this.dropdownService.isActive$.subscribe((isActive) => {
      this.isActive = isActive;
    });
  }
  ngAfterContentInit(): void {}
  handleToggleDropdown() {
    this.dropdownService.toggleDropdown(!this.isActive);
  }
  onSearch(query: string) {
    this.store.dispatch(getMoviesByName({ tenPhim: query }));
  }
  onClickedOutside() {
    this.isActive = false;
  }

  constructor(
    private store: Store<AppState>,
    private destroy$: DestroyService,
    private dropdownService: DropdownService
  ) {}
}
