import {Component, OnDestroy, OnInit} from '@angular/core';
import {Vehicle} from "../../../models/Vehicle";
import {VehicleHttpService} from "../../../service/vehicle-http.service";
import {MatSnackBar} from "@angular/material/snack-bar";
import {finalize} from "rxjs";

@Component({
  selector: 'app-vehicles-list',
  templateUrl: './vehicle-list.component.html',
  styleUrls: ['./vehicle-list.component.scss']
})

export class VehicleListComponent implements OnInit {
  displayedColumns: string[] = ['id', 'manufacturer', 'model', 'type', 'color', 'year', 'action'];
  vehicles: Vehicle[] = [];
  initialized: boolean = false;

  constructor(private vehicleHttpService: VehicleHttpService,
              private matSnackBar: MatSnackBar) {
    this.getVehicles();
  }

  ngOnInit(): void {
  }

  getVehicles() {
    this.vehicleHttpService.getAll()
      .pipe(finalize(() => this.initialized = true))
      .subscribe({
        next: (vehicles) => this.vehicles = vehicles,
        error: (error) => this.matSnackBar.open(`Error ${error.statusText}`)
      });
}

  addVehicle() {

  }

  deleteVehicle(vehicle: Vehicle) {
    this.vehicleHttpService.delete(vehicle.id)
      .subscribe({
        next: () => {
          this.vehicles = this.vehicles.filter(item => item.id !== vehicle.id);
          this.matSnackBar.open(`Vehicle [${vehicle.manufacturer} ${vehicle.model}] was deleted`);
        },
        error: (error) => this.matSnackBar.open(`Error ${error.statusText}`)
      });
  }
}
