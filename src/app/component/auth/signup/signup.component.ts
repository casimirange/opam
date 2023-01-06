import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {AuthService} from "../../../_services/auth/auth.service";
import {Signup} from "../../../_model/signup";
import {BehaviorSubject, Observable, of} from "rxjs";
import {DataState} from "../../../_enum/data.state.enum";
import {AppState} from "../../../_interfaces/app-state";
import {catchError, map, startWith} from "rxjs/operators";
import {Router} from "@angular/router";
import {CustomResponse} from "../../../_interfaces/custom-response";
import {NotifsService} from "../../../_services/notifications/notifs.service";

@Component({
  selector: 'app-logout',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  socity = 'OPAM';
  signupForm: FormGroup;
  appState$: Observable<AppState<CustomResponse<Signup>>> = new Observable<AppState<CustomResponse<Signup>>>();
  private isLoading = new BehaviorSubject<boolean>(false);
  isLoading$ = this.isLoading.asObservable();
  readonly DataState = DataState;
  private dataSubject = new BehaviorSubject<CustomResponse<Signup>>(null);
  form: any;

  constructor(private fb: FormBuilder, private authService: AuthService, private router: Router, private notifService: NotifsService) {
    this.formSignup()
    this.form = this.signupForm.controls;
  }

  formSignup() {
    this.signupForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      phone: ['', [Validators.required, Validators.pattern('^[2,6][0-9]{8}'), Validators.minLength(9), Validators.maxLength(9)]],
      username: ['', [Validators.required, Validators.minLength(4)]],
      password: ['', [Validators.required, Validators.pattern("^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*+./-]).{8,}$")]],
    });
  }

  ngOnInit(): void {

  }


  onSubmit() {
    this.isLoading.next(true);

    this.appState$ = this.authService.signup$(this.signupForm.value as Signup)
      .pipe(
        map((response) => {
            this.isLoading.next(false);
            this.notifService.onSuccess('Utilisateur enregistré')
            return {dataState: DataState.LOADED_STATE, appData: null};
          }
        ),
        startWith({dataState: DataState.LOADING_STATE, appData: null}),
        catchError((error => {
          this.isLoading.next(false);
          return of({dataState: DataState.ERROR_STATE, error: error});
        }))
      );
  }

}
