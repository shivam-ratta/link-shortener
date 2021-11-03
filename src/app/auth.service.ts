import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private _http : HttpClient) { }

  postLink(data: any) {
    console.log(data)
    return this._http.get(`https://api.shrtco.de/v2/shorten?url=${data}`)
  }
}
