import { Component, OnInit } from '@angular/core';
import { ajax } from 'rxjs/ajax';
import { global } from '../../../services/global';
import { UserService } from '../../../services/user.service';
import { pluck } from 'rxjs/operators';
import { Denuncia } from '../../../models/denuncia';
import { ActivatedRoute } from '@angular/router';

@Component({
	selector: 'app-categoria-denuncia',
	templateUrl: './categoria-denuncia.component.html',
	styleUrls: [ './categoria-denuncia.component.scss' ],
	providers: [ UserService ]
})
export class CategoriaDenunciaComponent implements OnInit {
	public denuncias: Denuncia[];
	public categoria: string;

	public url: string;
	public token: string;

	public p: number = 1;
	public collection: any[];

	public authorization: {};

	constructor(public _userService: UserService, private _route: ActivatedRoute) {
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
		this._route.params.subscribe((params) => {
			this.categoria = params['categoria'];
			ajax
				.getJSON(this.url + 'denuncias/' + this.categoria, this.authorization)
				.pipe(pluck<any, any>('denuncias'))
				.subscribe((resp) => ((this.denuncias = resp), console.log(resp)));
		});
	}
}
