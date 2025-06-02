import { Component, OnInit } from '@angular/core';
import { GalleryImage } from '../shared/image-gallery/image-gallery.component';

@Component({
  selector: 'app-empresa',
  templateUrl: './empresa.component.html',
  styleUrls: ['./empresa.component.scss']
})
export class EmpresaComponent implements OnInit {

  galleryImages: GalleryImage[] = [
    { 
      small: 'assets/img/a1.png',
      medium: 'assets/img/a1.png', 
      big: 'assets/img/a1.png',
      description: 'Foto histórica del fundador - 1' 
    },
    { 
      small: 'assets/img/a2.jfif',
      medium: 'assets/img/a2.jfif', 
      big: 'assets/img/a2.jfif',
      description: 'Foto histórica del fundador - 2' 
    },
    { 
      small: 'assets/img/a3.jpg',
      medium: 'assets/img/a3.jpg', 
      big: 'assets/img/a3.jpg',
      description: 'Foto histórica del fundador - 3' 
    },
    { 
      small: 'assets/img/a4.jpg',
      medium: 'assets/img/a4.jpg', 
      big: 'assets/img/a4.jpg',
      description: 'Foto histórica del fundador - 4' 
    },
    { 
      small: 'assets/img/a5.jfif',
      medium: 'assets/img/a5.jfif', 
      big: 'assets/img/a5.jfif',
      description: 'Foto histórica del fundador - 5' 
    },
    { 
      small: 'assets/img/a6.jfif',
      medium: 'assets/img/a6.jfif', 
      big: 'assets/img/a6.jfif',
      description: 'Foto histórica del fundador - 6' 
    },
    { 
      small: 'assets/img/a7.jfif',
      medium: 'assets/img/a7.jfif', 
      big: 'assets/img/a7.jfif',
      description: 'Foto histórica del fundador - 7' 
    },
    { 
      small: 'assets/img/a8.jfif',
      medium: 'assets/img/a8.jfif', 
      big: 'assets/img/a8.jfif',
      description: 'Foto histórica del fundador - 8' 
    },
    { 
      small: 'assets/img/a9.png',
      medium: 'assets/img/a9.png', 
      big: 'assets/img/a9.png',
      description: 'Foto histórica del fundador - 9' 
    }
  ];

  constructor() { }

  ngOnInit() { }
}
