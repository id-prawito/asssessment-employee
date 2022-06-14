import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthServices } from '../auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  public loginForm!: FormGroup;
  constructor(private formBuilder : FormBuilder, private http: HttpClient, private router: Router, private authServices: AuthServices) { }

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
    })
  }

  login(){
    this.http.get<any>('http://localhost:3000/signUpUsers').subscribe(res=> {
      const user = res.find((dataUser: any, )=> {
        return dataUser.username === this.loginForm.value.username && dataUser.password === this.loginForm.value.password;
      })
      if(user){
        alert("Login berhasil kawan..");
        this.loginForm.reset();
        this.router.navigate(['employee-dashboard']);
        this.authServices.login();
      } else {
        alert("Yah data user salah atau tidak ada, silahkan coba lagi atau daftar")
      }
    }, err=>{
      alert("wah, ada sesuatu yang salah nih.")
    })
  }

}
