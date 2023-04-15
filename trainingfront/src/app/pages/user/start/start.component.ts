import { LocationStrategy } from '@angular/common';
import { HttpParams } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { LoginService } from 'src/app/services/login.service';
import { QuestionService } from 'src/app/services/question.service';
import { QuizService } from 'src/app/services/quiz.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-start',
  templateUrl: './start.component.html',
  styleUrls: ['./start.component.css']
})
export class StartComponent implements OnInit {
  location: any;

  qid: any;
  questions: any;

  id:any;

  //marksGot=0;
  //correctAnswers=0;
  //attempted=0;

  isSubmit=false;

  timer:any;

  result:any={
    quiz:{
      
    },
    score:'',
    dateTime:'',
    user:{

    }
  }
  quiz: any;

  score1:number=0;
	correctAnswers:number=0;

  now = new Date();
  dateTimeString = this.now.toString();
  dateWithoutTimezone = this.dateTimeString.slice(0, this.dateTimeString.indexOf('GMT'));
  
  
	
  
  
  

  constructor(private locationSt:LocationStrategy, private _route:ActivatedRoute, private _question:QuestionService, private _quiz:QuizService,private login:LoginService){
    
    
    
  }

  ngOnInit(): void {
    this.preventBackButton();

    
    
    this.qid=this._route.snapshot.params['qid'];

    this._quiz.getQuiz(this.qid).subscribe(
      (data:any)=>{
        this.quiz=data;
        console.log(this.quiz);

      },(error)=>{
        console.log("error");
      }
    )
    
    this.loadQuestions();

    this.result.quiz['qId']=this.qid;

    this.id=this.login.getUserId();

    this.result.user['id'] = this.id;
     
    console.log(this.dateTimeString);

    this.result.dateTime=this.dateWithoutTimezone;
    
    
  }

  loadQuestions(){
    this._question.getQuestionsOfQuizForTest(this.qid).subscribe(
      (data:any)=>{
        this.questions=data;

        this.timer=this.questions.length*2*60;

        

        console.log(this.questions);
        this.startTimer();

      },(error)=>{
        console.log("error");
        Swal.fire("error","Error un loading quiz questions",'error');
      }
    )
  }

  preventBackButton(){
    history.pushState(null,location.href);
    this.locationSt.onPopState(()=>{
      history.pushState(null,this.location.href);
    });
  }

  submitQuiz(){

    Swal.fire({
      title: 'Do you want to submit the quiz?',
      showCancelButton: true,
      confirmButtonText: 'Submit',
      icon:'info',
    }).then((e)=>{
      if(e.isConfirmed){
        //calculating marks
        this.evalQuiz();
      }
    })

  }

  startTimer(){
    let t=window.setInterval(()=>{
      if(this.timer<=0){
        this.evalQuiz();
        clearInterval(t);
      }else{
        this.timer--;
      }
    },1000)
  }

  getFormattedTime(){
    let mm=Math.floor(this.timer/60);
    let ss=this.timer-mm*60;
    return `${mm} min : ${ss}`;
  }

  evalQuiz(){
    
    
    this.isSubmit=true;
    this.questions.forEach((q: any)=>{
      if(q.givenAnswer==q.answer){
        this.correctAnswers++;
        
      }
    })
			
			
		
    
    this.result.score=this.correctAnswers;  
    
  const params = new HttpParams()
  .set('questions', JSON.stringify(this.questions))
  .set('result', JSON.stringify(this.result));

  console.log(params);

    this._question.evalQuiz(params).subscribe(

      (data:any)=>{
        console.log(data);
        //this.marksGot=data.marksGot;
        //this.correctAnswers=data.correctAnswers;
        //this.attempted=data.attempted;
        this.isSubmit=true;
        

      },
      (error)=>{
        console.log(error);
      }
    )

   
    /*
    this.isSubmit=true;
    this.questions.forEach((q: any)=>{
      if(q.givenAnswer==q.answer){
        this.correctAnswers++;
        let marksSingle=this.questions[0].quiz.maxMarks/this.questions.length;
        this.marksGot+=marksSingle;
      }

      if(q.givenAnswer.trim()!=''){
        this.attempted++;
      }

      console.log("Correct: " + this.correctAnswers);
      console.log("Marks got: "+this.marksGot);
      console.log('attemted: '+this.attempted);
    })
    */

  }

  printPage(){
    window.print();
  }

}
