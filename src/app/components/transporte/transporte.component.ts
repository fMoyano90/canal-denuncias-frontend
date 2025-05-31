import { Component, OnInit } from '@angular/core';
import { GalleryImage } from '../shared/image-gallery/image-gallery.component';

@Component({
  selector: 'app-transporte',
  templateUrl: './transporte.component.html',
  styleUrls: ['./transporte.component.css']
})
export class TransporteComponent implements OnInit {

  galleryImages: GalleryImage[] = [
    { 
      small: 'assets/img/t3.jpg',
      medium: 'assets/img/t3.jpg', 
      big: 'assets/img/t3.jpg',
      description: 'Transporte de Carga General' 
    },
    { 
      small: 'assets/img/t4.jpg',
      medium: 'assets/img/t4.jpg', 
      big: 'assets/img/t4.jpg',
      description: 'Equipos de Transporte' 
    },
    { 
      small: 'assets/img/t5.jpg',
      medium: 'assets/img/t5.jpg', 
      big: 'assets/img/t5.jpg',
      description: 'Camiones Articulados' 
    },
    { 
      small: 'assets/img/tg-1.jpg',
      medium: 'assets/img/tg-1.jpg', 
      big: 'assets/img/tg-1.jpg',
      description: 'Flota de Vehículos' 
    },
    { 
      small: 'assets/img/tg-2.jpeg',
      medium: 'assets/img/tg-2.jpeg', 
      big: 'assets/img/tg-2.jpeg',
      description: 'Transporte de Sustancias Peligrosas' 
    },
    { 
      small: 'assets/img/tg-3.jpg',
      medium: 'assets/img/tg-3.jpg', 
      big: 'assets/img/tg-3.jpg',
      description: 'Transporte de Sustancias Peligrosas' 
    }
  ];

  galleryImages2: GalleryImage[] = [
    { 
      small: 'assets/img/t1.jpg',
      medium: 'assets/img/t1.jpg', 
      big: 'assets/img/t1.jpg',
      description: 'Transporte a Granel' 
    },
    { 
      small: 'assets/img/t2.jpg',
      medium: 'assets/img/t2.jpg', 
      big: 'assets/img/t2.jpg',
      description: 'Camiones Tolva' 
    }
  ];

  galleryImages3: GalleryImage[] = [
    { 
      small: 'assets/img/t6.jpg',
      medium: 'assets/img/t6.jpg', 
      big: 'assets/img/t6.jpg',
      description: 'Transporte Especial' 
    },
    {
      small: 'assets/img/t7.jpg',
      medium: 'assets/img/t7.jpg', 
      big: 'assets/img/t7.jpg',
      description: 'Transporte Especial' 
    },
    {
      small: 'assets/img/t8.jpg',
      medium: 'assets/img/t8.jpg', 
      big: 'assets/img/t8.jpg',
      description: 'Transporte Especial' 
    },
    { 
      small: 'assets/img/te-1.jpg',
      medium: 'assets/img/te-1.jpg', 
      big: 'assets/img/te-1.jpg',
      description: 'Equipos Certificados' 
    }
  ];

  galleryImages4: GalleryImage[] = [
    { 
      small: 'assets/img/t9.jpg',
      medium: 'assets/img/t9.jpg', 
      big: 'assets/img/t9.jpg',
      description: 'Interior Mina' 
    },
    { 
      small: 'assets/img/t10.jpg',
      medium: 'assets/img/t10.jpg', 
      big: 'assets/img/t10.jpg',
      description: 'Interior Mina' 
    },
    { 
      small: 'assets/img/tm-1.jpg',
      medium: 'assets/img/tm-1.jpg', 
      big: 'assets/img/tm-1.jpg',
      description: 'Acceso Restringido' 
    },
    { 
      small: 'assets/img/tm-2.jpg',
      medium: 'assets/img/tm-2.jpg', 
      big: 'assets/img/tm-2.jpg',
      description: 'Equipos Compactos' 
    }
  ];

  galleryImages5: GalleryImage[] = [
    { 
      small: 'assets/img/t11.jpg',
      medium: 'assets/img/t11.jpg', 
      big: 'assets/img/t11.jpg',
      description: 'Carga Indivisible' 
    },
    { 
      small: 'assets/img/t12.jpg',
      medium: 'assets/img/t12.jpg', 
      big: 'assets/img/t12.jpg',
      description: 'Carga Indivisible' 
    },
    { 
      small: 'assets/img/t13.jpg',
      medium: 'assets/img/t13.jpg', 
      big: 'assets/img/t13.jpg',
      description: 'Carga Indivisible' 
    },
    { 
      small: 'assets/img/t14.jpg',
      medium: 'assets/img/t14.jpg', 
      big: 'assets/img/t14.jpg',
      description: 'Carga Indivisible' 
    },
    { 
      small: 'assets/img/tci-1.jpg',
      medium: 'assets/img/tci-1.jpg', 
      big: 'assets/img/tci-1.jpg',
      description: 'Camas Bajas' 
    }
  ];

  galleryImages6: GalleryImage[] = [
    { 
      small: 'assets/img/tiz-1.jpg',
      medium: 'assets/img/tiz-1.jpg', 
      big: 'assets/img/tiz-1.jpg',
      description: 'Carga y Descarga' 
    },
    { 
      small: 'assets/img/tiz-2.jpg',
      medium: 'assets/img/tiz-2.jpg', 
      big: 'assets/img/tiz-2.jpg',
      description: 'Carga y Descarga' 
    },
    { 
      small: 'assets/img/tiz-3.jpg',
      medium: 'assets/img/tiz-3.jpg', 
      big: 'assets/img/tiz-3.jpg',
      description: 'Carga y Descarga' 
    },
    { 
      small: 'assets/img/tiz-4.jpg',
      medium: 'assets/img/tiz-4.jpg', 
      big: 'assets/img/tiz-4.jpg',
      description: 'Carga y Descarga' 
    },
    { 
      small: 'assets/img/tiz-5.jpeg',
      medium: 'assets/img/tiz-5.jpeg', 
      big: 'assets/img/tiz-5.jpeg',
      description: 'Carga y Descarga' 
    },
    { 
      small: 'assets/img/tiz-6.jpg',
      medium: 'assets/img/tiz-6.jpg', 
      big: 'assets/img/tiz-6.jpg',
      description: 'Carga y Descarga' 
    },
  ];

  constructor() { }

  ngOnInit() { }
}
