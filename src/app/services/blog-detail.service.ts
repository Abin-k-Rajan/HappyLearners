import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { from, Observable } from 'rxjs';
import { blog } from '../model/blog';
import { contact } from '../model/iContact'
import { GetBlogService } from './get-blog.service';
import { AngularFirestore } from '@angular/fire/firestore'
import { blogContent } from '../model/blogContent';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFireStorage } from '@angular/fire/storage'



@Injectable({
  providedIn: 'root'
})
export class BlogDetailService {

  constructor(private get_blog: GetBlogService, private http: HttpClient, private firebase: AngularFirestore, private fauth: AngularFireAuth, private storage: AngularFireStorage) { }

  // resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot):
  //   Observable<blog>|blog{
  //     const propId = route.params['Id'];
  //     return this.get_blog.get_particular_blog(+propId);
  //   }

  updateViews(id: string, visits: number){
    this.firebase.collection('blogs').doc(id).update({'_visits': visits});
  }

  getBlogsFromFireBase(){
    return this.firebase.collection('blogs', (ref) => ref.orderBy('_date', 'desc').limit(10)).snapshotChanges().pipe();
  }



  getProjectsFromFirebase(){
    return this.firebase.collection('projects', (ref) => ref.limit(10)).snapshotChanges().pipe();
  }


  getAboutFromFirebase(){
    return this.firebase.collection('about', (ref) => ref.orderBy('_post', 'asc').limit(20)).snapshotChanges().pipe();
  }




  getPopularBlogsFromFireBase(){
    return this.firebase.collection('blogs', (ref) => ref.orderBy('_visits', 'desc').limit(5)).snapshotChanges().pipe();
  }
  

  getFactsFirebase()
  {
    return this.firebase.collection('whats_new', (ref) => ref.limit(3)).snapshotChanges().pipe();
  }

  getLatestBlogs(){
    return this.firebase.collection('blogs', (ref) => 
      ref.orderBy('_date', 'desc').limit(5)
    ).snapshotChanges();
  }

  getBlogsForBlogPage(date: Date){
    return this.firebase.collection('blogs', (ref) =>
      ref.orderBy('_date', 'desc').startAfter(date).limit(10)
    ).snapshotChanges();
  }



  createBlog(value: blogContent, email: string, password: string)
  {
    return new Promise((resolve, reject) => {
      this.login(email, password).then(
        res => {
          this.firebase.collection('blog_content').add(value).then(res => {
            localStorage.setItem("postId", res.id);
            resolve(res)
          })
        },
        err => {
          alert(err)
          reject(err)
        }
      )
    })
  }





  createBlogInfo(value: blog, email: string, password: string)
  {
    return new Promise((resolve, reject) => {
      this.login(email, password).then(
        res => {
          this.firebase.collection('blogs').add(value).then(res => {
            resolve("Blog added Successfully.")
          })
        },
        err => {
          alert(err)
          reject(err)
        }
      )
    }) 
  }



  saveContactInfo(value: contact)
  {
    return new Promise((resolve, reject) => {
      resolve("Page yet to be implemented. Excuse us for the inconvinience.")
    })
  }




  login(email: string, password: string)
  {
    return this.fauth.signInWithEmailAndPassword(email, password).then(res => {
      localStorage.setItem('uid', res.user?.uid as string);
    });
  }


  getBlogsBeforeForBlogPage(date: Date){
    return this.firebase.collection('blogs', (ref) =>
      ref.orderBy('_date', 'asc').startAfter(date).limit(10)
    ).snapshotChanges();
  }

  getDetailedBlogFromFirebase(id: string)
  {
    return this.firebase.collection('blog_content').doc(id);
  }

  getAllBlogs(): Observable<blog[]>{
    return this.http.get<blog[]>('http://localhost:5001/Home');
  }

  getHomeBlog(): Observable<blog[]>{
    return this.http.get<blog[]>('http://localhost:5001/Home/home');
  }

  getDetailedBlog(id: string): Observable<blog>{
    return this.http.get<blog>('http://localhost:5001/Home/'+id);
  }
}
