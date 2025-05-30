import { Component, Input, OnInit } from '@angular/core';

export interface GalleryImage {
  small: string;
  medium: string;
  big: string;
  description?: string;
}

@Component({
  selector: 'app-image-gallery',
  templateUrl: './image-gallery.component.html',
  styleUrls: ['./image-gallery.component.scss']
})
export class ImageGalleryComponent implements OnInit {
  @Input() images: GalleryImage[] = [];
  
  selectedImage: GalleryImage | null = null;
  currentIndex = 0;

  constructor() { }

  ngOnInit(): void {
  }

  openImage(image: GalleryImage, index: number) {
    this.selectedImage = image;
    this.currentIndex = index;
  }

  closeImage() {
    this.selectedImage = null;
  }

  nextImage() {
    if (this.currentIndex < this.images.length - 1) {
      this.currentIndex++;
      this.selectedImage = this.images[this.currentIndex];
    }
  }

  prevImage() {
    if (this.currentIndex > 0) {
      this.currentIndex--;
      this.selectedImage = this.images[this.currentIndex];
    }
  }
} 