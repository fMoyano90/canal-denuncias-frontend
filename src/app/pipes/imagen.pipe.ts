import { Pipe, PipeTransform } from '@angular/core';
import { global } from '../services/global';

@Pipe({
	name: 'imagen'
})
export class ImagenPipe implements PipeTransform {
	transform(img: string, tipo: string = 'usuario'): any {
		let url = global.url;

		if (!img) {
			return url + 'noticia/image/default.png';
		}

		if (img.indexOf('https') >= 0) {
			return img;
		}

		switch (tipo) {
			case 'noticia':
				url += 'noticia/image/' + img;
				break;

			default:
				console.log('Tipo de imagen no existen, usar: usuario, empresa, administrador o noticia');
				url += 'noticia/image/default.png';
		}

		return url;
	}
}
