import { Component, OnInit } from '@angular/core';
import { ajax } from 'rxjs/ajax';
import { global } from '../../services/global';
import { Noticia } from '../../models/noticia';
import { pluck } from 'rxjs/operators';
import { NoticiaService } from '../../services/noticia.service';
import Swal from 'sweetalert2';
import { UserService } from '../../services/user.service';
import { User } from '../../models/user';

const swal = Swal;

@Component({
	selector: 'app-noticias',
	templateUrl: './noticias.component.html',
	styleUrls: [ './noticias.component.scss' ],
	providers: [ UserService ]
})
export class NoticiasComponent implements OnInit {
	public url: string;
	public noticias: Noticia[];
	public principal: Noticia;
	public p: number = 1;
	public collection: any[];

	public identity;
	public token;

	public authorization: {};

	constructor(public _userService: UserService) {
		this.identity = this._userService.getIdentity();
		this.token = this._userService.getToken();
	}

	ngOnInit() {
		this.url = global.url;
		this.hoy();
		this.obtenerNoticias();
		this.obtenerPrincipal();
		this.authorization = {
			'Content-Type': 'application/x-www-form-urlencoded',
			Authorization: this.token
		};
	}

	hoy() {
		const meses = new Array(
			'Enero',
			'Febrero',
			'Marzo',
			'Abril',
			'Mayo',
			'Junio',
			'Julio',
			'Agosto',
			'Septiembre',
			'Octubre',
			'Noviembre',
			'Diciembre'
		);

		const diasSemana = new Array('Domingo', 'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado');
		const hoy = new Date();
		const year = hoy.getFullYear();
		const month = meses[hoy.getMonth()];
		const day = hoy.getDate();
		const dayStr = diasSemana[hoy.getDay()];

		return { hoy, year, month, day, dayStr };
	}

	obtenerNoticias() {
		ajax
			.getJSON(this.url + 'noticias')
			.pipe(pluck('noticias'))
			.subscribe((resp: any) => ((this.noticias = resp), console.log(resp)));
	}

	obtenerPrincipal() {
		ajax
			.getJSON(this.url + 'noticia-principal')
			.pipe(pluck('noticia'))
			.subscribe((resp: any) => ((this.principal = resp), console.log(resp)));
	}

	eliminarNoticia(id) {
		swal.fire({
			title: '¿Seguro quieres eliminar esta noticia de tus registros?',
			text: '¡La información no podra recuperarse!',
			icon: 'warning',
			showCancelButton: true,
			confirmButtonText: 'Continuar',
			cancelButtonText: 'Cancelar'
		}).then((result) => {
			if (result.isConfirmed) {
				ajax.delete(`${this.url}noticia/${id}`, this.authorization).subscribe({
					next: (resp) => {
						this.obtenerNoticias();
						swal.fire('¡La noticia se elimino correctamente!', '', 'success');
					},
					error: (err) => {
						swal.fire('Hubo un problema', 'La noticia no pudo ser eliminada', 'error');
						console.warn(err);
					},
					complete: () => console.log('Operación completada')
				});
			} else {
				swal.fire('La noticia esta a salvo', '', 'info');
			}
		});
	}
}
