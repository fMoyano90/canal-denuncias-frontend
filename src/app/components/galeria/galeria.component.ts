import { Component, OnInit } from '@angular/core';
import { GalleryImage } from '../shared/image-gallery/image-gallery.component';

@Component({
  selector: 'app-galeria',
  templateUrl: './galeria.component.html',
  styleUrls: ['./galeria.component.css']
})
export class GaleriaComponent implements OnInit {

  // Imágenes de Transporte
  transporteImages: GalleryImage[] = [];

  // Imágenes de Operación de Bodega
  bodegaImages: GalleryImage[] = [];

  // Array mantenido para compatibilidad (si se usa en otro lugar)
  galleryImages: GalleryImage[] = [
    ...this.transporteImages,
    ...this.bodegaImages
  ];

  constructor() { 
    // Generar imágenes de transporte dinámicamente
    this.generateTransporteImages();
    // Generar imágenes de bodega dinámicamente
    this.generateBodegaImages();
  }

  ngOnInit(): void {
  }

  private generateTransporteImages() {
    for (let i = 1; i <= 47; i++) {
      const imageNumber = i.toString().padStart(2, '0'); // Para tener gt01, gt02, etc.
      this.transporteImages.push({
        small: `assets/img/gt${i}.jpg`,
        medium: `assets/img/gt${i}.jpg`,
        big: `assets/img/gt${i}.jpg`,
        description: `Transporte - Imagen ${i}`
      });
    }
  }

  private generateBodegaImages() {
    for (let i = 1; i <= 16; i++) {
      this.bodegaImages.push({
        small: `assets/img/gb${i}.jpg`,
        medium: `assets/img/gb${i}.jpg`,
        big: `assets/img/gb${i}.jpg`,
        description: `Operación de Bodega - Imagen ${i}`
      });
    }
  }
}
