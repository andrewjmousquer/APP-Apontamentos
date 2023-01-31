import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { AuthGuard } from "src/app/shared/guards/auth/auth.guard";

import { TabsPage } from "./tabs.page";

const routes: Routes = [
  {
    path: "",
    component: TabsPage,
    children: [
      {
        path: "home",
        loadChildren: () =>
          import("../../pages/home/home.module").then((m) => m.HomePageModule),
        canActivate: [AuthGuard],
      },
      {
        path: "settings",
        loadChildren: () =>
          import("../../pages/settings/settings.module").then(
            (m) => m.SettingsPageModule
          ),
        canActivate: [AuthGuard],
      },
      {
        path: "service-order",
        loadChildren: () =>
          import("../../pages/service-order/service-order.module").then(
            (m) => m.ServiceOrderPageModule
          ),
        canActivate: [AuthGuard],
      },
      {
        path: "",
        redirectTo: "/tabs/home",
        pathMatch: "full",
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TabsPageRoutingModule { }
