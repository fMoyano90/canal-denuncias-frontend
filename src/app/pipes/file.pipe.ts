import { Pipe, PipeTransform } from '@angular/core';
import { global } from '../services/global';

@Pipe({
	name: 'file'
})
export class FilePipe implements PipeTransform {
	transform(file: string): any {
		let url = global.url;
		url += 'denuncia/file/' + file;
		return url;
	}
}
