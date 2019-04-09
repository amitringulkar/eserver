import { Component, OnInit } from '@angular/core';
import { Validators, FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { UsernameValidator } from '../validators/username.validator';
import { PasswordValidator } from '../validators/password.validator';
import { Router } from '@angular/router';
import {user_info} from './user_info';
import {HttpClient , HttpErrorResponse} from '@angular/common/http';
// import { LoginService } from '../login.service';
// import { User } from '../user';

@Component({
  selector: 'app-form',
  templateUrl: './form.page.html',
  styleUrls: ['./form.page.scss'],
})
export class FormPage implements OnInit {

  validations_form: FormGroup;
  user_info: user_info [];
  user_info_string: any;
  matching_passwords_group: FormGroup;
  constructor(
    public formBuilder: FormBuilder,
    private router: Router,
    private httpClient: HttpClient
    // private loginService : LoginService,
  ) { }


  validation_messages = {
    'username': [
      { type: 'required', message: 'Username is required.' },
      { type: 'minlength', message: 'Username must be at least 5 characters long.' },
      { type: 'maxlength', message: 'Username cannot be more than 25 characters long.' },
      { type: 'pattern', message: 'Your username must contain only numbers and letters.' },
      { type: 'validUsername', message: 'Your username has already been taken.' }
    ],
    'email': [
      { type: 'required', message: 'Email is required.' },
      { type: 'pattern', message: 'Please wnter a valid zensar email.' }
    ],
    'password': [
      { type: 'required', message: 'Password is required.' },
      { type: 'minlength', message: 'Password must be at least 5 characters long.' },
      { type: 'pattern', message: 'Your password must contain at least one uppercase, one lowercase, and one number.' }
    ],
  };

  ngOnInit() {
    //Validation for Login 
    this.validations_form = this.formBuilder.group({
      username: new FormControl('', Validators.compose([
       UsernameValidator.validUsername,
       Validators.maxLength(25),
       Validators.minLength(5),
       Validators.pattern('^(?=.*[a-zA-Z])(?=.)[a-zA-Z0-9]+$'),
        Validators.required
      ])),
      email: new FormControl('', Validators.compose([
        Validators.required,
        Validators.pattern('^[a-zA-Z0-9_.+-]+@[zensar]+.[a-zA-Z0-9-.]+$')
      ])),
      password: new FormControl('', Validators.compose([
        PasswordValidator.areEqual,
        Validators.minLength(5),
        Validators.required,
        Validators.pattern('^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])[a-zA-Z0-9]+$')
      ]))
    });

    this.httpClient.get('assets/json/login_data.json').subscribe(
      (data) => {
        this.user_info = data as user_info[];
        this.user_info_string = JSON.stringify(this.user_info);
         console.log('data access ' + this.user_info_string);
      }
    );


  }

  onSubmit(values) {
    console.log(values);
    // console.log('data Username Access : ' + localStorage.getItem('username'));
    this.router.navigate(['/home']);
   /* const user = new User;
   user.email = values.email;
   user.password = values.password;
    this.loginService.login(user).subscribe((res) => {
      console.log( 'Valid user' , res); */
}
  }

