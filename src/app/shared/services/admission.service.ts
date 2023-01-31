import { Injectable } from '@angular/core';
import { DefaultHttpService } from './default-http.service';


@Injectable({ providedIn: 'root' })
export class AdmissionService {
  constructor(private http: DefaultHttpService) { }

  getInitialData() {
    return this.http.get(`/protected/admission/data`)
  }

  acceptConsentForm(consentId: Number) {
    return this.http.post(`/protected/admission/consent-form/${consentId}`, null)
  }

  admissionConclusion(idAdmission: Number) {
    return this.http.post(`/protected/admission/admission-conclusion/${idAdmission}`, null)
  }

  savePersonalInfo(data) {
    return this.http.post(`/protected/admission/save/personal-data`, data)
  }

  getDocAdmission() {
    return this.http.get(`/protected/document-admission/listAll`)
  }

}
