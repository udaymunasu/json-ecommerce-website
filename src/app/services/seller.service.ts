import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class SellerService {
  constructor(private http: HttpClient, private router: Router) {}

  userSignUp(data: any) {
    this.http
      .post('http://localhost:3000/seller', data, { observe: 'response' })
      .subscribe((result) => {
        console.warn(result);
        if (result) {
          localStorage.setItem('seller', JSON.stringify(result.body));
          this.router.navigate(['seller/seller-home']);
        }
      });
  }
}
