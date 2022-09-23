import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Vehicle} from "../models/Vehicle";

@Injectable({ providedIn: 'root' })
export class VehicleHttpService {
  private readonly API_URL = "https://63284cd4a2e90dab7bdcec06.mockapi.io/vehicle";

  constructor(private http: HttpClient) {
  }

  public getAll(): Observable<Vehicle[]> {
    return this.http.get<Vehicle[]>(`${this.API_URL}`);
  }

  public get(id: number): Observable<Vehicle> {
    return this.http.get<Vehicle>(`${this.API_URL}/${id}`);
  }

  public create(vehicle: Vehicle) {
    return this.http.post<void>(`${this.API_URL}`, vehicle);
  }

  public update(vehicle: Vehicle) {
    return this.http.put<void>(`${this.API_URL}/${vehicle.id}`, vehicle);
  }

  public delete(id: number): Observable<Vehicle> {
    return this.http.delete<Vehicle>(`${this.API_URL}/${id}`);
  }
}
