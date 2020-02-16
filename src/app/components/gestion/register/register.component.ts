import { Component, OnInit } from "@angular/core";
import { User } from "src/app/models/user";
import { UserService } from "../../../services/user.service";
import _swal from "sweetalert";

@Component({
  selector: "app-register",
  templateUrl: "./register.component.html",
  styleUrls: ["./register.component.scss"],
  providers: [UserService]
})
export class RegisterComponent implements OnInit {
  public user: User;

  constructor(private _userService: UserService) {
    this.user = new User(1, "", "", "USER", "", "", "", "");
  }

  ngOnInit() {}

  onSubmit(form) {
    this._userService.register(this.user).subscribe(
      response => {
        console.log(response);
        _swal(
          "¡Buen trabajo!",
          "El usuario fue creado correctamente.",
          "success"
        );
        form.reset();
      },
      error => {
        console.log(error as any);
      }
    );
  }
}
