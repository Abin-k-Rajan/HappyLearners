import { stringify } from '@angular/compiler/src/util';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormBuilder, FormArray } from '@angular/forms';
import { blogContent } from 'src/app/model/blogContent';
import { BlogDetailService } from 'src/app/services/blog-detail.service';

@Component({
  selector: 'app-post-page',
  templateUrl: './post-page.component.html',
  styleUrls: ['./post-page.component.css']
})
export class PostPageComponent implements OnInit {

  paragraphForm !: FormGroup;
  items !: FormArray;

  postBlogForm = new FormGroup({
    title : new FormControl(),
    description : new FormControl(),
    image_url : new FormControl(),
    images: new FormControl(),
    content : new FormControl(),
    code_cpp : new FormControl(),
    code_java : new FormControl(),
    code_python : new FormControl()
  });

  blogContentForm!: blogContent;

  validatorForm = new FormGroup({
    Email: new FormControl(),
    Password: new FormControl()
  });

  loggedIn!: boolean;
  signIn!: string;
  number_of_para !: number;
  login_fail !: boolean;
  para !: Array<String>;
  images !: Array<String>;
  i !: Number;

  constructor(private postBlog: BlogDetailService, private formBuilder: FormBuilder) { this.loggedIn = false, this.signIn = "", this.number_of_para = 1; this.login_fail = false;
  }

  ngOnInit(): void {
    this.paragraphForm = this.formBuilder.group({
      paragraph : new FormControl(''),
      images: new FormControl(''),
      items : this.formBuilder.array([this.createForm()])
    })
  }

  createForm(): FormGroup {
    return this.formBuilder.group({
      paragraph:  new FormControl(''),
      images:  new FormControl('')
    });
  }

  addItem(): void{
    this.items = this.paragraphForm.get('items') as FormArray;
    this.items.push(this.createForm());
    this.addPara();
  }

  onSubmit(): void{
    this.init_blog_content_form();
    console.log(this.blogContentForm);
    this.postBlog.createBlog(this.blogContentForm, this.validatorForm.value.Email, this.validatorForm.value.Password);
    //this.postBlog.login(this.validatorForm.value.Email, this.validatorForm.value.Password);
  }

  init_blog_content_form(): void{
    this.para = []
    this.images = []
    this.blogContentForm = this.postBlogForm.value;
    this.i = 0;
    for(this.i = +0; this.i < this.number_of_para; this.i = +this.i + 1)
    {
      this.para.push(this.paragraphForm.get(['items', +this.i])?.value.paragraph);
      this.images.push(this.paragraphForm.get(['items', +this.i])?.value.images);
    }
    this.blogContentForm.paragraph = this.para as any;
    this.blogContentForm.images = this.images as any;
    this.blogContentForm.uid = localStorage.getItem("uid") as any;
  }

  getControls() {
    return (<FormArray>this.paragraphForm.get('items')).controls;
  }

  setSignIn(): void{
    this.signIn = "loading";
  }

  counter(i: number) {
    return new Array(i);
  }

  addPara() {
    if(this.number_of_para === 10)
    {
      alert("You can post maximum of 10 paragraphs in your blog, Consider creatig a new one for continuation.");
      return;
    }
    this.number_of_para += 1;
  }

  removePara() {
    if(this.number_of_para === 1)
    {
      alert("You must have atleast one paragraph in your blog.");
      return;
    }
    this.number_of_para -= 1;
  }

  onLogin(): void{
    // this.setSignIn();
    // this.postBlog.login(this.validatorForm.value.Email, this.validatorForm.value.Password).then(res => {
    //   if(localStorage.getItem('uid') != null)
    //   {
    //     this.loggedIn = true;
    //     this.login_fail = false;
    //     this.signIn = "";
    //   }
    // })
  }
}
