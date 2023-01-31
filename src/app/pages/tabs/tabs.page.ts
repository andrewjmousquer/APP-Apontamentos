import { Component, OnInit } from '@angular/core';
import { Menu } from 'src/app/shared/models/menu.model';
import { AuthService } from 'src/app/shared/services/auth.service';

@Component({
  selector: 'app-tabs',
  templateUrl: './tabs.page.html',
  styleUrls: ['./tabs.page.scss'],
})
export class TabsPage implements OnInit {

  listMenus: Menu[] = [];

  constructor(private authService: AuthService) { }

  ngOnInit() {
    const loggedInUser = this.authService.getUser();
    if (loggedInUser.user.accessList != null && loggedInUser.user.accessList.menus != null)
      loggedInUser.user.accessList.menus.forEach(menu => {
        if (menu.type.value.includes("APP_HOME"))
          this.listMenus.push(menu)
      });
    this.listMenus.sort((a, b) => a.mnuOrder - b.mnuOrder);
  }

}
