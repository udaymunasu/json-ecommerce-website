import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { SellerService } from 'src/app/services/seller.service';

@Component({
  selector: 'app-seller-auth',
  templateUrl: './seller-auth.component.html',
  styleUrls: ['./seller-auth.component.scss'],
})
export class SellerAuthComponent implements OnInit {
  step: number = 1;
  formData: any = {};
  showLogin: boolean;

  constructor(private seller: SellerService) {}

  ngOnInit(): void {}


  

  onSubmit() {
    if (this.step === 3) {
      console.log('foerm Data', this.formData);
      this.signUp()
    }
  }

  nextStep() {
    if (this.step < 3) {
      this.step++;
    }
  }

  prevStep() {
    if (this.step > 1) {
      this.step--;
      console.log('this.step', this.step);
    }
  }

  signUp() {
    console.log('foerm Data', this.formData);
    this.seller.userSignUp( this.formData)
  }
}
