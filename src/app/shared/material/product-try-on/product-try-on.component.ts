import { Component, OnInit } from '@angular/core';
import * as Render from './glass-render'
import adapter from 'webrtc-adapter';


@Component({
  selector: 'app-product-try-on',
  templateUrl: './product-try-on.component.html',
  styleUrls: ['./product-try-on.component.scss']
})

export class ProductTryOnComponent implements OnInit {
public video:HTMLElement;
public canvas:HTMLElement;
public overlay:HTMLElement;


 constructor(){
}

async ngOnInit(){
    this.video =await document.getElementById( "webcam" );
    this.canvas = await document.getElementById( "output" );
    this.overlay =await document.getElementById( "overlay" );
     await Render.setup(this.video,this.canvas,this.overlay);
  }

}
