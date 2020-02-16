import { Component, OnInit } from "@angular/core";
import { global } from "../../services/global";
import { ajax } from "rxjs/ajax";
import { Denuncia } from "../../models/denuncia";
import { UserService } from "../../services/user.service";
import _swal from "sweetalert";
import { Router } from "@angular/router";
declare var require: any;
@Component({
  selector: "app-denuncias",
  templateUrl: "./denuncias.component.html",
  styleUrls: ["./denuncias.component.scss"],
  providers: [UserService]
})
export class DenunciasComponent implements OnInit {
  public opcionSeleccionada;
  public url: string;
  public denuncia: Denuncia;
  public resetVar: any;
  public afuConfig: any = {
    multiple: false,
    formatsAllowed: ".jpg, .png, .gif, .jpeg, .pdf, .doc, .docx, .xls, .xslx",
    maxSize: "1",
    uploadAPI: {
      url: global.url + "denuncia/upload",
      headers: {
        Authorization: this._userService.getToken()
      }
    },
    theme: "attachPin",
    hideProgressBar: false,
    hideResetBtn: true,
    hideSelectBtn: false,
    replaceTexts: {
      selectFileBtn: "Select Files",
      resetBtn: "Reset",
      uploadBtn: "Upload",
      dragNDropBox: "Drag N Drop",
      attachPinBtn: "Sube un archivo",
      afterUploadMsg_success: "Subido correctamente",
      afterUploadMsg_error: "Fallo subir el archivo"
    }
  };

  constructor(public _userService: UserService, private _router: Router) {
    this.url = global.url;
    this.denuncia = new Denuncia(
      1,
      "",
      "",
      "",
      null,
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      false
    );
  }

  ngOnInit() {}

  capturar(opcion) {
    this.opcionSeleccionada = opcion;
  }

  crearDenuncia(form) {
    const uuidv1 = require("uuid/v1");
    this.denuncia.ticket = uuidv1();
    this.denuncia.motivo = this.opcionSeleccionada;

    switch (this.opcionSeleccionada) {
      case "Ley de transparencia":
        this.denuncia.correo_encargado = "rcacciuttolo@cacciuttolo.cl";
        this.denuncia.correo_encargado2 = "lcacciuttolo@cacciuttolo.cl";
        break;

      case "Relaciones laborales":
        this.denuncia.correo_encargado = "fbezanilla@cacciuttolo.cl";
        this.denuncia.correo_encargado2 = "rcacciuttolo@cacciuttolo.cl";
        break;

      case "Seguridad":
        this.denuncia.correo_encargado = "chvigneaux@cacciuttolo.cl";
        this.denuncia.correo_encargado2 = "rcacciuttolo@cacciuttolo.cl";
        break;

      case "Medio ambiente":
        this.denuncia.correo_encargado = "chvigneaux@cacciuttolo.cl";
        this.denuncia.correo_encargado2 = "rcacciuttolo@cacciuttolo.cl";
        break;

      case "Comunidad":
        this.denuncia.correo_encargado = "rcacciuttolo@cacciuttolo.cl";
        this.denuncia.correo_encargado2 = "lcacciuttolo@cacciuttolo.cl";
        break;

      case "Disconformidad con el servicio":
        this.denuncia.correo_encargado = "pquiroga@cacciuttolo.cl";
        this.denuncia.correo_encargado2 = "rcacciuttolo@cacciuttolo.cl";
        break;

      default:
        this.denuncia.correo_encargado = "lcacciuttolo@cacciuttolo.cl";
        this.denuncia.correo_encargado2 = "rcacciuttolo@cacciuttolo.cl";
    }

    let json = JSON.stringify(this.denuncia);
    let params = "json=" + json;

    console.log(params);
    ajax.post(this.url + "denuncia", params).subscribe({
      next: resp => {
        _swal(
          "¡Buen Trabajo!",
          "Tu ticket fue creado exitosamente, pronto te contactaremos.",
          "success"
        );
        setTimeout(() => {
          this._router.navigate(["/inicio"]);
        }, 2000);
      },
      error: err => {
        _swal(
          "Error",
          "El ticket no pudo ser creado. ¡Intenta de nuevo!",
          "error"
        );
      },
      complete: () => console.log("Completado")
    });
  }

  enviarCorreos() {}

  antecedenteUpload(data) {
    const archivo_data = JSON.parse(data.response);
    console.log(archivo_data);
    this.denuncia.antecedentes = archivo_data.file;
  }
}
