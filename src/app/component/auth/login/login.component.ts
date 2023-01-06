import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {HttpClient} from "@angular/common/http";
import {AuthService} from "../../../_services/auth/auth.service";
import {TokenService} from "../../../_services/token/token.service";
import {BehaviorSubject, Observable, of} from "rxjs";
import {AppState} from "../../../_interfaces/app-state";
import {catchError, map, startWith} from "rxjs/operators";
import {DataState} from "../../../_enum/data.state.enum";
import {NotifsService} from "../../../_services/notifications/notifs.service";
import {Signin} from "../../../_model/signin";
import {CustomResponse} from "../../../_interfaces/custom-response";
import {Signup} from "../../../_model/signup";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  socity = 'OPAM';
  loginForm: FormGroup;
  appState$: Observable<AppState<CustomResponse<Signin>>> = new Observable<AppState<CustomResponse<Signin>>>();
  private isLoading = new BehaviorSubject<boolean>(false);
  isLoading$ = this.isLoading.asObservable();
  readonly DataState = DataState;
  private dataSubject = new BehaviorSubject<CustomResponse<Signin>>(null);
  form: any;

  constructor(
    private fb: FormBuilder, private http: HttpClient, private authService: AuthService, private tokenService: TokenService,
    private notifService: NotifsService
  ) {
    this.formLogin()
    this.form = this.loginForm.controls;
  }

  formLogin(){
    this.loginForm = this.fb.group({
      username: ['', [Validators.required, Validators.minLength(4)]],
      password: ['', [Validators.required, Validators.pattern("^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$")]]
    });
  }

  ngOnInit(): void {

  }

  onSubmit() {
    this.isLoading.next(true);
    this.appState$ = this.authService.login$(this.loginForm.value as Signin)
      .pipe(
        map((response) => {
          console.log('la reponse', response.access_token)
          this.tokenService.saveToken(response);
          this.notifService.onSuccess(`Bienvenue ${response.username}`)
          this.isLoading.next(false);
          return {dataState: DataState.LOADED_STATE, appData: null};
        }),
        startWith({dataState: DataState.LOADING_STATE, appData: null}),
        catchError((error => {
          this.isLoading.next(false);
          return of({dataState: DataState.ERROR_STATE, error: error});
        }))
      );
  }

}
