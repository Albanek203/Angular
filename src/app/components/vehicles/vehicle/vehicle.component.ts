import {Component, Input, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {VehicleHttpService} from "../../../service/vehicle-http.service";
import {first} from "rxjs";
import {MatSnackBar} from "@angular/material/snack-bar";
import {ActivatedRoute, Router} from "@angular/router";
import {Vehicle} from "../../../models/Vehicle";

@Component({
  selector: 'app-vehicle',
  templateUrl: './vehicle.component.html',
  styleUrls: ['./vehicle.component.scss']
})
export class VehicleComponent implements OnInit {

  isUpdateForm: boolean = false;
  loading: boolean = false;
  formGroup!: FormGroup;
  vehicle?: Vehicle;

  constructor(private vehicleHttpService: VehicleHttpService,
              private formBuilder: FormBuilder,
              private matSnackBar: MatSnackBar,
              private router: Router,
              private activatedRoute: ActivatedRoute) {
    this.initFormGroup();
    let vehicleId = activatedRoute.snapshot.params['id'];
    if (vehicleId) {
      this.isUpdateForm = true;
      this.getVehicle(vehicleId);
    }
  }

  ngOnInit(): void {
  }

  initFormGroup() {
    this.formGroup = this.formBuilder.group({
      manufacturer: [null, Validators.required],
      model: [null, Validators.required],
      type: [null, Validators.required],
      color: [null, Validators.required],
      year: [null, Validators.required]
    });
  }

  getVehicle(id: number) {
    this.vehicleHttpService.get(id)
      .pipe(first())
      .subscribe({
        next: vehicle => {
          this.vehicle = vehicle;
          this.formGroup.patchValue(vehicle);
        },
        error: error => {
          this.matSnackBar.open(`Error load vehicle [${error.statusText}]`);
        }
      })

  }

  saveVehicle() {
    this.loading = true;
    let vehicle = this.formGroup.value;
    if (vehicle) {
      this.updateVehicle({ ...vehicle, id: this.vehicle?.id });
    } else {
      this.createVehicle(vehicle);
    }
  }

  createVehicle(vehicle: Vehicle) {
    this.vehicleHttpService.create(vehicle).pipe(first()).subscribe({
      next: () => {
        this.loading = false;
        this.matSnackBar.open("Vehicle created");
        this.router.navigate(["/vehicles"]);
      },
      error: error => {
        this.matSnackBar.open(`Error creating vehicle [${error.statusText}]`);
        this.loading = false;
      }
    });
  }

  updateVehicle(vehicle: Vehicle) {
    this.vehicleHttpService.update(vehicle).pipe(first()).subscribe({
      next: () => {
        this.loading = false;
        this.matSnackBar.open("Vehicle updated");
        this.router.navigate(["/vehicles"]);
      },
      error: error => {
        this.matSnackBar.open(`Error updating vehicle [${error.statusText}]`);
        this.loading = false;
      }
    });
  }
}
