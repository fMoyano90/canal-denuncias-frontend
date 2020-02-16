import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UserService } from '../../../services/user.service';
import { Denuncia } from '../../../models/denuncia';
import { global } from '../../../services/global';
import { ajax } from 'rxjs/ajax';
import { pluck } from 'rxjs/operators';
import _swal from 'sweetalert';

@Component({
	selector: 'app-detalle-denuncia',
	templateUrl: './detalle-denuncia.component.html',
	styleUrls: [ './detalle-denuncia.component.scss' ],
	providers: [ UserService ]
})
export class DetalleDenunciaComponent implements OnInit {
	public token: string;
	public url: string;

	public denuncia: Denuncia;

	public p: number = 1;
	public collection: any[];

	public authorization: {};

	constructor(private _route: ActivatedRoute, private _userService: UserService) {
		this.url = global.url;
		this.token = this._userService.getToken();
	}

	ngOnInit() {
		this.authorization = {
			'Content-Type': 'application/x-www-form-urlencoded',
			Authorization: this.token
		};
		this.obtenerDenuncia();
	}

	obtenerDenuncia() {
		this._route.params.subscribe((params) => {
			let id = params['id'];
			ajax
				.getJSON(this.url + 'denuncia/' + id, this.authorization)
				.pipe(pluck<any, Denuncia>('denuncias'))
				.subscribe((resp) => (this.denuncia = resp));
		});
	}

	finalizarTicket() {
		_swal({
			title: '¿Seguro quieres cerrar el ticket?',
			text: '¡El ticket no podrá ser abierto nuevamente!',
			icon: 'warning',
			buttons: [ 'Cancelar', 'Continuar' ]
		}).then((willDelete) => {
			if (willDelete) {
				this.denuncia.finalizada = true;
				let json = JSON.stringify(this.denuncia);
				let params = 'json=' + json;
				ajax.put(this.url + 'denuncia/' + this.denuncia.id, params, this.authorization).subscribe({
					next: (resp) => _swal('!Buen trabajo!', 'El ticket se ha cerrado correctamente', 'success'),
					error: (err) =>
						_swal('Ocurrio un problema', 'El ticket no pudo ser cerrado, intenta mas tarde', 'warning'),
					complete: () => console.log('Completado')
				});
			} else {
				_swal('El ticket sigue abierto', '', 'info');
			}
		});
	}
}
