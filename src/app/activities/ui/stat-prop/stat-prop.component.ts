import { Component, Input, OnInit } from '@angular/core';
import { iconSelect } from '../../utils/funcs/iconSelect';
import { IStatProp } from '../../utils/models/iStatProp';

@Component({
  selector: 'app-stat-prop',
  templateUrl: './stat-prop.component.html',
  styleUrls: ['./stat-prop.component.scss']
})
export class StatPropComponent implements OnInit {

  @Input() statProp!: IStatProp;

  icon(category: string) {
    return iconSelect(category)
  }

  ngOnInit(): void {
  }

}
