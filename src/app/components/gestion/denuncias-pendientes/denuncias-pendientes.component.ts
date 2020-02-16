import { Component, OnInit } from '@angular/core';
import { ajax } from 'rxjs/ajax';
import { global } from '../../../services/global';
import { UserService } from '../../../services/user.service';
import { pluck, filter } from 'rxjs/operators';
import { Denuncia } from '../../../models/denuncia';

@Component({
	selector: 'app-denuncias-pendientes',
	templateUrl: './denuncias-pendientes.component.html',
	styleUrls: [ './denuncias-pendientes.component.scss' ],
	providers: [ UserService ]
})
export class DenunciasPendientesComponent implements OnInit {
	public denuncias: Denuncia[];

	public url: string;
	public token: string;

	public p: number = 1;
	public collection: any[];

	public authorization: {};

	constructor(public _userService: UserService) {
		this.url = global.url;
		this.token = this._userService.getToken();
	}

	ngOnInit() {
		this.authorization = {
			'Content-Type': 'application/x-www-form-urlencoded',
			Authorization: this.token
		};
		this.obtenerDenuncias();
	}

	obtenerDenuncias() {
		ajax
			.getJSON(this.url + 'denuncias/pendientes', this.authorization)
			.pipe(pluck<any, any>('denuncias'))
			.subscribe((resp) => ((this.denuncias = resp), console.log(resp)));
	}
}
