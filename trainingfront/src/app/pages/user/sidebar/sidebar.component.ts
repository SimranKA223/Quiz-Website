import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CateogoryService } from 'src/app/services/cateogory.service';

@Component({
  selector: 'app-sidebar-user',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {
  categories: any;
  ngOnInit(): void {
    this._cat.categories().subscribe(
      (data:any)=>{
        this.categories=data;
      },(error)=>{
        this._snack.open("error",'',{duration:3000});
      }
    )
  }

  constructor(private _cat:CateogoryService, private _snack:MatSnackBar){}



}
