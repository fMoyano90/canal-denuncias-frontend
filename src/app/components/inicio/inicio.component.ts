import { Component, OnInit } from '@angular/core';
import { ajax } from 'rxjs/ajax';
import { global } from '../../services/global';
import { Noticia } from '../../models/noticia';
import { pluck, take } from 'rxjs/operators';

@Component({
	selector: 'app-inicio',
	templateUrl: './inicio.component.html',
	styleUrls: [ './inicio.component.scss' ]
})
export class InicioComponent implements OnInit {
	public url: string;
	public noticias: Noticia[];

	public p: number = 1;
	public collection: any[];

	constructor() {
		this.url = global.url;
		this.obtenerNoticias();
	}

	ngOnInit() {}

	obtenerNoticias() {
		ajax.getJSON<any>(`${this.url}noticia`).pipe(pluck('noticias')).subscribe((resp) => {
			this.noticias = resp;
			console.log(resp);
		});
	}
}
