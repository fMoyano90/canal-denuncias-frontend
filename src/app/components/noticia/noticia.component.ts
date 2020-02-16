import { Component, OnInit } from '@angular/core';
import { Noticia } from '../../models/noticia';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { ajax } from 'rxjs/ajax';
import { global } from '../../services/global';
import { pluck } from 'rxjs/operators';

@Component({
	selector: 'app-noticia',
	templateUrl: './noticia.component.html',
	styleUrls: [ './noticia.component.scss' ]
})
export class NoticiaComponent implements OnInit {
	public noticia: Noticia;
	public url: string;

	constructor(public _route: ActivatedRoute) {
		this.url = global.url;
	}

	ngOnInit() {
		this.obtenerNoticia();
	}

	obtenerNoticia() {
		this._route.params.subscribe((params) => {
			let id = params['id'];
			ajax.getJSON(`${this.url}noticia/${id}`).pipe(pluck<any, Noticia>('noticias')).subscribe({
				next: (resp) => (this.noticia = resp),
				error: (err) => console.log(err),
				complete: () => console.log('Operación completada')
			});
		});
	}
}
