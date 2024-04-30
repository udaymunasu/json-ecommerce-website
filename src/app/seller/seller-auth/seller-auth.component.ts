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
  sellerLogin: any = {};
  showLogin: boolean;

  authError: String = '';
  constructor(private seller: SellerService) {}

  ngOnInit(): void {
    this.seller.reloadSeller()
  }

  onSubmit() {
    if (this.step === 3) {
      console.log('foerm Data', this.formData);
      this.signUp();
    }
  }

  openLogin() {
    this.showLogin = true;
  }
  openSignUp() {
    this.showLogin = false;
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
    this.seller.userSignUp(this.formData);
  }

  login(): void {
    this.seller.userLogin(this.sellerLogin);
    this.seller.isLoginError.subscribe((isError)=>{
      if(isError){
        this.authError="Email or password is not correct";
      }
    })
  }
}
