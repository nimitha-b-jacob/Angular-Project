import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { DataService } from '../service/data.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  
  depositForm=this.fb.group({
    acno:['',[Validators.required,Validators.minLength(4),Validators.pattern('[0-9]*')]],
    amount:['',[Validators.required,Validators.pattern('[0-9]*')]],
    pswd:['',[Validators.required,Validators.minLength(4),Validators.pattern('[0-9a-zA-Z]*')]]

  })
  withdrawForm=this.fb.group({
    acno:['',[Validators.required,Validators.minLength(4),Validators.pattern('[0-9]*')]],
    amount:['',[Validators.required,Validators.pattern('[0-9]*')]],
    pswd:['',[Validators.required,Validators.minLength(4),Validators.pattern('[0-9a-zA-Z]*')]]

  })

user=this.ds.currentUser

  constructor(public ds:DataService, private fb:FormBuilder) { }

  ngOnInit(): void {
  }
deposit()
{
  if(this.depositForm.valid)
  {
    var acno=this.depositForm.value.acno
    var pswd=this.depositForm.value.pswd
    var amount=this.depositForm.value.amount
   var result= this.ds.deposit(acno,pswd,amount)
   if(result)
   {
    alert("Amount" +amount+ "credited.New balance is" +result)
  
   }
  }
  else
  {
    alert("Invalid Form")
  }
  
  
}

withdraw()
{
  if(this.withdrawForm.valid)
  {
    var acno=this.withdrawForm.value.acno
    var pswd=this.withdrawForm.value.pswd
    var amount=this.withdrawForm.value.amount
   var result= this.ds.withdraw(acno,pswd,amount)
   if(result)
   {
    alert("Amount" +amount+ "debited.New balance is" +result)
  
   }
  }
  else
  {
    alert("Invalid Form")
  }
  
 
}
}
