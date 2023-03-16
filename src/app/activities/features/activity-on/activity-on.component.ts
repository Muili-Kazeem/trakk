import { Component, OnDestroy, OnInit } from '@angular/core';
import { faBars, faBolt, faClockRotateLeft, faLocationDot, faRoad, faRunning } from '@fortawesome/free-solid-svg-icons';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { ActiveActivityMapComponent } from '../../ui/active-activity-map/active-activity-map.component';
import { Timer } from '../../utils/funcs/timer';

@Component({
  selector: 'app-activity-on',
  templateUrl: './activity-on.component.html',
  styleUrls: ['./activity-on.component.scss'],
  providers: [DialogService]
})
export class ActivityOnComponent implements OnInit, OnDestroy {
  faMenu = faBars;
  faRun = faRunning;
  faRoad = faRoad;
  faTime = faClockRotateLeft;
  faMap = faLocationDot;
  faSpeed = faBolt;

  displayMetricsPane: boolean = true

  timer = new Timer();


  ref!: DynamicDialogRef;


  ngOnInit(): void {
  }

  constructor( private dialogService: DialogService ) {}

  toggleMetricsPane() {
    this.displayMetricsPane = !this.displayMetricsPane;
  }

  showMap() {
    this.ref = this.dialogService.open(ActiveActivityMapComponent, {
        width: '80%',
        height: '100%',
        contentStyle: {"overflow": "auto"},
        baseZIndex: 10000,
        maximizable: true
    });

    // this.ref.onClose.subscribe((product: Product) => {
    //     if (product) {
    //         this.messageService.add({severity:'info', summary: 'Product Selected', detail: product.name});
    //     }
    // });

    // this.ref.onMaximize.subscribe((value: any) => {
    //     this.messageService.add({severity: 'info', summary: 'Maximized', detail:  `maximized: ${value.maximized}`});
    // });
  }

  ngOnDestroy(): void {
    if (this.ref) {
      this.ref.close();
    }
  }
}
