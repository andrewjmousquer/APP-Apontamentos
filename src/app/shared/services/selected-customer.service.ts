import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SelectedCustomerService {

  private selectedCustomerId: number = 0;

  constructor() { }

  set(id: number) {
    this.selectedCustomerId = id;
  }

  get() {
    return this.selectedCustomerId;
  }
}
