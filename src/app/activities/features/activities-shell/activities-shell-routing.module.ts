import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ActivitiesShellComponent } from './activities-shell.component';

const routes: Routes = [
  {
    path: '',
    component: ActivitiesShellComponent,
    children: [
      {
        path: '',
        loadChildren: () =>
        import("../activities-home/activities-home.module").then(
          (m) => m.ActivitiesHomeModule
        ),
      },
      {
        path: 'stat',
        loadChildren: () =>
          import("../stat/stat.module").then(
            (m) => m.StatModule
          )
      },
      {
        path: 'profile',
        loadChildren: () =>
          import("../profile/profile.module").then(
            (m) => m.ProfileModule
          )
      },
      {
        path: 'settings',
        loadChildren: () =>
          import("../settings/settings.module").then(
            (m) => m.SettingsModule
          )
      },
      {
        path: ':activity',
        loadChildren: () =>
          import("../activity-overview/activity-overview.module").then(
            (m) => m.ActivityOverviewModule
          )
      },
      {
        path: ':id/start',
        loadChildren: () =>
          import("../activity-form/activity-form.module").then(
            (m) => m.ActivityFormModule
          ),
      },
      {
        path: ':activity/:id',
        loadChildren: () =>
          import("../activity-details/activity-details.module").then(
            (m) => m.ActivityDetailsModule
          )
      },
      {
        path: ':activity/:id/on',
        loadChildren: () =>
          import("../activity-on/activity-on.module").then(
            (m) => m.ActivityOnModule
          )
      },
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ActivitiesShellRoutingModule { }
