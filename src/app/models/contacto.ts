export class Contacto {
	constructor(
		public id: number,
		public nombre: string,
		public email: string,
		public telefono: number,
		public motivo: string,
		public cargo: string,
		public pretension_renta: string,
		public curriculum: string,
		public rut: string,
		public empresa: string,
		public razon_social: string,
		public producto_proveedor: string,
		public servicio_solicitado: string,
		public tipo_equipo: string,
		public origen: string,
		public destino: string,
		public carga: string,
		public asunto: string,
		public mensaje: string
	) {}
}
