import { Component, OnInit } from "@angular/core";
import {
  NgxGalleryOptions,
  NgxGalleryImage,
  NgxGalleryAnimation
} from "ngx-gallery";

@Component({
  selector: "app-galeria",
  templateUrl: "./galeria.component.html",
  styleUrls: ["./galeria.component.scss"]
})
export class GaleriaComponent implements OnInit {
  galleryOptions: NgxGalleryOptions[];
  galleryImages: NgxGalleryImage[];

  constructor() {}

  ngOnInit(): void {
    this.galleryOptions = [
      {
        width: "600px",
        height: "500px",
        imageDescription: false,
        previewDescription: true,
        thumbnailsColumns: 3,
        thumbnailsRows: 1,
        thumbnailsPercent: 25,
        thumbnailsMargin: 2,
        thumbnailMargin: 2,
        thumbnailsOrder: 2,
        imageAnimation: NgxGalleryAnimation.Zoom
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
        small: "assets/img/s1.png",
        medium: "assets/img/s1.png",
        big: "assets/img/s1.png",
        description: "Sobredimensión y peso"
      },
      {
        small: "assets/img/s2.png",
        medium: "assets/img/s2.png",
        big: "assets/img/s2.png",
        description: "Sobredimensión y peso"
      },
      {
        small: "assets/img/s3.png",
        medium: "assets/img/s3.png",
        big: "assets/img/s3.png",
        description: "Sobredimensión y peso"
      },
      {
        small: "assets/img/s1.png",
        medium: "assets/img/s1.png",
        big: "assets/img/s1.png",
        description: "Sobredimensión y peso"
      },
      {
        small: "assets/img/s2.png",
        medium: "assets/img/s2.png",
        big: "assets/img/s2.png",
        description: "Sobredimensión y peso"
      },
      {
        small: "assets/img/s3.png",
        medium: "assets/img/s3.png",
        big: "assets/img/s3.png",
        description: "Sobredimensión y peso"
      },
      {
        small: "assets/img/s1.png",
        medium: "assets/img/s1.png",
        big: "assets/img/s1.png",
        description: "Sobredimensión y peso"
      },
      {
        small: "assets/img/s2.png",
        medium: "assets/img/s2.png",
        big: "assets/img/s2.png"
      },
      {
        small: "assets/img/s3.png",
        medium: "assets/img/s3.png",
        big: "assets/img/s3.png",
        description: "Sobredimensión y peso"
      },
      {
        small: "assets/img/s1.png",
        medium: "assets/img/s1.png",
        big: "assets/img/s1.png",
        description: "Sobredimensión y peso"
      },
      {
        small: "assets/img/s2.png",
        medium: "assets/img/s2.png",
        big: "assets/img/s2.png",
        description: "Sobredimensión y peso"
      },
      {
        small: "assets/img/s3.png",
        medium: "assets/img/s3.png",
        big: "assets/img/s3.png",
        description: "Sobredimensión y peso"
      },
      {
        small: "assets/img/s1.png",
        medium: "assets/img/s1.png",
        big: "assets/img/s1.png",
        description: "Sobredimensión y peso"
      },
      {
        small: "assets/img/s2.png",
        medium: "assets/img/s2.png",
        big: "assets/img/s2.png",
        description: "Sobredimensión y peso"
      },
      {
        small: "assets/img/s3.png",
        medium: "assets/img/s3.png",
        big: "assets/img/s3.png"
      },
      {
        small: "assets/img/s1.png",
        medium: "assets/img/s1.png",
        big: "assets/img/s1.png"
      },
      {
        small: "assets/img/s2.png",
        medium: "assets/img/s2.png",
        big: "assets/img/s2.png"
      },
      {
        small: "assets/img/s3.png",
        medium: "assets/img/s3.png",
        big: "assets/img/s3.png"
      }
    ];
  }
}
