import { Component, OnInit } from '@angular/core';
import { global } from '../../services/global';
import { ajax } from 'rxjs/ajax';
import { Contacto } from '../../models/contacto';
import { UserService } from '../../services/user.service';
import _swal from 'sweetalert';
import { Router } from '@angular/router';

@Component({
	selector: 'app-contacto',
	templateUrl: './contacto.component.html',
	styleUrls: [ './contacto.component.scss' ],
	providers: [ UserService ]
})
export class ContactoComponent implements OnInit {
	public url: string;
	public contacto: Contacto;
	public resetVar: any;
	public opcionSeleccionada;
	public servicio = '';

	public afuConfig: any = {
		multiple: false,
		formatsAllowed: '.pdf, .doc, .docx',
		maxSize: '1',
		uploadAPI: {
			url: global.url + 'contacto/upload',
			headers: {
				Authorization: this._userService.getToken()
			}
		},
		theme: 'attachPin',
		hideProgressBar: false,
		hideResetBtn: true,
		hideSelectBtn: false,
		replaceTexts: {
			selectFileBtn: 'Select Files',
			resetBtn: 'Reset',
			uploadBtn: 'Upload',
			dragNDropBox: 'Drag N Drop',
			attachPinBtn: 'Sube tu curriculum',
			afterUploadMsg_success: 'Subido correctamente',
			afterUploadMsg_error: 'Fallo subir el archivo'
		}
	};

	constructor(public _userService: UserService, private _router: Router) {
		this.url = global.url;
		this.contacto = new Contacto(1, '', '', null, '', '', '', '', '', '', '', '', '', '', '', '', '', '', '');
	}

	ngOnInit() {}

	capturar(opcion) {
		this.opcionSeleccionada = opcion;
	}
	capturarServicio(opcion) {
		this.servicio = opcion;
	}

	crearContacto(form) {
		this.contacto.motivo = this.opcionSeleccionada;
		this.contacto.servicio_solicitado = this.servicio;

		let json = JSON.stringify(this.contacto);
		let params = 'json=' + json;

		console.log(params);
		ajax.post(this.url + 'contacto', params).subscribe({
			next: (resp) => {
				_swal('¡Buen Trabajo!', 'Hemos recibido tu mensaje, pronto te contactaremos.', 'success');
				console.log(resp);
				setTimeout(() => {
					this._router.navigate([ '/inicio' ]);
				}, 2000);
			},
			error: (err) => {
				_swal('Error', 'Hubo un error ¡Intenta de nuevo!', 'error');
			},
			complete: () => console.log('Completado')
		});
	}

	curriculumUpload(data) {
		const archivo_data = JSON.parse(data.response);
		console.log(archivo_data);
		this.contacto.curriculum = archivo_data.file;
	}
}
