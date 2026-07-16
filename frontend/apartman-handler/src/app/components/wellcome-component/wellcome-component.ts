import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-wellcome',
  imports: [],
  templateUrl: './wellcome-component.html',
  styleUrl: './wellcome-component.scss',
})
export class WellcomeComponent {

  constructor(private readonly router: Router){}

  bookNow(){
    this.router.navigate(['login']);
  }
}
