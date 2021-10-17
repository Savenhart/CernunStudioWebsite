import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ImageService {

  
  constructor(private httpClient: HttpClient) { }

  uploadPicture(formData: FormData){
    console.log(formData);
    
    return this.httpClient.post<any>(`${environment.apiUrl}/api/assets/pictures`, formData, {
      reportProgress: true,
      observe: 'events'
    });
  }
}
