import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BlogDetailService } from 'src/app/services/blog-detail.service';
import { GetBlogService } from 'src/app/services/get-blog.service';
import { blog } from 'src/app/model/blog';
import { facts } from 'src/app/model/facts';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css']
})
export class HomePageComponent implements OnInit {
  blogs!: blog[];
  popular_blogs!: blog[];
  whats_new!: facts[];
  visits!: number;
  constructor(private route: ActivatedRoute, private blog: GetBlogService, private blogDetail: BlogDetailService) {  }

  ngOnInit(): void {
    this.blogDetail.getLatestBlogs().subscribe(
      data => {
        this.blogs = data.map(e => {
          return{
            _id : e.payload.doc.id,
            ...e.payload.doc.data() as any
          } as blog;
        })
      }
    );

    this.blogDetail.getFactsFirebase().subscribe(
      data =>{
        this.whats_new = data.map(e => {
          return {
            id : e.payload.doc.id,
            ...e.payload.doc.data() as any
          } as facts;
        })
      }
    )

    this.blogDetail.getPopularBlogsFromFireBase().subscribe(
      data => {
        this.popular_blogs = data.map( e => {
          return{
            _id: e.payload.doc.id,
            ...e.payload.doc.data() as any
          } as blog;
        })
      }
    )
    
  }

  updateViews(id: string)
  {
    
  }
}
