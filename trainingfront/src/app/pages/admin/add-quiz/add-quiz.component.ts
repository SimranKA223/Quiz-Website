import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CateogoryService } from 'src/app/services/cateogory.service';
import { QuizService } from 'src/app/services/quiz.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-add-quiz',
  templateUrl: './add-quiz.component.html',
  styleUrls: ['./add-quiz.component.css']
})
export class AddQuizComponent  implements OnInit{

  categories:any=[
    
  
  ];

  quizData={
    title:'',
    description:'',
    maxMarks:'',
    numberOfQuestions:'',
    active:true,
    category:{
      cid:'',
    }
  }
    

  constructor(private _cat:CateogoryService, private _snack:MatSnackBar, private _quiz: QuizService){}

  ngOnInit(): void {
    this._cat.categories().subscribe(
      (data:any)=>{
        this.categories=data; //array above-category
        console.log(this.categories);
      },
      (error)=>{
        console.log(error);
        Swal.fire('Error','server error','error');
      }
    )
  }

  //
  addQuiz(){
    if(this.quizData.title.trim()=='' || this.quizData.title==null){
      this._snack.open('Title Required','',{duration:3000});
      return;
    }
    this._quiz.addQuiz(this.quizData).subscribe(
      (data)=>{
        Swal.fire('Success','quiz is added','success');
        this.quizData={
          title:'',
          description:'',
          maxMarks:'',
          numberOfQuestions:'',
          active:true,
          category:{
            cid:'',
          },
        };
      },
    (error=>{
      Swal.fire('error','Error while adding quiz','error');
      console.log(error);
    }));
  }



}
