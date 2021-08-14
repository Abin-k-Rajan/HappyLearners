import { Injectable } from '@angular/core';
import { AngularFireStorage } from '@angular/fire/storage'
import { finalize } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class UploadFileService {

  constructor(private storage: AngularFireStorage) { }

  upload_image(file: File){
    return new Promise((resolve, reject) => {
      const filename:any = file.name;
      const storage_ref = this.storage.ref(filename);
      const upload_task = this.storage.upload(filename, file);
      try{
        upload_task.snapshotChanges().pipe(
          finalize(() => {
            storage_ref.getDownloadURL().subscribe(
              result => resolve(result),
              error => reject(error)
            );
          })
        ).subscribe();
      }
      catch(error)
      {
        reject(error)
      }

    })
  }

  
}
