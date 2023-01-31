import { Component, OnInit } from '@angular/core';
import { Person } from 'src/app/shared/models/person.model';
import { AuthService } from 'src/app/shared/services/auth.service';

@Component({
    selector: 'app-delete-data',
    templateUrl: './delete-data.page.html',
    styleUrls: ['./delete-data.page.scss'],
})
export class DeleteDataPage implements OnInit {

    loggedInUser: Person = null;

    constructor(private authService: AuthService) {
    }

    ngOnInit() {

        const userData = this.authService.getUser();

        if (userData && userData.user) {

            if (userData.user.person) {
                this.loggedInUser = userData.user.person;
            }
        }

    }

}
