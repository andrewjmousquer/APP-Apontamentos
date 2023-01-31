import { Injectable } from '@angular/core';
import { DefaultHttpService } from './default-http.service';


@Injectable({ providedIn: 'root' })
export class BasicDataService {
  constructor(private http: DefaultHttpService) { }

  removeContact(id: number) {
    return this.http.delete(`/protected//${id}`)
  }

  removeEmergencyContact(id: number) {
    return this.http.delete(`/protected/contact/emergency/${id}`)
  }

  removeBankAccount(id: number) {
    return this.http.delete(`/protected/bank-account/${id}`)
  }

  removeSchoolingList(id: number) {
    return this.http.delete(`/protected/schooling/${id}`)
  }

  getCities(idState: Number) {
    return this.http.get(`/protected/city/getByState/${idState}`)
  }

}