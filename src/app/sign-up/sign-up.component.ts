import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss']
})
export class SignUpComponent implements OnInit {

  public signupForm !: FormGroup;
  constructor(private formBuilder : FormBuilder, private http: HttpClient, private router: Router) { }

  ngOnInit(): void {
    this.signupForm = this.formBuilder.group({
      username:['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
    })
  }

  singUp(){
    this.http.post<any>('http://localhost:3000/signUpUsers', this.signupForm.value).subscribe(res=> {
      alert("SingUp Berhasil, silakan Login yaa..");
      this.signupForm.reset();
      this.router.navigate(['login'])
    }, err=> {
      alert("Ada sesuatu yang terjadi..")
    })
  }

}
