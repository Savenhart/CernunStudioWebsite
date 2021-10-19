import { Component, Input, OnInit } from '@angular/core';
import { ImageService } from 'src/app/services/image.service';
import { FormGroup, FormControl, Validators} from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-image-upload',
  templateUrl: './image-upload.component.html',
  styleUrls: ['./image-upload.component.css']
})
export class ImageUploadComponent implements OnInit {
  @Input() gameID!: any;
  images : string[] = [];
  myForm = new FormGroup({
   name: new FormControl('', [Validators.required]),
   file: new FormControl('', [Validators.required]),
   fileSource: new FormControl('', [Validators.required]),
   gameID: new FormControl(this.gameID)
 });

  constructor(private imageService: ImageService, private route: ActivatedRoute) { 
   
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
    this.imageService.uploadPicture(this.myForm.value);
  }

  ngOnInit(): void {
    this.gameID = this.route.snapshot.paramMap.get('id');
    this.myForm.patchValue({gameID: this.gameID});
  }

}
