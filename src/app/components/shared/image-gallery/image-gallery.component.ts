import { Component, Input, OnInit, OnDestroy, OnChanges, SimpleChanges, ElementRef, Renderer2 } from '@angular/core';

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
export class ImageGalleryComponent implements OnInit, OnDestroy, OnChanges {
  @Input() images: GalleryImage[] = [];
  @Input() showThumbnails: boolean = true; // Nuevo input para controlar miniaturas
  
  currentIndex = 0;
  selectedImage: GalleryImage | null = null;
  isModalOpen = false;
  
  // Variables para el carrusel
  displayStartIndex = 0;
  visibleThumbnails = 3; // Número de miniaturas visibles
  
  private modalElement: HTMLElement | null = null;

  constructor(private renderer: Renderer2) { }

  ngOnInit(): void {
  }

  ngOnDestroy(): void {
    this.removeModalPortal();
    this.renderer.removeClass(document.body, 'modal-open');
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['images']) {
      // Reset currentIndex when images change
      this.currentIndex = 0;
      this.displayStartIndex = 0;
    }
  }

  // Navegación de imagen principal
  nextMainImage(event?: Event) {
    if (event) {
      event.stopPropagation();
      event.preventDefault();
    }
    if (this.currentIndex < this.images.length - 1) {
      this.currentIndex++;
      this.adjustThumbnailView();
    }
  }

  prevMainImage(event?: Event) {
    if (event) {
      event.stopPropagation();
      event.preventDefault();
    }
    if (this.currentIndex > 0) {
      this.currentIndex--;
      this.adjustThumbnailView();
    }
  }

  // Seleccionar imagen desde miniaturas
  selectImage(index: number) {
    this.currentIndex = index;
  }

  // Navegación de miniaturas
  nextThumbnails() {
    if (this.displayStartIndex + this.visibleThumbnails < this.images.length) {
      this.displayStartIndex++;
    }
  }

  prevThumbnails() {
    if (this.displayStartIndex > 0) {
      this.displayStartIndex--;
    }
  }

  // Obtener miniaturas visibles
  getVisibleThumbnails(): GalleryImage[] {
    return this.images.slice(this.displayStartIndex, this.displayStartIndex + this.visibleThumbnails);
  }

  // Ajustar vista de miniaturas cuando cambia la imagen principal
  adjustThumbnailView() {
    if (this.currentIndex < this.displayStartIndex) {
      this.displayStartIndex = this.currentIndex;
    } else if (this.currentIndex >= this.displayStartIndex + this.visibleThumbnails) {
      this.displayStartIndex = this.currentIndex - this.visibleThumbnails + 1;
    }
  }

  // Modal de imagen ampliada
  openModal(index: number): void {
    this.currentIndex = index;
    this.selectedImage = this.images[this.currentIndex];
    this.isModalOpen = true;
    
    // Crear modal como portal al final del body
    this.createModalPortal();
    
    // Prevenir scroll del body
    this.renderer.addClass(document.body, 'modal-open');
  }

  closeModal(): void {
    this.selectedImage = null;
    this.isModalOpen = false;
    
    // Remover el portal modal
    this.removeModalPortal();
    
    // Restaurar scroll del body
    this.renderer.removeClass(document.body, 'modal-open');
  }

  private createModalPortal(): void {
    if (this.modalElement) {
      this.removeModalPortal();
    }

    // Crear el elemento modal
    this.modalElement = this.renderer.createElement('div');
    this.renderer.addClass(this.modalElement, 'modal-portal');
    
    // Aplicar estilos críticos directamente
    this.renderer.setStyle(this.modalElement, 'position', 'fixed');
    this.renderer.setStyle(this.modalElement, 'top', '0');
    this.renderer.setStyle(this.modalElement, 'left', '0');
    this.renderer.setStyle(this.modalElement, 'width', '100vw');
    this.renderer.setStyle(this.modalElement, 'height', '100vh');
    this.renderer.setStyle(this.modalElement, 'background-color', 'rgba(0, 0, 0, 0.95)');
    this.renderer.setStyle(this.modalElement, 'z-index', '2147483647');
    this.renderer.setStyle(this.modalElement, 'display', 'flex');
    this.renderer.setStyle(this.modalElement, 'justify-content', 'center');
    this.renderer.setStyle(this.modalElement, 'align-items', 'center');

    // Crear contenido del modal
    const modalContent = this.renderer.createElement('div');
    this.renderer.setStyle(modalContent, 'position', 'relative');
    
    // Crear imagen
    const img = this.renderer.createElement('img');
    this.renderer.setAttribute(img, 'src', this.images[this.currentIndex].big);
    this.renderer.setAttribute(img, 'alt', this.images[this.currentIndex].description);
    this.renderer.setStyle(img, 'max-width', '90vw');
    this.renderer.setStyle(img, 'max-height', '90vh');
    this.renderer.setStyle(img, 'object-fit', 'contain');

    // Crear botón de cerrar (FUERA del contenido de la imagen)
    const closeBtn = this.renderer.createElement('button');
    this.renderer.setAttribute(closeBtn, 'type', 'button');
    closeBtn.innerHTML = '&times;';
    this.renderer.setStyle(closeBtn, 'position', 'fixed');
    this.renderer.setStyle(closeBtn, 'top', '30px');
    this.renderer.setStyle(closeBtn, 'right', '30px');
    this.renderer.setStyle(closeBtn, 'color', 'white');
    this.renderer.setStyle(closeBtn, 'font-size', '30px');
    this.renderer.setStyle(closeBtn, 'font-weight', 'bold');
    this.renderer.setStyle(closeBtn, 'cursor', 'pointer');
    this.renderer.setStyle(closeBtn, 'background', 'rgba(0, 0, 0, 0.5)');
    this.renderer.setStyle(closeBtn, 'border', '1px solid rgba(255, 255, 255, 0.3)');
    this.renderer.setStyle(closeBtn, 'border-radius', '50%');
    this.renderer.setStyle(closeBtn, 'width', '50px');
    this.renderer.setStyle(closeBtn, 'height', '50px');
    this.renderer.setStyle(closeBtn, 'display', 'flex');
    this.renderer.setStyle(closeBtn, 'align-items', 'center');
    this.renderer.setStyle(closeBtn, 'justify-content', 'center');
    this.renderer.setStyle(closeBtn, 'transition', 'all 0.3s ease');
    this.renderer.setStyle(closeBtn, 'box-shadow', '0 4px 15px rgba(0, 0, 0, 0.3)');
    this.renderer.setStyle(closeBtn, 'z-index', '2147483648');

    // Hover effect para el botón de cerrar
    this.renderer.listen(closeBtn, 'mouseenter', () => {
      this.renderer.setStyle(closeBtn, 'background', 'rgba(255, 0, 0, 0.8)');
      this.renderer.setStyle(closeBtn, 'transform', 'scale(1.1)');
    });
    
    this.renderer.listen(closeBtn, 'mouseleave', () => {
      this.renderer.setStyle(closeBtn, 'background', 'rgba(0, 0, 0, 0.5)');
      this.renderer.setStyle(closeBtn, 'transform', 'scale(1)');
    });

    this.renderer.listen(closeBtn, 'click', () => this.closeModal());

    // Crear botón anterior (FUERA del contenido de la imagen)
    if (this.currentIndex > 0) {
      const prevBtn = this.renderer.createElement('button');
      this.renderer.setAttribute(prevBtn, 'type', 'button');
      prevBtn.innerHTML = '&#8249;';
      this.renderer.setStyle(prevBtn, 'position', 'fixed');
      this.renderer.setStyle(prevBtn, 'top', '50%');
      this.renderer.setStyle(prevBtn, 'transform', 'translateY(-50%)');
      this.renderer.setStyle(prevBtn, 'left', '30px');
      this.renderer.setStyle(prevBtn, 'background', 'rgba(255, 255, 255, 0.9)');
      this.renderer.setStyle(prevBtn, 'color', '#333');
      this.renderer.setStyle(prevBtn, 'border', '2px solid rgba(255, 255, 255, 1)');
      this.renderer.setStyle(prevBtn, 'font-size', '24px');
      this.renderer.setStyle(prevBtn, 'font-weight', 'bold');
      this.renderer.setStyle(prevBtn, 'width', '50px');
      this.renderer.setStyle(prevBtn, 'height', '50px');
      this.renderer.setStyle(prevBtn, 'cursor', 'pointer');
      this.renderer.setStyle(prevBtn, 'border-radius', '50%');
      this.renderer.setStyle(prevBtn, 'display', 'flex');
      this.renderer.setStyle(prevBtn, 'align-items', 'center');
      this.renderer.setStyle(prevBtn, 'justify-content', 'center');
      this.renderer.setStyle(prevBtn, 'transition', 'all 0.3s ease');
      this.renderer.setStyle(prevBtn, 'box-shadow', '0 4px 15px rgba(0, 0, 0, 0.3)');
      this.renderer.setStyle(prevBtn, 'z-index', '2147483648');

      // Hover effect para el botón anterior
      this.renderer.listen(prevBtn, 'mouseenter', () => {
        this.renderer.setStyle(prevBtn, 'background', 'rgba(255, 255, 255, 1)');
        this.renderer.setStyle(prevBtn, 'transform', 'translateY(-50%) scale(1.1)');
      });
      
      this.renderer.listen(prevBtn, 'mouseleave', () => {
        this.renderer.setStyle(prevBtn, 'background', 'rgba(255, 255, 255, 0.9)');
        this.renderer.setStyle(prevBtn, 'transform', 'translateY(-50%) scale(1)');
      });

      this.renderer.listen(prevBtn, 'click', () => this.navigateModal(-1));
      this.renderer.appendChild(this.modalElement, prevBtn);
    }

    // Crear botón siguiente (FUERA del contenido de la imagen)
    if (this.currentIndex < this.images.length - 1) {
      const nextBtn = this.renderer.createElement('button');
      this.renderer.setAttribute(nextBtn, 'type', 'button');
      nextBtn.innerHTML = '&#8250;';
      this.renderer.setStyle(nextBtn, 'position', 'fixed');
      this.renderer.setStyle(nextBtn, 'top', '50%');
      this.renderer.setStyle(nextBtn, 'transform', 'translateY(-50%)');
      this.renderer.setStyle(nextBtn, 'right', '30px');
      this.renderer.setStyle(nextBtn, 'background', 'rgba(255, 255, 255, 0.9)');
      this.renderer.setStyle(nextBtn, 'color', '#333');
      this.renderer.setStyle(nextBtn, 'border', '2px solid rgba(255, 255, 255, 1)');
      this.renderer.setStyle(nextBtn, 'font-size', '24px');
      this.renderer.setStyle(nextBtn, 'font-weight', 'bold');
      this.renderer.setStyle(nextBtn, 'width', '50px');
      this.renderer.setStyle(nextBtn, 'height', '50px');
      this.renderer.setStyle(nextBtn, 'cursor', 'pointer');
      this.renderer.setStyle(nextBtn, 'border-radius', '50%');
      this.renderer.setStyle(nextBtn, 'display', 'flex');
      this.renderer.setStyle(nextBtn, 'align-items', 'center');
      this.renderer.setStyle(nextBtn, 'justify-content', 'center');
      this.renderer.setStyle(nextBtn, 'transition', 'all 0.3s ease');
      this.renderer.setStyle(nextBtn, 'box-shadow', '0 4px 15px rgba(0, 0, 0, 0.3)');
      this.renderer.setStyle(nextBtn, 'z-index', '2147483648');

      // Hover effect para el botón siguiente
      this.renderer.listen(nextBtn, 'mouseenter', () => {
        this.renderer.setStyle(nextBtn, 'background', 'rgba(255, 255, 255, 1)');
        this.renderer.setStyle(nextBtn, 'transform', 'translateY(-50%) scale(1.1)');
      });
      
      this.renderer.listen(nextBtn, 'mouseleave', () => {
        this.renderer.setStyle(nextBtn, 'background', 'rgba(255, 255, 255, 0.9)');
        this.renderer.setStyle(nextBtn, 'transform', 'translateY(-50%) scale(1)');
      });

      this.renderer.listen(nextBtn, 'click', () => this.navigateModal(1));
      this.renderer.appendChild(this.modalElement, nextBtn);
    }

    // Ensamblar modal
    this.renderer.appendChild(modalContent, img);
    this.renderer.appendChild(this.modalElement, modalContent);
    this.renderer.appendChild(this.modalElement, closeBtn);

    // Agregar evento para cerrar con clic en fondo
    this.renderer.listen(this.modalElement, 'click', (event) => {
      if (event.target === this.modalElement) {
        this.closeModal();
      }
    });

    // Agregar evento para cerrar con ESC y navegación con flechas
    this.renderer.listen(document, 'keydown', (event) => {
      if (this.isModalOpen) {
        switch (event.key) {
          case 'Escape':
            this.closeModal();
            break;
          case 'ArrowLeft':
            this.navigateModal(-1);
            break;
          case 'ArrowRight':
            this.navigateModal(1);
            break;
        }
      }
    });

    // Anexar al final del body
    this.renderer.appendChild(document.body, this.modalElement);
  }

  private removeModalPortal(): void {
    if (this.modalElement) {
      this.renderer.removeChild(document.body, this.modalElement);
      this.modalElement = null;
    }
  }

  private navigateModal(direction: number): void {
    const newIndex = this.currentIndex + direction;
    if (newIndex >= 0 && newIndex < this.images.length) {
      this.currentIndex = newIndex;
      this.selectedImage = this.images[this.currentIndex];
      // Recrear modal con nueva imagen
      this.removeModalPortal();
      this.createModalPortal();
    }
  }

  // Manejar teclas del teclado para navegación
  onKeyDown(event: KeyboardEvent) {
    if (this.isModalOpen) {
      switch (event.key) {
        case 'ArrowLeft':
          this.navigateModal(-1);
          break;
        case 'ArrowRight':
          this.navigateModal(1);
          break;
        case 'Escape':
          this.closeModal();
          break;
      }
    }
  }
} 