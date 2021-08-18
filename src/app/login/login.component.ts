import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { DataService } from '../service/data.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  aim="you banking partner"
  accno="enter accno"
  acno=""
  pswd=""
  loginform=this.fb.group({
    acno:['',[Validators.required,Validators.minLength(4),Validators.pattern('[0-9]*')]],
    pswd:['',[Validators.required,Validators.minLength(4),Validators.pattern('[0-9a-zA-Z]*')]]
  }
  )
  
  constructor(private router:Router, private ds:DataService, private fb:FormBuilder) { }

  ngOnInit(): void {
  }
  

  login()
  {
    if(this.loginform.valid)
    { var acno=this.loginform.value.acno
      var pswd=this.loginform.value.pswd
      var result=this.ds.login(acno,pswd)
      if(result)
      {
        alert("login successfull")
        this.router.navigateByUrl("dashboard")
      }

    }
   
  }   
}
