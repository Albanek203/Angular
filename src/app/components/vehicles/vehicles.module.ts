import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {MatProgressSpinnerModule} from "@angular/material/progress-spinner";
import {MatSnackBarModule} from "@angular/material/snack-bar";
import {MatIconModule} from "@angular/material/icon";
import {MatButtonModule} from "@angular/material/button";
import {MatTableModule} from "@angular/material/table";
import {VehicleListComponent} from './vehicle-list/vehicle-list.component';
import {VehicleComponent} from './vehicle/vehicle.component';
import {RouterModule, Routes} from "@angular/router";
import {MatInputModule} from "@angular/material/input";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";

const routes: Routes = [
  { path: '', component: VehicleListComponent },
  { path: 'item', component: VehicleComponent },
  { path: 'item/:id', component: VehicleComponent }
]

@NgModule({
  declarations: [
    VehicleListComponent,
    VehicleComponent
  ],
  imports: [
    RouterModule.forChild(routes),
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    MatTableModule,
    MatButtonModule,
    MatIconModule,
    MatSnackBarModule,
    MatProgressSpinnerModule,
    RouterModule,
    MatInputModule,
  ],
  exports: [
    RouterModule,
    VehicleListComponent
  ],
  providers: []
})
export class StudentModule {
}
