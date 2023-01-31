import { Injectable } from '@angular/core';
import { User } from '../models/user.model';

import { DefaultHttpService } from './default-http.service';


@Injectable({ providedIn: 'root' })
export class ResumeService {
  constructor(private http: DefaultHttpService) { }

  getInitialData() {
    return this.http.get(`/protected/resume/data`)
  }

  getCities(idState: Number) {
    return this.http.get(`/protected/city/getByState/${idState}`)
  }

  removeIntendedOccupation(id: number) {
    return this.http.delete(`/protected/intended-occupation/${id}`)
  }

  removeSchooling(id: number) {
    return this.http.delete(`/protected/schooling/${id}`)
  }

  removeProfissionalExperience(id: number) {
    return this.http.delete(`/protected/profissional-experience/${id}`)
  }


  saveResume(dados, photo: Blob) {

    const dataBlob = new Blob([JSON.stringify(dados)], { type: "application/json" });

    const formData: FormData = new FormData();
    formData.append('model', dataBlob);
    if (photo != null) {
      formData.append('photo', photo);
    }

    return this.http.put(`/protected/resume/save-upload`, formData);
  }
}