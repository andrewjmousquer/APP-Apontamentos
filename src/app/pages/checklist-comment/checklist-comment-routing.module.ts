import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";

import { ChecklisCommentPage } from './checklist-comment.page';

const routes: Routes = [
    {
        path: "",
        component: ChecklisCommentPage,
    },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class CklCommentPageRoutingModule { }
