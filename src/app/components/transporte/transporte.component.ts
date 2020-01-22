import { Component, OnInit } from "@angular/core";
import {
  NgxGalleryOptions,
  NgxGalleryImage,
  NgxGalleryAnimation
} from "ngx-gallery";

@Component({
  selector: "app-transporte",
  templateUrl: "./transporte.component.html",
  styleUrls: ["./transporte.component.scss"]
})
export class TransporteComponent implements OnInit {
  galleryOptions: NgxGalleryOptions[];
  galleryImages: NgxGalleryImage[];
  galleryImages2: NgxGalleryImage[];
  galleryImages3: NgxGalleryImage[];
  galleryImages4: NgxGalleryImage[];
  galleryImages5: NgxGalleryImage[];
  galleryImages6: NgxGalleryImage[];

  constructor() {}

  ngOnInit(): void {
    this.galleryOptions = [
      {
        width: "530px",
        height: "400px",
        imageDescription: false,
        previewDescription: false,
        thumbnails: false,
        imageAnimation: NgxGalleryAnimation.Rotate
      },
      // max-width 800
      {
        breakpoint: 800,
        width: "100%",
        height: "600px",
        imagePercent: 80,
        thumbnailsPercent: 20,
        thumbnailsMargin: 20,
        thumbnailMargin: 20
      },
      // max-width 400
      {
        breakpoint: 400,
        preview: false
      }
    ];

    this.galleryImages = [
      {
        small: "assets/img/t3.jpg",
        medium: "assets/img/t3.jpg",
        big: "assets/img/t3.jpg"
      },
      {
        small: "assets/img/t4.jpg",
        medium: "assets/img/t4.jpg",
        big: "assets/img/t4.jpg"
      },
      {
        small: "assets/img/t5.jpg",
        medium: "assets/img/t5.jpg",
        big: "assets/img/t5.jpg"
      }
    ];

    this.galleryImages2 = [
      {
        small: "assets/img/t1.jpg",
        medium: "assets/img/t1.jpg",
        big: "assets/img/t1.jpg"
      },
      {
        small: "assets/img/t2.jpg",
        medium: "assets/img/t2.jpg",
        big: "assets/img/t2.jpg"
      }
    ];
    this.galleryImages3 = [
      {
        small: "assets/img/t6.jpg",
        medium: "assets/img/t6.jpg",
        big: "assets/img/t6.jpg"
      },
      {
        small: "assets/img/t7.png",
        medium: "assets/img/t7.png",
        big: "assets/img/t7.png"
      },
      {
        small: "assets/img/t8.jpg",
        medium: "assets/img/t8.jpg",
        big: "assets/img/t8.jpg"
      }
    ];
    this.galleryImages4 = [
      {
        small: "assets/img/t9.jpg",
        medium: "assets/img/t9.jpg",
        big: "assets/img/t9.jpg"
      },
      {
        small: "assets/img/t10.jpg",
        medium: "assets/img/t10.jpg",
        big: "assets/img/t10.jpg"
      }
    ];
    this.galleryImages5 = [
      {
        small: "assets/img/t11.jpg",
        medium: "assets/img/t11.jpg",
        big: "assets/img/t11.jpg"
      },
      {
        small: "assets/img/t12.jpg",
        medium: "assets/img/t12.jpg",
        big: "assets/img/t12.jpg"
      },
      {
        small: "assets/img/t13.jpg",
        medium: "assets/img/t13.jpg",
        big: "assets/img/t13.jpg"
      },
      {
        small: "assets/img/t14.jpg",
        medium: "assets/img/t14.jpg",
        big: "assets/img/t14.jpg"
      }
    ];
    this.galleryImages6 = [
      {
        small: "assets/img/t9.jpg",
        medium: "assets/img/t9.jpg",
        big: "assets/img/t9.jpg"
      },
      {
        small: "assets/img/t10.jpg",
        medium: "assets/img/t10.jpg",
        big: "assets/img/t10.jpg"
      }
    ];
  }
}
