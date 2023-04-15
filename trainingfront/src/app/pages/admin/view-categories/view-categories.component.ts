import { Component, OnInit } from '@angular/core';
import { CateogoryService } from 'src/app/services/cateogory.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-view-categories',
  templateUrl: './view-categories.component.html',
  styleUrls: ['./view-categories.component.css']
})
export class ViewCategoriesComponent implements OnInit {
 
  categories=[
    {
      cid:23,
      title:'programming',
      description:'this is it',
    },
    {
      cid:23,
      title:'programming',
      description:'this is it',
    },
    {
      cid:23,
      title:'programming',
      description:'this is it',
    },
  ]

  constructor(private _category:CateogoryService){

  }

  ngOnInit():void{
    this._category.categories().subscribe((data:any)=>{
      this.categories=data;
      console.log(this.categories);
    },
    (error)=>{
      console.log(error);
      Swal.fire('Error!!','Error in loading data','error');
    })
  }

}
