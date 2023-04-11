import { AfterContentChecked, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { StateService } from '../../data-access/state.service';
import { Observable } from 'rxjs';
import { iconSelect } from '../../utils/funcs/iconSelect';

@Component({
  selector: 'app-activities-shell',
  templateUrl: './activities-shell.component.html',
  styleUrls: ['./activities-shell.component.scss']
})
export class ActivitiesShellComponent implements OnInit, AfterContentChecked {

  constructor( private state: StateService, private cdRef: ChangeDetectorRef ) {}

  private _display: boolean = false;
  get display() {
    return this._display;
  }
  set display(value: boolean) {
    this._display = value
  }

  pageTitle$!: Observable<string>;
  search: string = '';

  icon(category: string) {
    return iconSelect(category)
  }

  onDisplayChange(value: boolean) {
    this.display = value;
  }

  ngAfterContentChecked() {
    this.pageTitle$ = this.state.pageTitle$
    this.cdRef.detectChanges()
  }

  ngOnInit() {
  }

}
