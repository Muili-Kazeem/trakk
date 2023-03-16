import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { InputTextModule} from 'primeng/inputtext';
import { SidebarModule } from 'primeng/sidebar';
import { ButtonModule } from 'primeng/button';
import { AutoCompleteModule } from 'primeng/autocomplete';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { DividerModule } from 'primeng/divider';
import { DynamicDialogModule } from 'primeng/dynamicdialog';
import { TableModule } from 'primeng/table';
import { ToastModule } from 'primeng/toast';
import { ChartModule } from 'primeng/chart';
import { SkeletonModule } from 'primeng/skeleton';
import { RippleModule } from 'primeng/ripple';
import { TooltipModule } from 'primeng/tooltip';
import { AvatarModule } from 'primeng/avatar'



@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    FontAwesomeModule,
    InputTextModule,
    SidebarModule,
    ButtonModule,
    AutoCompleteModule,
    InputTextareaModule,
    DividerModule,
    DynamicDialogModule,
    ToastModule,
    TableModule,
    ButtonModule,
    ChartModule,
    SkeletonModule,
    RippleModule,
    TooltipModule,
    AvatarModule
  ],
  exports: [
    FontAwesomeModule,
    InputTextModule,
    SidebarModule,
    ButtonModule,
    AutoCompleteModule,
    InputTextareaModule,
    DividerModule,
    DynamicDialogModule,
    ToastModule,
    TableModule,
    ButtonModule,
    ChartModule,
    SkeletonModule,
    RippleModule,
    TooltipModule,
    AvatarModule
  ]
})
export class PrimeNgModule { }
