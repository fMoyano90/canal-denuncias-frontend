import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { UserService } from '../../../services/user.service';
import { Noticia } from '../../../models/noticia';
import { NoticiaService } from '../../../services/noticia.service';
import Swal from 'sweetalert2';
import { global } from '../../../services/global';

const swal = Swal;

@Component({
	selector: 'app-crear-noticia',
	templateUrl: './crear-noticia.component.html',
	styleUrls: [ './crear-noticia.component.scss' ],
	providers: [ UserService, NoticiaService ]
})
export class CrearNoticiaComponent implements OnInit {
	public identity: any;
	public token: string;
	public noticia: Noticia;
	public url: string;
	public resetVar: void;
	public update: boolean = false;

	public options: any = {
		height: 400,
		menubar: false,
		laguage: 'es',
		plugins: [
			'advlist autolink lists link image charmap print preview anchor',
			'searchreplace visualblocks code fullscreen',
			'insertdatetime media table paste code help wordcount'
		],
		toolbar:
			'undo redo | formatselect | bold italic backcolor | \
       alignleft aligncenter alignright alignjustify | \
       bullist numlist outdent indent | removeformat | help'
	};

	public afuConfig: any = {
		multiple: false,
		formatsAllowed: '.jpg, .png, .gif, .jpeg',
		maxSize: '1',
		uploadAPI: {
			url: global.url + 'noticia/upload',
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
			attachPinBtn: 'Sube una imagen',
			afterUploadMsg_success: 'Successfully Uploaded !',
			afterUploadMsg_error: 'Upload Failed !'
		}
	};

	constructor(
		private _route: ActivatedRoute,
		private _router: Router,
		private _userService: UserService,
		private _noticiaService: NoticiaService
	) {
		this.identity = this._userService.getIdentity();
		this.token = this._userService.getToken();
	}

	ngOnInit() {
		this.noticia = new Noticia(1, '', '', '', '', '', false);
		console.log(this.token);
	}

	imageUpload(files: File[]) {
		console.log('Archivos de imagen recibidos:', files);
		if (files && files.length > 0) {
			const file = files[0];
			console.log('Imagen seleccionada:', file.name);
			// Aquí puedes implementar la lógica de subida de imagen
			// this.noticia.imagen = file;
		}
	}

	onSubmit(form) {
		console.log(this.noticia);
		this._noticiaService.create(this.token, this.noticia).subscribe(
			(response) => {
				if (response.status == 'success') {
					this.noticia = response.noticia;
					swal.fire('¡Buen Trabajo!', 'La noticia fue creada exitosamente.', 'success');
					setTimeout(() => {
						this._router.navigate([ '/noticias' ]);
					}, 2000);
				}
			},
			(error) => {
				swal.fire('Error', 'La noticia no pudo ser creada. ¡Intenta de nuevo!', 'error');
				console.log(error);
			}
		);
	}
}
