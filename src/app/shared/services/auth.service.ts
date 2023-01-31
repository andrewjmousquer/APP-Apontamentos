import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { NavController, AlertController } from '@ionic/angular';
import { JwtHelperService } from '@auth0/angular-jwt';

import { BehaviorSubject, Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import * as moment from 'moment';

import { get, set, remove } from '../utils/storage.utils';

import { environment } from '../../../environments/environment';
import { SelectedCustomerService } from './selected-customer.service';

import { AuthSettings } from '../models/auth-settings.model';
import { User } from '../models/user.model';

const jwtHelper = new JwtHelperService();
const USER_SETTINGS_KEY = 'USER_SETTINGS';

@Injectable({
    providedIn: 'root'
})
export class AuthService {

    private userSub = new BehaviorSubject(null);
    public user: Observable<AuthSettings> = this.userSub.asObservable();

    constructor(private http: HttpClient, private navCtrl: NavController, private selectedCustomerService: SelectedCustomerService, private alertCtrl: AlertController) {
    }

    /**
     * Gets the logged in user
     */
    getUser(): AuthSettings {
        const userData = this.userSub.getValue();
        // Checking if token is expired
        if (userData) {
            if (moment().valueOf() >= (userData.tokenExpirationDate * 1000)) {
                this.logout();
            }
        }

        return userData;
    }

    /**
     * Attempts to log the user into the app using the given credentials
     *
     * @param user User credentials
     */
    login(user: User): Observable<User> {
        if (!user.username || user.username === '' ||
            !user.password || user.password === '') {

            return of(null);
        }

        const authBody = {
            username: user.username,
            password: user.password
        };

        return this.http.post<User>(`${environment.api}/auth`, authBody).pipe(
            map(res => {
                if (res) {
                    const decodedData = jwtHelper.decodeToken(res.token);
                    const authUser = User.fromJson(res);

                    const authSettings: AuthSettings = new AuthSettings(
                        authUser, res.token, decodedData.created, decodedData.exp
                    );

                    set(USER_SETTINGS_KEY, authSettings).finally();
                    this.userSub.next(authSettings);

                    if (authUser.customer) {
                        this.selectedCustomerService.set(authUser.customer.id);
                    }

                    return authUser;
                }

                throw new TypeError('Server returned null');
            })
        );
    }

    /**
     * Attempts to log the user into the app using the given credentials
     *
     * @param user User credentials
     */
    loginQR(qrCode: String): Observable<User> {
        if (!qrCode || qrCode === '' ||
            qrCode.length < 100) {

            return of(null);
        }

        const authBody = {
            qrCode
        };

        return this.http.post<User>(`${environment.api}/auth/qr-code`, authBody).pipe(
            map(res => {
                if (res) {
                    const decodedData = jwtHelper.decodeToken(res.token);
                    const authUser = User.fromJson(res);

                    const authSettings: AuthSettings = new AuthSettings(
                        authUser, res.token, decodedData.created, decodedData.exp
                    );

                    set(USER_SETTINGS_KEY, authSettings).finally();
                    this.userSub.next(authSettings);

                    if (authUser.customer) {
                        this.selectedCustomerService.set(authUser.customer.id);
                    }

                    return authUser;
                }

                throw new TypeError('Server returned null');
            })
        );
    }


    /**
     * Register a user with the data provided
     *
     * @param user User credentials
     */
    saveUser(user: User): Observable<User> {
        if (!user.username || user.username === '' ||
            !user.password || user.password === '' ||
            !user.confirmUsername || user.confirmUsername === '' ||
            !user.confirmPassword || user.confirmPassword === '' ||
            !user.acceptTerm) {

            return of(null);
        }

        const authBody = {
            username: user.username,
            password: user.password,
            acceptTerm: user.acceptTerm
        };

        return this.http.post<User>(`${environment.api}/protected/user/save`, authBody).pipe(
            map(res => {
                if (res) {
                    this.alertCtrl.create({
                        header: 'ok', message: "cadastrado", buttons: ['OK']
                    });
                }

                throw new TypeError('Server returned null');
            })
        );
    }

    /**
     * Logs out and redirects the user to the initial page
     */
    logout() {
        remove(USER_SETTINGS_KEY).then(async () => {
            this.userSub.next(null);
            await this.navCtrl.navigateRoot('/');
        });
    }

    /**
     * Loads stored data
     */
    async loadStoredToken() {
        get(USER_SETTINGS_KEY).then(storedUserData => {
            if (storedUserData) {
                const authSettings = AuthSettings.fromJson(storedUserData);

                if (authSettings) {
                    // Checking if token is expired
                    if (moment().valueOf() >= (authSettings.tokenExpirationDate * 1000)) {
                        return null;
                    }

                    this.userSub.next(authSettings);
                }
            }
        });
    }
}
