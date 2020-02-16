import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { UserService } from '../../../services/user.service';
import { Noticia } from '../../../models/noticia';
import { NoticiaService } from '../../../services/noticia.service';
import _swal from 'sweetalert';
import { global } from '../../../services/global';
import { ajax } from 'rxjs/ajax';
import { stringify } from 'querystring';
import { pluck } from 'rxjs/operators';

@Component({
	selector: 'app-editar-noticia',
	templateUrl: '../crear-noticia/crear-noticia.component.html',
	styles: [],
	providers: [ UserService, NoticiaService ]
})
export class EditarNoticiaComponent implements OnInit {
	public identity: any;
	public token: string;
	public noticia: Noticia;
	public url: string;
	public resetVar: void;
	public update: boolean = true;
	public authorization: {};

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
		this.url = global.url;
		this.noticia = new Noticia(1, '', '', '', '', '', false);
	}

	ngOnInit() {
		console.log(this.token);
		this.obtenerNoticia();
		this.authorization = {
			'Content-Type': 'application/x-www-form-urlencoded',
			Authorization: this.token
		};
	}

	imageUpload(data) {
		const imagen_data = JSON.parse(data.response);
		console.log(imagen_data);
		this.noticia.imagen = imagen_data.imagen;
	}

	obtenerNoticia() {
		this._route.params.subscribe((params) => {
			let id = params['id'];
			ajax
				.getJSON<any>(`${this.url}noticia/${id}`)
				.pipe(pluck('noticias'))
				.subscribe((resp) => ((this.noticia = resp), console.log(resp)));
		});
	}

	onSubmit(noticia) {
		this._route.params.subscribe((params) => {
			let json = JSON.stringify(noticia);
			let jsonParams = 'json=' + json;
			let id = params['id'];
			ajax.put(`${this.url}noticia/${id}`, jsonParams, this.authorization).subscribe({
				next: (resp) => {
					_swal('Exito', '¡La noticia fue actualizada!', 'success');
					setTimeout(() => {
						this._router.navigate([ '/noticias' ]);
					}, 2000);
				},
				error: (err) => console.warn(err),
				complete: () => console.log('Completado')
			});
		});
	}
}
