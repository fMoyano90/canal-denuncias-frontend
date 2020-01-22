import { Component, OnInit } from "@angular/core";
import {
  NgxGalleryOptions,
  NgxGalleryImage,
  NgxGalleryAnimation
} from "ngx-gallery";

@Component({
  selector: "app-empresa",
  templateUrl: "./empresa.component.html",
  styleUrls: ["./empresa.component.scss"]
})
export class EmpresaComponent implements OnInit {
  galleryOptions: NgxGalleryOptions[];
  galleryImages: NgxGalleryImage[];

  constructor() {}

  ngOnInit(): void {
    this.galleryOptions = [
      {
        width: "550px",
        height: "450px",
        imageDescription: false,
        previewDescription: false,
        thumbnailsColumns: 3,
        thumbnailsRows: 1,
        thumbnailsPercent: 25,
        thumbnailsMargin: 1,
        thumbnailMargin: 1,
        thumbnailsOrder: 1,
        imageAnimation: NgxGalleryAnimation.Slide
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
        small: "assets/img/a1.png",
        medium: "assets/img/a1.png",
        big: "assets/img/a1.png"
      },
      {
        small: "assets/img/a2.jfif",
        medium: "assets/img/a2.jfif",
        big: "assets/img/a2.jfif"
      },
      {
        small: "assets/img/a3.jpg",
        medium: "assets/img/a3.jpg",
        big: "assets/img/a3.jpg"
      },
      {
        small: "assets/img/a4.jpg",
        medium: "assets/img/a4.jpg",
        big: "assets/img/a4.jpg"
      },
      {
        small: "assets/img/a5.jfif",
        medium: "assets/img/a5.jfif",
        big: "assets/img/a5.jfif"
      },
      {
        small: "assets/img/a6.jfif",
        medium: "assets/img/a6.jfif",
        big: "assets/img/a6.jfif"
      },
      {
        small: "assets/img/a7.jfif",
        medium: "assets/img/a7.jfif",
        big: "assets/img/a7.jfif"
      },
      {
        small: "assets/img/a8.jfif",
        medium: "assets/img/a8.jfif",
        big: "assets/img/a8.jfif"
      },
      {
        small: "assets/img/a9.png",
        medium: "assets/img/a9.png",
        big: "assets/img/a9.png"
      }
    ];
  }
}
