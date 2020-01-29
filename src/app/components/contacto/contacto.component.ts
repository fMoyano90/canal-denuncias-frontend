import { Component, OnInit } from "@angular/core";

@Component({
  selector: "app-contacto",
  templateUrl: "./contacto.component.html",
  styleUrls: ["./contacto.component.scss"]
})
export class ContactoComponent implements OnInit {
  public opcionSeleccionada;
  public servicio;

  constructor() {}

  ngOnInit() {}

  capturar(opcion) {
    this.opcionSeleccionada = opcion;
  }
  capturarServicio(opcion) {
    this.servicio = opcion;
    console.log(opcion);
  }
}
