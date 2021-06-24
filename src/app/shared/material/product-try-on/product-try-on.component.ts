import { Component, OnInit } from '@angular/core';
import * as Render from './glass-render'
import adapter from 'webrtc-adapter';


@Component({
  selector: 'app-product-try-on',
  templateUrl: './product-try-on.component.html',
  styleUrls: ['./product-try-on.component.scss']
})

export class ProductTryOnComponent implements OnInit {



 constructor(){
}
    video = document.getElementById( "webcam" );
    canvas =  document.getElementById( "output" );
    overlay = document.getElementById( "overlay" );
async ngOnInit(){

     await Render.setup(this.video,this.canvas,this.overlay);
  }

}
