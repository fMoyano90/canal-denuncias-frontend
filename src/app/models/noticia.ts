export class Noticia {
	constructor(
		public id: number,
		public categoria: string,
		public titulo: string,
		public descripcion: string,
		public cuerpo: string,
		public imagen: string,
		public principal: boolean,
		public created_at?: string
	) {}
}
