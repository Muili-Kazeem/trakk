import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ActivitiesShellComponent } from './activities-shell.component';

const routes: Routes = [
  {
    path: '',
    component: ActivitiesShellComponent,
    // canActivate: [],
    children: [
      {
        path: '',
        redirectTo: 'overview',
        pathMatch: 'full'
      },
      {
        path: 'overview',
        data: { pageTitle: "Overview"},
        loadChildren: () =>
        import("../activities-home/activities-home.module").then(
          (m) => m.ActivitiesHomeModule
        ),
      },
      {
        path: 'stat',
        data: { pageTitle: "Activities Stats"},
        loadChildren: () =>
          import("../stat/stat.module").then(
            (m) => m.StatModule
          )
      },
      {
        path: 'profile',
        data: { pageTitle: "Profile"},
        loadChildren: () =>
          import("../profile/profile.module").then(
            (m) => m.ProfileModule
          )
      },
      {
        path: 'settings',
        data: { pageTitle: "Settings"},
        loadChildren: () =>
          import("../settings/settings.module").then(
            (m) => m.SettingsModule
          )
      },
      {
        path: ':activity',
        data: { pageTitle: "Activity Overview"},
        loadChildren: () =>
          import("../activity-overview/activity-overview.module").then(
            (m) => m.ActivityOverviewModule
          )
      },
      {
        path: ':id/start',
        data: { pageTitle: "New Activity"},
        loadChildren: () =>
          import("../activity-form/activity-form.module").then(
            (m) => m.ActivityFormModule
          ),
      },
      {
        path: ':activity/:id',
        data: { pageTitle: ""},
        loadChildren: () =>
          import("../activity-details/activity-details.module").then(
            (m) => m.ActivityDetailsModule
          )
      },
      {
        path: ':activity/:id/on',
        data: { pageTitle: "Tracking"},
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
