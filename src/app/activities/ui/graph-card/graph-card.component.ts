import { Component, Input, OnInit } from '@angular/core';
import { IActivity, ICategorizedActivity } from '../../utils/models/iactivity';

@Component({
  selector: 'app-graph-card',
  templateUrl: './graph-card.component.html',
  styleUrls: ['./graph-card.component.scss']
})
export class GraphCardComponent implements OnInit {

  @Input() categorizedActivities!: ICategorizedActivity[];

  private _selectedCategory: keyof IActivity = 'duration';

  get selectedCategory(): keyof IActivity {
    return this._selectedCategory;
  }

  set selectedCategory(value: keyof IActivity) {
    this._selectedCategory = value;
    this.data = this.returnData(this.drawGraph(this._selectedCategory))
  }
  plotOptions: string[] = ["distance", "duration"];

  data!: any;
  catFigures: number[] = [];
  categories: string[] = [];

  ngOnInit() {
    this.data = this.returnData(this.drawGraph("distance"));
  }

  drawGraph(value: keyof IActivity) {
    this.catFigures = [];
    this.categories = [];
    this.categorizedActivities.map(catActivity => {
      let figure: number = 0
      this.categories.push(catActivity.category);
      catActivity.activities.map(activity => {
        figure += activity[value] as number
      })
      this.catFigures.push(figure);
    })
    return this.catFigures
  }

  returnData(figure: number[]) {
    this.data = {
      datasets: [{
          data: this.catFigures,
          backgroundColor: [
              "#42A5F5",
              "#66BB6A",
              "#FFA726",
              "#26C6DA",
              "#7E57C2"
          ],
          label: 'My dataset'
      }],
      labels: this.categories
    };
    return this.data
  }

}
