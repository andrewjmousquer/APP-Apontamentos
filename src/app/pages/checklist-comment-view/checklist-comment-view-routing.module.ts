import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";

import { ChecklistCommentViewPage } from './checklist-comment-view.page';

const routes: Routes = [
    {
        path: "",
        component: ChecklistCommentViewPage,
    },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class CklCommentPageViewRoutingModule { }
