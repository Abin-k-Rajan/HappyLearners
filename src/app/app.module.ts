import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { RouterModule, Routes } from '@angular/router';
import { BlogPageComponent } from './component/blog-page/blog-page.component';
import { HomePageComponent } from './component/home-page/home-page.component';
import { ContactPageComponent } from './component/contact-page/contact-page.component';
import { AboutPageComponent } from './component/about-page/about-page.component';
import { HttpClientModule } from '@angular/common/http';
import { GetBlogService } from './services/get-blog.service';
import { BlogListComponent } from './component/blog-list/blog-list.component';
import { ReadPageComponent } from './component/read-page/read-page.component';
import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFireAuthModule } from "@angular/fire/auth";
import { AngularFireStorageModule } from "@angular/fire/storage";
import { environment } from 'src/environments/environment';
import { TabsModule } from 'ngx-bootstrap/tabs';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { PostPageComponent } from './component/post-page/post-page.component';
import { ReactiveFormsModule } from "@angular/forms";

const appRoutes: Routes = [
  {path: '', component: HomePageComponent},
  {path: 'blog', component: BlogListComponent},
  {path: 'contact', component: ContactPageComponent},
  {path: 'about', component: AboutPageComponent},
  {path: 'blog-read/:id', component: ReadPageComponent},
  {path: 'blog/blog-read/:id', component: ReadPageComponent},
  {path: 'post-content', component: PostPageComponent}
]

@NgModule({
  declarations: [
    AppComponent,
    BlogPageComponent,
    HomePageComponent,
    ContactPageComponent,
    AboutPageComponent,
    BlogListComponent,
    ReadPageComponent,
    PostPageComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(appRoutes),
    HttpClientModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFirestoreModule,
    TabsModule.forRoot(),
    BrowserAnimationsModule,
    MatProgressSpinnerModule,
    ReactiveFormsModule,
    AngularFireAuthModule,
    AngularFireStorageModule
  ],
  exports: [RouterModule],
  providers: [
    GetBlogService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
