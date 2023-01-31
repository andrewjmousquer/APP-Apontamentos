import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";

import { IonicModule } from "@ionic/angular";

import { ChecklistPageRoutingModule } from "./checklist-routing.module";

import { ChecklistPage } from "./checklist.page";
import { ChecklistCommentModule } from "../checklist-comment/checklist-comment.module";

@NgModule({
  imports: [
    CommonModule, 
    FormsModule, 
    IonicModule, 
    ChecklistPageRoutingModule, 
    ReactiveFormsModule,
    ChecklistCommentModule
    
  ],
  declarations: [ChecklistPage],
})
export class ChecklistModule { }
