import { CommonModule } from '@angular/common';
import { NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";

import { IonicModule } from "@ionic/angular";

import { ChecklistCommentViewModule } from '../checklist-comment-view/checklist-comment-view.module';


import { CklCommentPageRoutingModule } from './checklist-comment-routing.module';

import { ChecklisCommentPage } from './checklist-comment.page';

@NgModule({
    imports: [
        CommonModule, 
        FormsModule, 
        IonicModule, 
        CklCommentPageRoutingModule, 
        ReactiveFormsModule, 
        ChecklistCommentViewModule
        ],
    declarations: [ChecklisCommentPage],
})
export class ChecklistCommentModule { }
