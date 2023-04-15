import { Component, OnInit } from '@angular/core';
import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  user:any=null;

  constructor(private login:LoginService){

  }

  ngOnInit(): void {

    //use when calling from localStorage
    this.user=this.login.getUser();
    /*
    use when calling from server

    this.login.getCurrentUser().subscribe(
      (user:any)=>{
        this.user=user;
      },
      (error)=>{
        alert('error');
      }
    )*/
  }
}
