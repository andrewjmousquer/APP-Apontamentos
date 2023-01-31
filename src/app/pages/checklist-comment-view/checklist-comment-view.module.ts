import { CommonModule } from '@angular/common';
import { NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";

import { IonicModule } from "@ionic/angular";

import { CklCommentPageViewRoutingModule } from './checklist-comment-view-routing.module';

import { ChecklistCommentViewPage } from './checklist-comment-view.page';

@NgModule({
    imports: [CommonModule, 
        FormsModule, 
        IonicModule, 
        CklCommentPageViewRoutingModule, 
        ReactiveFormsModule
    ],
    declarations: [ChecklistCommentViewPage],
})
export class ChecklistCommentViewModule { }
