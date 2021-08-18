import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DataService 
{
  currentUser=""
  currentAcc=""
  user:any = {
    1000: {
      acno: 1000,
      username: "userone",
      password: "userone",
      balance: 50000,
      transaction:[]
    },
    1001: {
      acno: 1001,
      username: "usertwo",
      password: "usertwo",
      balance: 5000,
      transaction:[]
    },
    1002: {
      acno: 1002,
      username: "userthree",
      password: "userthree",
      balance: 10000,
      transaction:[]
    },
    1003: {
      acno: 1003,
      username: "userfour",
      password: "userfour",
      balance: 6000,
      transaction:[]
    }
  }

  constructor() { 
    this.getDetails()
  }
  saveDetails()
  {
    
    localStorage.setItem("user",JSON.stringify(this.user))
    
    if(this.currentUser)
    {
      localStorage.setItem("currentUser",JSON.stringify(this.currentUser))

    }
    if(this.currentAcc)
    {
      localStorage.setItem("currentAcc",JSON.stringify(this.currentAcc))

    }
  }
  getDetails()
  {
    if(localStorage.getItem("user"))
    this.user=JSON.parse(localStorage.getItem("user")|| "")
    if(localStorage.getItem("currentUser"))
    {
      this.currentUser=JSON.parse(localStorage.getItem("currentUser")|| "")
    }
    if(localStorage.getItem("currentAcc"))
    {
      this.currentAcc=JSON.parse(localStorage.getItem("currentAcc")|| "")
    }
  }
  getTransaction()
  {
    console.log(this.user[this.currentAcc].transaction)
    return this.user[this.currentAcc].transaction
  }
  register(acno:any,username:any,password:any)
  {
    let accDetails=this.user
    if(acno in accDetails)
    {
      
      return false
    }
      else
      {
        accDetails[acno]=
        {
          acno,
          username,
          password,
          balance:0,
          transaction:[]
        }
        this.saveDetails()
        return true

      
    }
  }

  login(acno:any,pswd:any)
  {
    let accDetails=this.user

    if(acno in accDetails)
    {
      if(pswd==accDetails[acno]["password"])
      {
        this.currentUser=accDetails[acno]["username"]
        this.currentAcc=acno
        alert("login succesful")
        this.saveDetails()
        return true

    }
      else
      { 
      alert("incorrect password")
      return false
    }
  }
  else{
    alert("invalid user")
    return false
  }
}
  deposit(acno:any,pswd:any,amt:any)
  {
    var amount =parseInt(amt)
    let accDetails=this.user
    if(acno in accDetails)
    {
      if(pswd==accDetails[acno]["password"])
      {
        accDetails[acno]["balance"]+=amount
        accDetails[acno].transaction.push({
          amount:amount,
          type:"CREDIT"
        })
        this.saveDetails()
        console.log(accDetails[acno].transaction)
        return accDetails[acno]["balance"]
      }
      else
      { 
      alert("incorrect password")
      return false
       }
  
    }
    else
    {
      alert("invalid user")
      return false
    }

  }
  withdraw(acno:any,pswd:any,amt:any)
  {
    var amount =parseInt(amt)
    let accDetails=this.user
    if(acno in accDetails)
    {
      if(pswd==accDetails[acno]["password"])
      { 
        if(accDetails[acno]["balance"]>amt)
      {
        accDetails[acno]["balance"]-=amount
        accDetails[acno].transaction.push({
          amount:amount,
          type:"DEBIT"
        })
        this.saveDetails()
        return accDetails[acno]["balance"]
      }
      else{
        alert("insufficient balance")
      }
    }
      else
      { 
      alert("incorrect password")
      return false
       }
  
    }
    else
    {
      alert("invalid user")
      return false
    }

  }
  
  }

