import { Component, OnInit } from '@angular/core';
import { ajax } from 'rxjs/ajax';
import { User } from '../../../models/user';
import { UserService } from '../../../services/user.service';
import _swal from 'sweetalert';

@Component({
	selector: 'app-usuarios',
	templateUrl: './usuarios.component.html',
	styleUrls: [ './usuarios.component.scss' ],
	providers: [ UserService ]
})
export class UsuariosComponent implements OnInit {
	public usuarios: User[];
	public url: string;
	public token: string;

	public p: number = 1;
	public collection: any[];

	constructor(public _userService: UserService) {
		this.url = 'http://localhost/api-canaldenuncias/public/api/user';
		this.token = this._userService.getToken();
	}

	ngOnInit() {
		this.obtenerUsuarios();
	}

	obtenerUsuarios() {
		interface Datos {
			usuarios: any;
		}

		ajax
			.getJSON<Datos>(this.url, {
				'Content-Type': 'application/x-www-form-urlencoded',
				Authorization: this.token
			})
			.subscribe((resp) => {
				this.usuarios = resp.usuarios;
				console.log(resp.usuarios);
			});
	}

	usuarioUpdate(user) {
		let json = JSON.stringify(user);
		let params = 'json=' + json;

		ajax
			.put(`${this.url}/${user.id}`, params, {
				'Content-Type': 'application/x-www-form-urlencoded',
				Authorization: this.token
			})
			.subscribe({
				next: (resp) => {
					_swal('Exito', 'El rol de usuario fue cambiado exitosamente', 'success');
				},
				error: (err) => console.warn(err),
				complete: () => console.log('Completado')
			});
	}

	usuarioDelete(id) {
		_swal({
			title: '¿Seguro quieres eliminar este usuario de los registros?',
			text: '¡La información del usuario no podra recuperarse!',
			icon: 'warning',
			buttons: [ 'Cancelar', 'Continuar' ]
		}).then((willDelete) => {
			if (willDelete) {
				ajax
					.delete(`${this.url}/${id}`, {
						'Content-Type': 'application/x-www-form-urlencoded',
						Authorization: this.token
					})
					.subscribe({
						next: (resp) => {
							this.obtenerUsuarios();
							_swal('¡El usuario se elimino correctamente!', {
								icon: 'success'
							});
						},
						error: (err) => {
							_swal('Hubo un problema', 'El usuario no pudo ser eliminado', 'error');
							console.warn(err);
						},
						complete: () => console.log('Operación completada')
					});
			} else {
				_swal('El usuario esta a salvo');
			}
		});
	}
}
