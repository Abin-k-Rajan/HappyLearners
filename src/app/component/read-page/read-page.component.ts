import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TabsetComponent } from 'ngx-bootstrap/tabs';
import { blogContent } from 'src/app/model/blogContent';
import { BlogDetailService } from 'src/app/services/blog-detail.service';

@Component({
  selector: 'app-read-page',
  templateUrl: './read-page.component.html',
  styleUrls: ['./read-page.component.css']
})
export class ReadPageComponent implements OnInit {
  loading!: boolean;
  @ViewChild('staticTabs', { static: false }) staticTabs!: TabsetComponent;
  property = new blogContent();
  views!: number;
  @Input() id !: string;

  constructor(private get: BlogDetailService, private route: ActivatedRoute, private router: Router) {
    this.loading = true;
   }

  ngOnInit(): void {
    this.id = this.route.snapshot.params['id'];
    this.route.params.subscribe(
      (params) => {
        this.id = params['id']
        this.get.getDetailedBlogFromFirebase(this.id).snapshotChanges().subscribe(
          data => {
            this.property = { _id: data.payload.id, ...data.payload.data() as any} as blogContent
          }
        )
      }
    )
    this.loading = false;
  }

}
