import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot } from '@angular/router';
import { NavController } from '@ionic/angular';

import { Observable } from 'rxjs';
import { map, take } from 'rxjs/operators';
import { Menu } from '../../models/menu.model';

import { AuthService } from '../../services/auth.service';
import { ToastrService } from '../../services/toastr-service';

@Injectable({
    providedIn: 'root'
})
export class AuthGuard implements CanActivate {

    constructor(private authService: AuthService, private navCtrl: NavController, private alertControl: ToastrService) {
    }

    private byPassUrl = [
        "home",
        "tabs",
        "settings"
    ];

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | boolean {

        const currentUser = this.authService.getUser();
        if (currentUser) {
            if (currentUser.token) {
                if (currentUser.token != '') {
                    let filteredByPassURL = this.byPassUrl.filter(bUrl => { return bUrl == route.routeConfig.path })[0];
                    if (filteredByPassURL) {
                        return true;
                    }

                    let permittedRoute = currentUser.user.accessList.menus != null && currentUser.user.accessList.menus != undefined ? currentUser.user.accessList.menus.filter(menu => { if (menu.type.value.includes("APP_")) return this.filterMenu(menu, route.routeConfig.path) })[0] : undefined;
                    if (permittedRoute) {
                        return true;
                    } else {
                        this.alertControl.showMessage("O Usuário não tem permissão para acessar o esta pagina! code.error.403", "danger", "top")
                        this.navCtrl.navigateRoot('/tabs/home').finally();
                        return false;
                    }
                }
            }
        }


        return this.authService.user.pipe(
            take(1),
            map(user => {
                if (!user) {
                    this.navCtrl.navigateRoot('/').finally();
                    return false;
                }

                return true;
            })
        );
    }

    private filterMenu(menu: Menu, url) {

        if (menu.submenus && menu.submenus.length > 0) {
            menu.submenus.forEach(submenu => {
                this.filterMenu(submenu, url);
            });
        } else {
            return menu.route.startsWith(url);
        }
    }

}
