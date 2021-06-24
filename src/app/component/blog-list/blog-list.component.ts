import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { map } from 'rxjs/operators';
import { blog } from 'src/app/model/blog';
import { BlogDetailService } from 'src/app/services/blog-detail.service';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';

@Component({
  selector: 'app-blog-list',
  templateUrl: './blog-list.component.html',
  styleUrls: ['./blog-list.component.css']
})
export class BlogListComponent implements OnInit {

  blogs!: blog[];
  first!: boolean;
  last!: boolean;
  date!: Date;
  loading:any;

  constructor(private getBlogWeb: BlogDetailService, private firebase: AngularFirestore) { 
    this.first = false;
    this.last = false;
    this.loading = null;
  }

  ngOnInit(): void {
    // this.getBlogWeb.getAllBlogs().subscribe(
    //   data => {
    //     this.blogs = data;
    //   }
    // ) 

    //  Function to get blogs from firebase
    this.getBlogWeb.getBlogsFromFireBase().subscribe(
      data => {
        this.loading = "loaded";
        this.blogs = data.map(e => {
          return{
            _id : e.payload.doc.id,
            ...e.payload.doc.data() as any
          } as blog;
        })
      }
    );
  }

  setLastDate(): Date{
    this.date = this.blogs[this.blogs.length - 1]._date;
    this.loading = "";
    return this.date;
  }

  setFirstDate(): Date{
    this.date = this.blogs[0]._date;
    this.loading = "";
    return this.date;
  }

  getNextPage(){
    this.getBlogWeb.getBlogsForBlogPage(this.setLastDate()).subscribe(
      data => {
        if(data.length == 0){
          this.last = true;
          this.first = false;
          this.loading = "loaded";
          return;
        }
        else{
          this.last = false;
          this.first = false;
        this.blogs = [];
        this.blogs = data.map(e => {
          return{
            _id : e.payload.doc.id,
            ...e.payload.doc.data() as any
          } as blog;
        })
        this.loading = "loaded";
      }
      }
    ); 
  }

  getPrevPage(){
    this.getBlogWeb.getBlogsBeforeForBlogPage(this.setFirstDate()).subscribe(
      data => {
        if(data.length == 0){
          this.first = true;
          this.last = false;
          this.loading = "loaded";
          return;
        }
        else{
          this.last = false;
          this.first = false;
        this.blogs = data.map(e => {
          return{
            _id : e.payload.doc.id,
            ...e.payload.doc.data() as any
          } as blog;
        })
        this.loading = "loaded";
      }
      }
    ); 
  }

}
