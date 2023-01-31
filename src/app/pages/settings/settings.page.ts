import { Component, OnInit } from '@angular/core';

import { AuthService } from '../../shared/services/auth.service';
import { SelectedCustomerService } from 'src/app/shared/services/selected-customer.service';

import { systemEnvironment } from '../../../environments/system-environment';

import { Person } from '../../shared/models/person.model';
import { Customer } from 'src/app/shared/models/customer.model';

@Component({
    selector: 'app-settings',
    templateUrl: './settings.page.html',
    styleUrls: ['./settings.page.scss'],
})
export class SettingsPage implements OnInit {

    versionNumber: String;
    versionDate: String;

    nameUser: String = null;
    srcUserImg: String = "assets/icons/user-avatar.svg";

    loggedInUser: Person = null;
    customers: Customer[];
    selectedCustomer: Customer;
    customerSelectOptions = {
        header: 'Seleção de Produtor',
    };

    constructor(private authService: AuthService, private selectedCustomerService: SelectedCustomerService) {
    }

    ngOnInit() {
        this.versionDate = systemEnvironment.versionDate;
        this.versionNumber = systemEnvironment.versionNumber;

        const userData = this.authService.getUser();

        if (userData && userData.user) {

            if (userData.user.person) {
                this.loggedInUser = userData.user.person;
                this.nameUser = userData.user.person.name;
                this.srcUserImg = userData.user.person.photo != null && userData.user.person.photo != undefined ? userData.user.person.photo : "assets/icons/user-avatar.svg";

            }

            if (userData.user.customers && userData.user.customers.length > 0) {
                this.customers = userData.user.customers;
                if (userData.user.customer != null) {
                    this.selectedCustomer = this.customers.filter(customer => { return customer.id == userData.user.customer.id })[0];
                }
            }
        }

    }

    changeCustomer(e) {
        const customer = e.target.value;
        this.selectedCustomerService.set(customer.id);
    }

    logout() {
        this.authService.logout();
    }

}
