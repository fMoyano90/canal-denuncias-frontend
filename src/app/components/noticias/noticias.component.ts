import { Component, OnInit } from "@angular/core";

@Component({
  selector: "app-noticias",
  templateUrl: "./noticias.component.html",
  styleUrls: ["./noticias.component.scss"]
})
export class NoticiasComponent implements OnInit {
  constructor() {}

  ngOnInit() {
    this.hoy();
  }

  hoy() {
    let meses = new Array(
      "Enero",
      "Febrero",
      "Marzo",
      "Abril",
      "Mayo",
      "Junio",
      "Julio",
      "Agosto",
      "Septiembre",
      "Octubre",
      "Noviembre",
      "Diciembre"
    );

    let diasSemana = new Array(
      "Domingo",
      "Lunes",
      "Martes",
      "Miércoles",
      "Jueves",
      "Viernes",
      "Sábado"
    );

    let hoy = new Date();
    let year = hoy.getFullYear();
    let month = meses[hoy.getMonth()];
    let day = hoy.getDate();
    let dayStr = diasSemana[hoy.getDay()];

    return { hoy, year, month, day, dayStr };
  }
}
