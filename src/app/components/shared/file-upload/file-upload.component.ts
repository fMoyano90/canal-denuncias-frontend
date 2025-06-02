import { Component, Output, EventEmitter, Input } from '@angular/core';

@Component({
  selector: 'app-file-upload',
  template: `
    <div 
      class="file-drop-zone"
      [class.dragover]="isDragOver"
      (dragover)="onDragOver($event)"
      (dragleave)="onDragLeave($event)"
      (drop)="onDrop($event)"
      (click)="fileInput.click()"
    >
      <div class="upload-content">
        <i class="fa fa-cloud-upload fa-3x"></i>
        <p>Arrastra archivos aquí o haz clic para seleccionar</p>
        <small *ngIf="accept">Tipos permitidos: {{ accept }}</small>
      </div>
      <input 
        #fileInput
        type="file" 
        [accept]="accept"
        [multiple]="multiple"
        (change)="onFileSelected($event)"
        style="display: none"
      />
    </div>
  `,
  styles: [`
    .file-drop-zone {
      border: 2px dashed #ccc;
      border-radius: 8px;
      padding: 40px;
      text-align: center;
      cursor: pointer;
      transition: all 0.3s ease;
      background-color: #fafafa;
    }
    
    .file-drop-zone:hover,
    .file-drop-zone.dragover {
      border-color: #007bff;
      background-color: #e7f3ff;
    }
    
    .upload-content {
      pointer-events: none;
    }
    
    .upload-content i {
      color: #ccc;
      margin-bottom: 16px;
    }
    
    .file-drop-zone:hover .upload-content i,
    .file-drop-zone.dragover .upload-content i {
      color: #007bff;
    }
  `]
})
export class FileUploadComponent {
  @Input() accept: string = '';
  @Input() multiple: boolean = true;
  @Output() filesDropped = new EventEmitter<File[]>();
  
  isDragOver = false;

  onDragOver(event: DragEvent) {
    event.preventDefault();
    event.stopPropagation();
    this.isDragOver = true;
  }

  onDragLeave(event: DragEvent) {
    event.preventDefault();
    event.stopPropagation();
    this.isDragOver = false;
  }

  onDrop(event: DragEvent) {
    event.preventDefault();
    event.stopPropagation();
    this.isDragOver = false;

    const files = Array.from(event.dataTransfer?.files || []);
    if (files.length > 0) {
      this.filesDropped.emit(files);
    }
  }

  onFileSelected(event: any) {
    const files = Array.from(event.target.files || []) as File[];
    if (files.length > 0) {
      this.filesDropped.emit(files);
    }
  }
} 