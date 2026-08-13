import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Observable } from 'rxjs';
import { ReactiveFormsModule, FormGroup, FormControl, Validators } from '@angular/forms';
import { CreateUserDto } from '../../DTO/userDto/create-user-dto';
import { UserService } from '../../services/user-service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-create-account-component',
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './create-account-component.html',
  styleUrl: './create-account-component.scss',
})
export class CreateAccountComponent {

  createGroup = new FormGroup({
    userName: new FormControl('', {nonNullable: true, validators: [Validators.required]}),
    password: new FormControl('', {nonNullable: true, validators: [Validators.required]}),
    email: new FormControl('', {nonNullable: true, validators: [Validators.required]}),
    phone: new FormControl('', {nonNullable: true, validators: [Validators.required]}),
    firstname: new FormControl('', {nonNullable: true, validators: [Validators.required]}),
    lastName: new FormControl('', {nonNullable: true, validators: [Validators.required]}),
  });

  existFaild = signal<boolean>(false);
  dataFaild = signal<boolean>(false);

  constructor(
    private readonly router: Router,
    private readonly userService: UserService,
  ){}

  create(){
    const createUserDto: CreateUserDto = this.createGroup.getRawValue();
    this.userService.create(createUserDto).subscribe({
      next: () => {
        this.router.navigate(['login']);
      },
      error: (err) => {
        console.error(err);
        if(err.status == 400) this.dataFaild.set(true);
        if(err.status == 409) this.existFaild.set(true);
      }
    })
  }
}
