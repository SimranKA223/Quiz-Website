import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { CateogoryService } from 'src/app/services/cateogory.service';
import { QuizService } from 'src/app/services/quiz.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-view-quizzes',
  templateUrl: './view-quizzes.component.html',
  styleUrls: ['./view-quizzes.component.css']
})
export class ViewQuizzesComponent implements OnInit {

  quizzes=[
    {
      qId:23,
      title:'Basic Java Quiz',
      description:'inheritance',
      maxMarks:'50',
      numberOfQuestions:'10',
      active:'',
      category:{
        title:'Programming'
      }
    },
    {
      qId:23,
      title:'Basic Java Quiz',
      description:'',
      maxMarks:'50',
      numberOfQuestions:'10',
      active:'',
      category:{
        title:'Programming'
      }
    }
  ]

  categories=[
    {
      cid:'',
      title:'',
      description:'',
    },
  ]

  

  nameSearch: string='';
  p:number=1;

  
  

  constructor(private _quiz:QuizService,private _category:CateogoryService){

  }

  ngOnInit(): void {

    this._quiz.quizzes().subscribe(
      (data:any)=>{
        this.quizzes=data;
        console.log(this.quizzes);
      },
      (error)=>{
        console.log("error");
        Swal.fire('Error',"Error in loading data",'error');
      }
    )

    this._category.categories().subscribe((data:any)=>{
      this.categories=data;
      console.log(this.categories);
    },
    (error)=>{
      console.log(error);
      Swal.fire('Error!!','Error in loading data','error');
    })

  }

  //delete
  deleteQuiz(qId: any){
    Swal.fire({
      icon:'info',
      title: 'Are you sure ?',
      confirmButtonText:'Delete',
      showCancelButton:true,
    }).then((result)=>{
      if(result.isConfirmed){
        this._quiz.deleteQuiz(qId).subscribe((data)=>{
          this.quizzes=this.quizzes.filter((quiz)=>quiz.qId!=qId);
          Swal.fire('Success','Quiz deleted','success');
        },(error)=>{
          Swal.fire('Error','error','error');
        });
      }
    })
  }

  /*
  filterResultByUsername(filterTerm: string){
    if(this.quizzes.length===0 || this.filterText===''){
      return this.quizzes;
    }else{
      return this.quizzes.filter((quizzes)=>{
        return quizzes.category.title.toLowerCase()===filterTerm.toLowerCase();
      })
    }
  }
  */
  

}
