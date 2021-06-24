import { Component, Input } from '@angular/core';
import { blog } from 'src/app/model/blog';
import { BlogDetailService } from 'src/app/services/blog-detail.service';

@Component({
  selector: 'app-blog-page',
  templateUrl: './blog-page.component.html',
  styleUrls: ['./blog-page.component.css']
})

export class BlogPageComponent {
  poperty!: blog;
  visits!: number;
  constructor(private get: BlogDetailService) { }
  @Input() property!: blog

  updateViews(){
    this.visits = +this.property._visits + 1;
    console.log(this.visits);
    this.get.updateViews(this.property._id, +this.visits);
  }
}
