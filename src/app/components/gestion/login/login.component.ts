import { Component, OnInit } from "@angular/core";
import { Router, ActivatedRoute, Params } from "@angular/router";
import { User } from "../../../models/user";
import { UserService } from "../../../services/user.service";
import _swal from "sweetalert";

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.scss"],
  providers: [UserService]
})
export class LoginComponent implements OnInit {
  public user: User;
  public status: string;
  public token: string;
  public identity: any;

  constructor(
    private _userService: UserService,
    private _router: Router,
    private _route: ActivatedRoute
  ) {
    this.user = new User(1, "", "", "USER", "", "", "", "");
  }

  ngOnInit() {
    this.logout();
  }

  onSubmit(form) {
    this._userService.signup(this.user).subscribe(
      response => {
        // TOKEN
        if (response.status != "error") {
          this.status = "success";
          this.token = response;

          // OBJETO USUARIO IDENTIFICADO
          this._userService.signup(this.user, true).subscribe(
            response => {
              this.identity = response;

              // PERSISTIR DATOS USUARIO IDENTIFICADO
              console.log(this.token);
              console.log(this.identity);

              localStorage.setItem("token", this.token);
              localStorage.setItem("identity", JSON.stringify(this.identity));

              this._router.navigate(["inicio"]);
            },
            error => {
              this.status = "error";
              console.log(<any>error);
              _swal("Error", "Las credenciales no son correctas.", "error");
            }
          );
        } else {
          this.status = "error";
          _swal("Error", "Las credenciales no son correctas.", "error");
        }
      },
      error => {
        this.status = "error";
        console.log(<any>error);
        _swal("Error", "Las credenciales no son correctas.", "error");
      }
    );
  }

  logout() {
    this._route.params.subscribe(params => {
      let logout = +params["sure"];

      if (logout == 1) {
        localStorage.removeItem("identity");
        localStorage.removeItem("token");

        this.identity = null;
        this.token = null;

        // Redirección a inicio
        this._router.navigate(["inicio"]);
      }
    });
  }
}
