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
  const video = document.getElementById( "webcam" );
    const canvas = document.getElementById( "output" );
    const overlay = document.getElementById( "overlay" );
    const webcamElement = document.getElementById( "webcam" );

    Render.setup(video,canvas,overlay,webcamElement);
 }

   ngOnInit(): void{

  }

}
