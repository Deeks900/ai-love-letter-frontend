import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environment';

@Injectable({
  providedIn: 'root',
})
export class Letter {
  private apiUrl = environment.apiUrl;// Debug log
  
  constructor(private http: HttpClient) {}

  generateLetter(payload: any) {
  console.log( `${this.apiUrl}/generate-letter`)  
  return this.http.post<any>(
    `${this.apiUrl}/generate-letter`,
    payload,
    {
      headers: {
        'Content-Type': 'application/json'
      }
    }
  );
}

}
