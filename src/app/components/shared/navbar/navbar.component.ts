import { Component, OnInit, DoCheck } from "@angular/core";
import { UserService } from "../../../services/user.service";

@Component({
  selector: "app-navbar",
  templateUrl: "./navbar.component.html",
  styleUrls: ["./navbar.component.scss"],
  providers: [UserService]
})
export class NavbarComponent implements OnInit, DoCheck {
  public identity: any;
  public token: string;

  constructor(public _userService: UserService) {
    this.loadUser();
  }

  ngOnInit() {}

  ngDoCheck() {
    this.loadUser();
  }

  loadUser() {
    this.identity = this._userService.getIdentity();
    this.token = this._userService.getToken();
  }
}
