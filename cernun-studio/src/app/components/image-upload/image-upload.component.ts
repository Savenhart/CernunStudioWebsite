import { Component, OnInit } from '@angular/core';
import { ImageService } from 'src/app/services/image.service';
import { FormGroup, FormControl, Validators} from '@angular/forms';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-image-upload',
  templateUrl: './image-upload.component.html',
  styleUrls: ['./image-upload.component.css']
})
export class ImageUploadComponent implements OnInit {

  images : string[] = [];
  myForm = new FormGroup({
   name: new FormControl('', [Validators.required]),
   file: new FormControl('', [Validators.required]),
   fileSource: new FormControl('', [Validators.required])
 });

  constructor(private imageService: ImageService, private http: HttpClient ) { 
  }

  get formValue(){
    return this.myForm.controls;
  }
    
  onFileChange(event:any) {
    if (event.target.files && event.target.files[0]) {
        var filesAmount = event.target.files.length;
        for (let i = 0; i < filesAmount; i++) {
                var reader = new FileReader();
                reader.onload = (event:any) => {
                  // Push Base64 string
                  this.images.push(event.target.result); 
                  this.patchValues();
                }
                reader.readAsDataURL(event.target.files[i]);
        }
    }
  }

  // Patch form Values
  patchValues(){
    this.myForm.patchValue({
       fileSource: this.images
    });
  }

  // Remove Image
  removeImage(url:any){
    console.log(this.images,url);
    this.images = this.images.filter(img => (img != url));
    this.patchValues();
  }
     
  // Submit Form Data
  submit(){
    this.http.post('http://89.89.222.132:3080/api/upload', this.myForm.value, {observe: 'response', reportProgress: true, withCredentials : false})
      .subscribe(res => {
        console.log(res);
        alert('Uploaded Successfully.');
      })
  }

  // uploadImage(image: any){
  //   image.inProgress = true;    
  //   this.imageService.uploadPicture(image.value);
  // }

  ngOnInit(): void {
  }

}
