import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {User} from "../models/User";

@Injectable({ providedIn: 'root' })
export class UserHttpService {
  private readonly API_URL = "https://63284cd4a2e90dab7bdcec06.mockapi.io/user";

  constructor(private http: HttpClient) {
  }

  public getAll(): Observable<User[]> {
    return this.http.get<User[]>(`${this.API_URL}`);
  }

  public get(id: number): Observable<User> {
    return this.http.get<User>(`${this.API_URL}/${id}`);
  }

  public delete(id: number): Observable<User> {
    return this.http.delete<User>(`${this.API_URL}/${id}`);
  }
}
