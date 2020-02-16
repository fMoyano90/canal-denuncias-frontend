export class Denuncia {
	constructor(
		public id: number,
		public ticket: string,
		public nombre: string,
		public email: string,
		public telefono: number,
		public motivo: string,
		public denuncia: string,
		public reclamo: string,
		public antecedentes: string,
		public razon_social: string,
		public rut: string,
		public departamento: string,
		public correo_encargado: string,
		public correo_encargado2: string,
		public finalizada: boolean,
		public created_at?: string
	) {}
}
