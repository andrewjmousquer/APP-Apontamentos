import { Component, OnInit } from '@angular/core';
import { Person } from 'src/app/shared/models/person.model';
import { AuthService } from 'src/app/shared/services/auth.service';
import { CepIntegrationService } from 'src/app/shared/services/cep-integration.service';

@Component({
    selector: 'app-home',
    templateUrl: './home.page.html',
    styleUrls: ['./home.page.scss'],

})
export class HomePage implements OnInit {

    loggedInUser: Person = null;
    nameUser: String = null;
    srcUserImg: String = "assets/icons/user-avatar.svg";

    constructor(
        private authService: AuthService
    ) {
    }

    ngOnInit() {

        const userData = this.authService.getUser();

        if (userData && userData.user) {

            if (userData.user.person) {
                let name = userData.user.person.name.substring(0, userData.user.person.name.indexOf(' '));
                this.nameUser = name == '' ? userData.user.person.name : userData.user.person.name.substring(0, userData.user.person.name.indexOf(' '));
                this.srcUserImg = userData.user.person.photo != null && userData.user.person.photo != undefined ? userData.user.person.photo : "assets/icons/user-avatar.svg";
                this.loggedInUser = userData.user.person;
            }
        }


    }

}
