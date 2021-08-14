import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormBuilder, FormArray } from '@angular/forms';
import { blogContent } from 'src/app/model/blogContent';
import { blog } from 'src/app/model/blog'
import { BlogDetailService } from 'src/app/services/blog-detail.service';
import { UploadFileService } from 'src/app/services/upload-file.service';

@Component({
  selector: 'app-post-page',
  templateUrl: './post-page.component.html',
  styleUrls: ['./post-page.component.css']
})
export class PostPageComponent implements OnInit {

  paragraphForm !: FormGroup;
  items !: FormArray;
  infoBlog !: FormGroup;

  postBlogForm = new FormGroup({
    title : new FormControl(),
    description : new FormControl(),
    images: new FormControl(),
    image_url: new FormControl(),
    content : new FormControl(),
    code_cpp : new FormControl(),
    code_java : new FormControl(),
    code_python : new FormControl()
  });


  infoBlogForm = new FormGroup({
    _title : new FormControl(),
    _description : new FormControl(),
    _image_url : new FormControl(),
    _image_desc : new FormControl(),
    _blog_name : new FormControl(),
    _content : new FormControl()
  })

  blogContentForm!: blogContent;
  blogInfoForm !: blog

  validatorForm = new FormGroup({
    Email: new FormControl(),
    Password: new FormControl()
  });

  loggedIn!: boolean;
  loading!: boolean;
  number_of_para !: number;
  login_fail !: boolean;
  para !: Array<String>;
  images !: Array<String>;
  image_files !: Array<File>;
  i !: Number;
  test_file !: String;
  cover_image_bool !: boolean;
  cover_image !: File;

  post_id_to_link !: String


  show_info_form !: Boolean;




  constructor(private postBlog: BlogDetailService, private formBuilder: FormBuilder, private upload: UploadFileService) { 
    this.loggedIn = false;
    this.show_info_form = false;
    this.loading = false; 
    this.number_of_para = +1;
    this.login_fail = false;
    this.cover_image_bool = false;
    this.image_files = [];
    this.para = [];
    this.images = [];
  }




  ngOnInit(): void {
    this.paragraphForm = this.formBuilder.group({
      paragraph : new FormControl(''),
      image_url : new FormControl(''),
      image_radio : new FormControl(''),
      items : this.formBuilder.array([this.createForm()])
    })
  }



  createForm(): FormGroup {
    return this.formBuilder.group({
      paragraph:  new FormControl(''),
      image_url : new FormControl(''),
      image_radio : new FormControl(''),
    });
  }



  addItem(): void{
    this.items = this.paragraphForm.get('items') as FormArray;
    this.items.push(this.createForm());
    this.addPara();
  }



  onSubmit = async() => {
    if(this.cover_image_bool == false)
    {
      alert("Please upload an Image for blog cover.")
      return;
    }
    this.loading = true;
    await this.init_blog_content_form().then(data => {
      console.log(data);
      this.loading = false;
    });
    this.postBlog.createBlog(this.blogContentForm, this.validatorForm.value.Email, this.validatorForm.value.Password).then(data => {
      this.post_id_to_link = data as String
      this.show_info_form = true
    },
    err => {
      alert(err)
    })
  }




  onSubmitInfo = async() => {
    if(this.show_info_form === false)
    {
      alert("Please Submit the blog first.")
      return;
    }
    this.loading = true;
    await this.init_blog_info_form().then(data => {
      console.log(data);
      this.loading = false;
    });
  }





  init_blog_info_form(){
    return new Promise((resolve, error) => {
      this.blogInfoForm = this.infoBlogForm.value;
      this.blogInfoForm.link_id = localStorage.getItem("postId") as any
      this.blogInfoForm._visits = 0
      this.blogInfoForm._date = Date.now() as any
      this.postBlog.createBlogInfo(this.blogInfoForm, this.validatorForm.value.Email, this.validatorForm.value.Password).then(data => {
        alert(data)
        this.loading = false;
        this.show_info_form = false;
      },
      err => {
        alert(err)
        this.loading = false;
        this.show_info_form = false;
      });
    })
  }






  init_blog_content_form(){
    alert("Please wait while we upload images.")
    return new Promise ((resolve, reject) => {
      this.blogContentForm = this.postBlogForm.value;
      this.i = 0;
      var total = 0;
      this.upload_cover_image_task(this.cover_image).then(data => {
        this.blogContentForm.image_url = data as any;
        for(this.i = +0; this.i < this.number_of_para; this.i = +this.i + 1)
        {
          this.para.push(this.paragraphForm.get(['items', +this.i])?.value.paragraph);
          this.upload_image_task(this.image_files[+this.i], +this.i).then(
            data => {
              this.images.push(data as String);
              total++;
              if(total == this.number_of_para){
                alert("Upload Successful.")
                resolve(this.blogContentForm)
              }
            },
            error => {
              alert(error)
              reject(error)
            },  
          );
          
        }

        console.log(this.images)
      });
      this.blogContentForm.paragraph = this.para as any;
      this.blogContentForm.images = this.images as any;
      this.blogContentForm.uid = localStorage.getItem("uid") as any;
    })
  }







  getControls() {
    return (<FormArray>this.paragraphForm.get('items')).controls;
  }

  setSignIn(): void{
    this.loading = true;
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



  //  FUNCTION USED TO REMOVE A PARAGRAPH FROM THE POST FORM

  removePara() {
    if(this.number_of_para === 1)
    {
      alert("You must have atleast one paragraph in your blog.");
      return;
    }
    this.number_of_para -= 1;
  }


  upload_images(): void{

  }




  //  THIS FUNCTION HANDLES ALL THE CHANGES IN INPUT TYPE FILE
  //  STORES ALL THE IMAGES IN ARRAY THAT WE USE LATER TO UPLOAD

  upload_image_change(event: any, index: number): void{
    const file:File = event.target.files[0];
    this.image_files[index] = file
    console.log(this.image_files)
  }




  upload_image_task_main_image(event: any): void {
    const file:File = event.target.files[0];
    const file_name:String = file.name;
    var r = confirm("Do you want to use "+file_name+" as your blog cover?")
    if(r == true)
    {
      this.cover_image_bool = true;
      this.cover_image = file; 
    }
    else
      this.cover_image_bool = false;
  }


  
  upload_image_task(file: File, index: number) {
    return new Promise((resolve, reject) => {
      try
      {
        this.upload.upload_image(file).then(data => resolve(data), error => reject(error))
      }
      catch(error)
      {
        reject(error)
      }
    })
  }


  upload_cover_image_task(file: File) {
    return new Promise((resolve, reject) => {
      try
      {
        this.upload.upload_image(file).then(data => resolve(data))
      }
      catch(error)
      {
        alert(error)
        reject(error)
      }
    })
  }




  onLogin(): void{
    this.setSignIn();
    this.postBlog.login(this.validatorForm.value.Email, this.validatorForm.value.Password).then(res => {
      if(localStorage.getItem('uid') != null)
      {
        this.loggedIn = true;
        this.login_fail = false;
        this.loading = false;
        alert("Logged in Successfully");
      }
    },
    err => {
      this.loading = false;
      alert("Credentials do not match..")
    })
  }
}
