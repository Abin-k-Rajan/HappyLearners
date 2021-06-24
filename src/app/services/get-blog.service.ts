import { Injectable } from '@angular/core';
import { Observable, observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { blog } from '../model/blog';
import { HttpClient } from '@angular/common/http'
import { stringify } from '@angular/compiler/src/util';
import { BlogListComponent } from '../component/blog-list/blog-list.component';

@Injectable({
  providedIn: 'root'
})
export class GetBlogService {

  constructor(private http: HttpClient) { }

  // get_all_blogs(){
  //   return this.http.get('http://localhost:5001/Home').pipe(
  //     map( data => {
  //       const jsonData = JSON.stringify(data)
  //       const blogArray: Array<blog> = JSON.parse(jsonData);
  //       return blogArray;
  //     })
  //   )
  // }

  // get_particular_blog(id: number){
  //   return this.get_all_blogs().pipe(
  //     map( full_blog => {
  //       return full_blog.find(p => p.Id == id);
  //     })
  //   )
  // }
}
