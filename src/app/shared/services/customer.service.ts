import { Injectable } from '@angular/core';

import { DefaultHttpService } from './default-http.service';

import { Customer } from '../models/customer.model';

@Injectable({ providedIn: 'root' })
export class CustomerService {
    constructor(private http: DefaultHttpService) { }

    getAll() {
        return this.http.get<Customer[]>(`protected/customer/listAll`);
    }

    getById(id: number){
        return this.http.get<Customer>(`/protected/customer/${id}`);
      }
}
