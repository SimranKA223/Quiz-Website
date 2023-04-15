import { Component, OnInit } from '@angular/core';
import { ResultService } from 'src/app/services/result.service';
import Swal from 'sweetalert2';
import { ngxCsv } from 'ngx-csv';



@Component({
  selector: 'app-view-result',
  templateUrl: './view-result.component.html',
  styleUrls: ['./view-result.component.css']
})
export class ViewResultComponent implements OnInit{
  
 
  result: {
    result_id: string;
    score: string;
    dateTime: string;
    user: {
      id: string;
      username: string;
      firstName: string;
      lastName: string;
    };
    quiz: {
      title: string;
      maxMarks: string;
      numberOfQuestions: string;
    };
  }[] = [];
  

  _filteredText:string='';
  filteredResult: {
    result_id: string;
    score: string;
    dateTime: string;
    user: {
      id: string;
      username: string;
      firstName: string;
      lastName: string;
    };
    quiz: {
      title: string;
      maxMarks: string;
      numberOfQuestions: string;
    };
  }[] = [];

  
  get filterText(){
    return this._filteredText;
  }

  set filterText(value: string){
    this._filteredText=value;
    this.filteredResult=this.filterResultByUsername(value);
  }
  

  nsearch:string='';

  p:number=1;

  parseFloat(value: string) {
    return Number.parseFloat(value);
  }

  
  exportCSV(){
    var options={
      title:'User Details',
      fieldSeparator:',',
      quoteStrings:'"',
      decimalseparator:'.',
      showLabels:false,
      noDownload:false,
      showTitle:false,
      useBom:false,
      headers: ['Username', 'Quiz Title', 'Score', 'Number of Questions', 'Date']
    };

    const data = this.result.map((r) => [
      r.user.username,
      r.quiz.title,
      r.score,
      r.quiz.numberOfQuestions,
      r.dateTime
    ]);

    new ngxCsv(data, "report", options)
  }


  constructor(private _result:ResultService){}

  ngOnInit(): void {
    
    this._result.getresult().subscribe((data:any)=>{
      this.result=data;
      this.filteredResult=this.result;
      console.log(this.result);
    },
    (error: any)=>{
      console.log(error);
      Swal.fire('Error!!','Error in loading data','error');
    })

       

  }

  
  filterResultByUsername(filterTerm: string){
    if(this.result.length===0 || this.filterText===''){
      return this.result;
    }else{
      return this.result.filter((result)=>{
        return result.user.username.toLowerCase()===filterTerm.toLowerCase();
      })
    }
  }
  

}
