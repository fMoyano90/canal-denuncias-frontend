import { Pipe, PipeTransform } from '@angular/core';
import { global } from '../services/global';

@Pipe({
	name: 'categoria'
})
export class CategoriaPipe implements PipeTransform {
	transform(categoria: string): any {
		switch (categoria) {
			case 'transparencia':
				categoria = 'Ley de transparencia';
				break;
			case 'laboral':
				categoria = 'Relaciones laborales';
				break;
			case 'seguridad':
				categoria = 'Seguridad';
				break;
			case 'ambiente':
				categoria = 'Medio ambiente';
				break;
			case 'comunidad':
				categoria = 'Comunidad';
				break;
			case 'disconformidad':
				categoria = 'Disconformidad con el servicio';
				break;
		}

		return categoria;
	}
}
