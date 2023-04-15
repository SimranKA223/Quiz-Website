import { Component, OnInit } from '@angular/core';
import { LoginService } from 'src/app/services/login.service';
import { ResultService } from 'src/app/services/result.service';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-view-user-result',
  templateUrl: './view-user-result.component.html',
  styleUrls: ['./view-user-result.component.css']
})
export class ViewUserResultComponent implements OnInit {
  

  result=[
    {
      result_id:'',
      score:'',
      dateTime:'',
      user:{
        id:'',
        username:'',
        firstName:'',
        lastName:''
      },
      quiz:{
        title:'',
        maxMarks:'',
        numberOfQuestions:''

      }

    },
  ];

  uid:string="19";
  
  id:any;

  p:number=1;

  parseFloat(value: string) {
    return Number.parseFloat(value);
  }

  constructor(private _result:ResultService, private login:LoginService){}

  ngOnInit(): void {

    this.id=this.login.getUserId();

    this._result.getresult().subscribe((data:any)=>{
      this.result=data;
      console.log(this.result);
    },
    (error: any)=>{
      console.log(error);
      Swal.fire('Error!!','Error in loading data','error');
    })
    
  }

}
