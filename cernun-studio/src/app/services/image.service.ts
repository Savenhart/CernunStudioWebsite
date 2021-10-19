import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ImageService {

  
  constructor(private httpClient: HttpClient) { }

  uploadPicture(formData: FormData){ 
    return this.httpClient.post<any>(`${environment.apiUrl}/api/picture`, formData, {
      reportProgress: true,
      observe: 'events',
      withCredentials : false
    }).subscribe(res => {
      console.log(res);
      alert('Uploaded Successfully.');
    });
  }

}
