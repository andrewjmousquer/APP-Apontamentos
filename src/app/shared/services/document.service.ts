import { Injectable } from '@angular/core';
import { DefaultHttpService } from './default-http.service';


@Injectable({ providedIn: 'root' })

export class DocumentService {

  constructor(private http: DefaultHttpService) { }

  saveDocument(dados, files: Blob[] = []) {

    const dataBlob = new Blob([JSON.stringify(dados)], { type: "application/json" });

    const formData: FormData = new FormData();
    formData.append('model', dataBlob);

    if (files != null) {
      for (let file of files) {
        formData.append('file', file);

      }
    }
    return this.http.post(`/protected/document-admission/save-upload`, formData);
  }

  getAll() {
    return this.http.get(`/protected/document-admission/listAll`);
  }


  removeDocument(idDocument: Number) {
    return this.http.delete(`/protected/document-admission/${idDocument}`);
  }
}
