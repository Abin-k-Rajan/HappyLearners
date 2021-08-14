import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'HappyLearner';

  constructor(){

  }

  topnav(){
    var x = document.getElementById("myLinks");
    if (x?.style.display === "block") {
      x.style.display = "none";
    } else if(x?.style.display != null) {
      x.style.display = "block";
    }
  }
}
