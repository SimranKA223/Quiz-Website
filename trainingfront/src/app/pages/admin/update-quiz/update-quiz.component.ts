import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CateogoryService } from 'src/app/services/cateogory.service';
import { QuizService } from 'src/app/services/quiz.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-update-quiz',
  templateUrl: './update-quiz.component.html',
  styleUrls: ['./update-quiz.component.css']
})
export class UpdateQuizComponent implements OnInit {

  qId=0;
  quiz: any;
  categories: any;
  
  constructor(private _route:ActivatedRoute, private _quiz:QuizService, private _cat:CateogoryService,private _router:Router){}

  ngOnInit(): void {
    this.qId=this._route.snapshot.params['qid'];
    //alert(this.qId);
    this._quiz.getQuiz(this.qId).subscribe(
      (data:any)=>{
        this.quiz=data;
        console.log(this.quiz);
      },
      (error)=>{
        console.log(error);
      }
    );

    this._cat.categories().subscribe((data)=>{
      this.categories=data;
    },
    (error)=>{
      alert('error');
    })

  }

  public updateData(){
    this._quiz.updateQuiz(this.quiz).subscribe((data)=>{
      Swal.fire("Updated",'quiz updated','success').then((e)=>{this._router.navigate(['/admin/quizzes'])});
    },(error)=>{
      Swal.fire('Error','error',error);
      console.log(error);
    });
  }

}
