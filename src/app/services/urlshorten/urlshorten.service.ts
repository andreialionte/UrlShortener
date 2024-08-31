import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UrlshortenService {
  baseUrl: string = "https://localhost:5000/";

  constructor(private readonly httpClient: HttpClient) {}

  // Shorten URL - send URL as a plain string
  shortTheUrl(url: string): Observable<string> {
    const params = new HttpParams().set('Url', url);
    return this.httpClient.post(`${this.baseUrl}ShortenUrl`, null, { params, responseType: 'text' });
  }
  
  getOriginalUrl(pathShortUrl: string): Observable<string> {
    const params = new HttpParams().set('pathShortUrl', pathShortUrl);
    return this.httpClient.get(`${this.baseUrl}GetLink`, {
      params,
      responseType: 'text'  // text instead of object because i didnt made an object (model) in api
      //just returtning to me a string(text)
    });
  }
}
