import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { EmailService, ContactForm } from '../../services/email.service';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';

const swal = Swal;

@Component({
	selector: 'app-contacto',
	templateUrl: './contacto.component.html',
	styleUrls: [ './contacto.component.scss' ]
})
export class ContactoComponent implements OnInit {
	public contactForm: ContactForm;
	public opcionSeleccionada: string = '';
	public servicio: string = '';
	public selectedFile: File | null = null;
	public isSubmitting: boolean = false;

	// Campos adicionales para formulario completo
	public cargo: string = '';
	public pretensionRenta: string = '';
	public ciudadResidencia: string = '';
	public rut: string = '';
	public razonSocial: string = '';
	public productoProveedor: string = '';
	public tipoEquipo: string = '';
	public origen: string = '';
	public destino: string = '';
	public carga: string = '';
	public asunto: string = '';

	constructor(
		private emailService: EmailService,
		private router: Router,
		private cdr: ChangeDetectorRef
	) {
		this.contactForm = {
			name: '',
			email: '',
			phone: '',
			company: '',
			message: ''
		};
	}

	ngOnInit() {}

	capturar(opcion: string) {
		this.opcionSeleccionada = opcion;
	}

	capturarServicio(opcion: string) {
		this.servicio = opcion;
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

	curriculumUpload(files: File[]) {
		if (files && files.length > 0) {
			const file = files[0];
			const validation = this.emailService.validateFile(file);
			if (validation.isValid) {
				this.selectedFile = file;
			} else {
				swal.fire('Error', validation.message, 'error');
			}
		}
	}

	async crearContacto(form: any) {
		if (this.isSubmitting) return;
		
		// Cambiar estado con timeout para asegurar detección
		this.isSubmitting = true;
		
		// Usar setTimeout para asegurar que Angular detecte el cambio
		setTimeout(async () => {
			try {
				// Construir mensaje según el tipo de contacto
				let message = this.buildMessage();
				
				const contactData: ContactForm = {
					name: this.contactForm.name,
					email: this.contactForm.email,
					phone: this.contactForm.phone,
					company: this.razonSocial || undefined,
					message: message,
					motivo: this.opcionSeleccionada
				};

				const result = await this.emailService.sendContactForm(contactData, this.selectedFile || undefined);

				if (result.success) {
					swal.fire('¡Buen Trabajo!', result.message, 'success');
					this.resetForm();
					setTimeout(() => {
						this.router.navigate(['/inicio']);
					}, 2000);
				} else {
					swal.fire('Error', result.message, 'error');
				}

			} catch (error) {
				console.error('Error en envío:', error);
				swal.fire('Error', 'Hubo un error ¡Intenta de nuevo!', 'error');
			} finally {
				this.isSubmitting = false;
				this.cdr.detectChanges();
			}
		}, 0);
	}

	private buildMessage(): string {
		let message = `MOTIVO: ${this.opcionSeleccionada}\n\n`;

		switch (this.opcionSeleccionada) {
			case 'Trabajo':
				message += `CARGO POSTULACIÓN: ${this.cargo}\n`;
				message += `CIUDAD DE RESIDENCIA: ${this.ciudadResidencia}\n`;
				message += `PRETENSIONES DE RENTA: ${this.pretensionRenta}\n`;
				if (this.selectedFile) {
					message += `CURRICULUM ADJUNTO: ${this.selectedFile.name}\n`;
				}
				break;

			case 'Proveedor':
				message += `RUT EMPRESA: ${this.rut}\n`;
				message += `RAZÓN SOCIAL: ${this.razonSocial}\n`;
				message += `PRODUCTO/SERVICIO OFRECIDO: ${this.productoProveedor}\n`;
				break;

			case 'Cotizacion':
				message += `RUT EMPRESA: ${this.rut}\n`;
				message += `RAZÓN SOCIAL: ${this.razonSocial}\n`;
				message += `SERVICIO SOLICITADO: ${this.servicio}\n`;
				
				if (this.servicio === 'transporte') {
					message += `TIPO DE EQUIPO: ${this.tipoEquipo}\n`;
					message += `ORIGEN: ${this.origen}\n`;
					message += `DESTINO: ${this.destino}\n`;
					message += `DESCRIPCIÓN DE CARGA: ${this.carga}\n`;
				} else if (this.servicio === 'arriendo') {
					message += `TIPO DE EQUIPO: ${this.tipoEquipo}\n`;
				}
				break;

			case 'Otro':
				message += `ASUNTO: ${this.asunto}\n`;
				message += `MENSAJE: ${this.contactForm.message}\n`;
				break;
		}

		return message;
	}

	private resetForm() {
		this.isSubmitting = false;
		this.contactForm = {
			name: '',
			email: '',
			phone: '',
			company: '',
			message: ''
		};
		this.opcionSeleccionada = '';
		this.servicio = '';
		this.selectedFile = null;
		this.cargo = '';
		this.pretensionRenta = '';
		this.ciudadResidencia = '';
		this.rut = '';
		this.razonSocial = '';
		this.productoProveedor = '';
		this.tipoEquipo = '';
		this.origen = '';
		this.destino = '';
		this.carga = '';
		this.asunto = '';
		this.cdr.detectChanges();
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
