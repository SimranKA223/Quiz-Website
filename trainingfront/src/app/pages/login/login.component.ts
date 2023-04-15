import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  
  loginData={
    username:'',
    password:'',
  };

  constructor(private snack:MatSnackBar, private login:LoginService, private router:Router){}

  ngOnInit(): void {
    
  }

  formSubmit(){
    console.log('login btn click');

    if(this.loginData.username.trim()=='' || this.loginData.username==null){
      this.snack.open('Username is required','',{duration:3000});
      return;
    }

    if(this.loginData.password.trim()=='' || this.loginData.password==null){
      this.snack.open('password is required','',{duration:3000});
      return;
    }

    //request server to generate token
    this.login.generateToken(this.loginData).subscribe(
      (data:any)=>{
        console.log('success');
        console.log(data);

        //login
        this.login.loginUser(data.token);
        this.login.getCurrentUser().subscribe(
          (user:any)=>{
            this.login.setUser(user);
            console.log(user);
            //if admin or normal
            if(this.login.getUserRole()=="ADMIN"){
              this.router.navigate(['admin']);
              //it tells navbar that user is logged in , so change itself
              this.login.loginStatusSubject.next(true);
            }else if(this.login.getUserRole()=="NORMAL"){
              this.router.navigate(['user-dashboard/0']);
              this.login.loginStatusSubject.next(true);
            }else{
              //logout
              this.login.logout();
            }
          }
        );

      },
      (error)=>{
        console.log('error');
        console.log(error);
        this.snack.open("Invalid!",'',{duration:3000,})
      }
    );

  }

}
