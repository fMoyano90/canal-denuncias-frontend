import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable } from "rxjs";
import { Noticia } from "../models/noticia";
import { global } from "./global";

@Injectable()
export class NoticiaService {
  public url: string;

  constructor(private _http: HttpClient) {
    this.url = global.url;
  }

  create(token, noticia): Observable<any> {
    let json = JSON.stringify(noticia);
    let params = "json=" + json;
    let headers = new HttpHeaders()
      .set("Content-Type", "application/x-www-form-urlencoded")
      .set("Authorization", token);

    return this._http.post(this.url + "noticia", params, { headers: headers });
  }
}
