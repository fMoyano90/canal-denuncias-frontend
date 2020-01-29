import { Component, OnInit } from "@angular/core";

@Component({
  selector: "app-denuncias",
  templateUrl: "./denuncias.component.html",
  styleUrls: ["./denuncias.component.scss"]
})
export class DenunciasComponent implements OnInit {
  public opcionSeleccionada;

  constructor() {}

  ngOnInit() {}

  capturar(opcion) {
    this.opcionSeleccionada = opcion;
  }
}
