import { Component, OnInit } from '@angular/core';
import { BlogDetailService } from 'src/app/services/blog-detail.service';
import { project } from '../../model/projects';
import { about } from '../../model/about'

@Component({
  selector: 'app-about-page',
  templateUrl: './about-page.component.html',
  styleUrls: ['./about-page.component.css']
})
export class AboutPageComponent implements OnInit {
  projects !: project[]
  about_content !: about[]
  constructor(private blogDetail: BlogDetailService) { }

  ngOnInit(): void {
    this.blogDetail.getProjectsFromFirebase().subscribe(
      data => {
        this.projects = data.map(e => {
          return{
            _id: e.payload.doc.id,
            ...e.payload.doc.data() as any
          } as project;
        })
      }
    )



    this.blogDetail.getAboutFromFirebase().subscribe(
      data => {
        this.about_content = data.map(e => {
          return{
            _id: e.payload.doc.id,
            ...e.payload.doc.data() as any
          } as about;
        })
      }
    )
  }

}
