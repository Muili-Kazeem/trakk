import { Component, Input, OnInit } from '@angular/core';
import { ICategorizedActivity } from '../../utils/models/iactivity';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-graph-card',
  templateUrl: './graph-card.component.html',
  styleUrls: ['./graph-card.component.scss']
})
export class GraphCardComponent implements OnInit {
  @Input() categorizedActivities!: Observable<ICategorizedActivity[]>;
  data!: any;
  catFigures: number[] = [];
  categories: string[] = [];

  ngOnInit() {
    this.categorizedActivities.subscribe(
      catActivities => {
        catActivities.map(catActivity => {
          let figure: number = 0
          this.categories.push(catActivity.category);
          catActivity.activities.map(activity => {
            figure += activity.distance
          })
          this.catFigures.push(figure);
        })
      }
    )

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
  }
}
