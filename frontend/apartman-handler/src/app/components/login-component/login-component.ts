import { Component, signal } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { LoginUserDto } from '../../DTO/userDto/login-user-dto';
import { UserService } from '../../services/user-service';
import { ReactiveFormsModule, FormControl, FormGroup, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-login-component',
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './login-component.html',
  styleUrl: './login-component.scss',
})
export class LoginComponent {

  loginForm = new FormGroup({
    userName: new FormControl('',{nonNullable: true, validators: [Validators.required]}),
    password: new FormControl('',{nonNullable: true, validators: [Validators.required]}),
  });

  loginfaild = signal<boolean>(false);

  constructor(
    private readonly router: Router,
    private readonly userService: UserService,
  ){}

  createAccount(){
    this.router.navigate(['create-account']);
  }

  login(){
    const loginUserDto: LoginUserDto = this.loginForm.getRawValue();
    this.userService.login(loginUserDto).subscribe({
      next: (res) => {
        this.router.navigate(['our-story']);
      },
      error: (err) => {
        console.error(err);
        if(err.status == 401) this.loginfaild.set(true);
      }
    });
  }
}
