import { Component, OnInit, ChangeDetectorRef } from "@angular/core";
import { EmailService, DenunciaForm } from "../../services/email.service";
import Swal from 'sweetalert2';
import { Router } from "@angular/router";

const swal = Swal;

@Component({
  selector: "app-denuncias",
  templateUrl: "./denuncias.component.html",
  styleUrls: ["./denuncias.component.scss"]
})
export class DenunciasComponent implements OnInit {
  public opcionSeleccionada: string = '';
  public denunciaForm: DenunciaForm;
  public selectedFile: File | null = null;
  public isSubmitting: boolean = false;

  // Campos adicionales
  public razonSocial: string = '';
  public rut: string = '';
  public descripcionDenuncia: string = '';
  public descripcionReclamo: string = '';

  constructor(
    private emailService: EmailService,
    private router: Router,
    private cdr: ChangeDetectorRef
  ) {
    this.denunciaForm = {
      name: '',
      email: '',
      phone: '',
      company: '',
      category: '',
      description: ''
    };
  }

  ngOnInit() {}

  capturar(opcion: string) {
    this.opcionSeleccionada = opcion;
    this.denunciaForm.category = opcion;
  }

  onFileSelected(event: any) {
    const file = event.target.files[0];
    if (file) {
      const validation = this.emailService.validateFile(file);
      if (validation.isValid) {
        this.selectedFile = file;
      } else {
        swal.fire('Error', validation.message, 'error');
        event.target.value = '';
      }
    }
  }

  antecedenteUpload(files: File[]) {
    if (files && files.length > 0) {
      const file = files[0]; // Tomar solo el primer archivo
      const validation = this.emailService.validateFile(file);
      if (validation.isValid) {
        this.selectedFile = file;
      } else {
        swal.fire('Error', validation.message, 'error');
      }
    }
  }

  async crearDenuncia(form: any) {
    if (this.isSubmitting) return;
    
    // Cambiar estado con timeout para asegurar detección
    this.isSubmitting = true;
    
    // Usar setTimeout para asegurar que Angular detecte el cambio
    setTimeout(async () => {
      try {
        // Construir descripción según el tipo de denuncia
        let description = this.buildDescription();
        
        const denunciaData: DenunciaForm = {
          name: this.denunciaForm.name,
          email: this.denunciaForm.email,
          phone: this.denunciaForm.phone,
          company: this.razonSocial || undefined,
          category: this.opcionSeleccionada,
          description: description
        };

        const result = await this.emailService.sendDenuncia(denunciaData, this.selectedFile || undefined);

        if (result.success) {
          swal.fire({
            title: '¡Denuncia Enviada!',
            html: `
              <p>Tu denuncia ha sido enviada exitosamente.</p>
              <p><strong>Código de Ticket: ${result.ticketCode}</strong></p>
              <p><small>Guarda este código para consultar el estado de tu denuncia.</small></p>
            `,
            icon: 'success',
            confirmButtonText: 'Entendido'
          });
          
          this.resetForm();
          setTimeout(() => {
            this.router.navigate(['/inicio']);
          }, 3000);
        } else {
          swal.fire('Error', result.message, 'error');
        }

      } catch (error) {
        console.error('Error en envío:', error);
        swal.fire('Error', 'El ticket no pudo ser creado. ¡Intenta de nuevo!', 'error');
      } finally {
        this.isSubmitting = false;
        this.cdr.detectChanges();
      }
    }, 0);
  }

  private buildDescription(): string {
    let description = '';

    if (this.opcionSeleccionada === 'Disconformidad con el servicio') {
      description = `RECLAMO POR DISCONFORMIDAD CON EL SERVICIO\n\n`;
      if (this.razonSocial) description += `RAZÓN SOCIAL: ${this.razonSocial}\n`;
      if (this.rut) description += `RUT: ${this.rut}\n`;
      description += `DESCRIPCIÓN DEL RECLAMO:\n${this.descripcionReclamo}`;
    } else {
      description = `DENUNCIA - ${this.opcionSeleccionada.toUpperCase()}\n\n`;
      description += `DESCRIPCIÓN DE LA DENUNCIA:\n${this.descripcionDenuncia}`;
    }

    if (this.selectedFile) {
      description += `\n\nARCHIVO ADJUNTO: ${this.selectedFile.name}`;
    }

    return description;
  }

  private resetForm() {
    this.isSubmitting = false; // Asegurar que se resetee
    this.denunciaForm = {
      name: '',
      email: '',
      phone: '',
      company: '',
      category: '',
      description: ''
    };
    this.opcionSeleccionada = '';
    this.selectedFile = null;
    this.razonSocial = '';
    this.rut = '';
    this.descripcionDenuncia = '';
    this.descripcionReclamo = '';
    this.cdr.detectChanges(); // Forzar actualización tras reseteo
  }

  // Función para formatear RUT chileno
  formatRUT(event: any) {
    let value = event.target.value.replace(/[^0-9kK]/g, ''); // Solo números y K
    
    if (value.length > 1) {
      // Separar número y dígito verificador
      const rut = value.slice(0, -1);
      const dv = value.slice(-1).toUpperCase();
      
      // Formatear con puntos
      let formattedRut = rut.replace(/\B(?=(\d{3})+(?!\d))/g, '.');
      
      // Agregar guión y dígito verificador
      this.rut = formattedRut + '-' + dv;
    } else {
      this.rut = value;
    }
    
    // Validar RUT si está completo
    if (this.rut.length >= 9) {
      this.validateRUT();
    }
  }

  // Función para validar RUT chileno
  validateRUT(): boolean {
    if (!this.rut) return false;
    
    // Limpiar formato
    const cleanRut = this.rut.replace(/[.-]/g, '');
    
    if (cleanRut.length < 8) return false;
    
    const rut = cleanRut.slice(0, -1);
    const dv = cleanRut.slice(-1).toUpperCase();
    
    // Calcular dígito verificador
    let suma = 0;
    let multiplicador = 2;
    
    for (let i = rut.length - 1; i >= 0; i--) {
      suma += parseInt(rut[i]) * multiplicador;
      multiplicador = multiplicador === 7 ? 2 : multiplicador + 1;
    }
    
    const resto = suma % 11;
    const dvCalculado = resto === 0 ? '0' : resto === 1 ? 'K' : (11 - resto).toString();
    
    return dv === dvCalculado;
  }

  // Función para mostrar error si RUT es inválido
  onRutBlur() {
    if (this.rut && this.rut.length >= 9 && !this.validateRUT()) {
      swal.fire('RUT Inválido', 'El RUT ingresado no es válido. Por favor verifícalo.', 'error');
    }
  }
}
