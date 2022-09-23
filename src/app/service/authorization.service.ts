import {Injectable} from "@angular/core";
import {AuthorizeCredentials} from "../models/AuthorizeCredentials";
import {Router} from "@angular/router";
import {BehaviorSubject, finalize, first, retry} from "rxjs";
import {User} from "../models/User";
import {UserHttpService} from "./user-http.service";
import {MatSnackBar} from "@angular/material/snack-bar";

@Injectable({ providedIn: 'root' })
export class AuthorizationService {
  private readonly USER_KEY = "USER";
  private _isLoginIn: boolean = false;
  private _isLoginIn$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false)

  constructor(private userHttpService: UserHttpService,
              private router: Router,
              private matSnackBar: MatSnackBar,) {
    if (this.isAuthorizedInLocalStorage()) {
      this._isLoginIn = true;
      this._isLoginIn$.next(this._isLoginIn);
    }
  }

  isLoggedIn(): boolean {
    return this._isLoginIn;
  }

  login(authorizeCredentials: AuthorizeCredentials) {
    this.userHttpService.getAll()
      .pipe(first())
      .subscribe(users => {
          let user = users.filter(x => x.email === authorizeCredentials.email && x.password === authorizeCredentials.password).pop();
          if (user) {
            this._isLoginIn = true;
            this.setUserToLocalStorage(user);
            this._isLoginIn$.next(this._isLoginIn);
            this.router.navigate(['/vehicles']);
          } else {
            this._isLoginIn = false;
            this.matSnackBar.open(`Invalid credentials`);
          }
        }
      );
  }

  logout() {
    this._isLoginIn = false;
    this.deleteUserFromLocalStorage();
    this._isLoginIn$.next(this._isLoginIn);
    this.router.navigate(["/"]);
  }

  getUserEmail(): string {
    return this.getUserFromLocalStorage()?.email || "";
  }

  public isAuthorizedInLocalStorage() {
    return this.getUserFromLocalStorage() !== null;
  }

  private setUserToLocalStorage(user: User) {
    localStorage.setItem(this.USER_KEY, JSON.stringify(user));
  }

  private getUserFromLocalStorage(): User | null {
    const user: string | null = localStorage.getItem(this.USER_KEY);
    return user ? JSON.parse(user) : null;
  }

  private deleteUserFromLocalStorage() {
    localStorage.removeItem(this.USER_KEY);
  }
}
