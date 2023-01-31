import { ModalController } from '@ionic/angular';
import { Component, OnInit } from '@angular/core';

import { CheckListAnswerService } from './../../shared/services/checklist-answer.service';

import { CheckListAnswerModel } from './../../shared/models/checklist-answer.model';
@Component({
    selector: "app-checklist-comment-view",
    templateUrl: "./checklist-comment-view.page.html",
    styleUrls: ["./checklist-comment-view.page.scss"],
})
export class ChecklistCommentViewPage implements OnInit {
    isLoading: boolean;
    segment = "comments";
    answerId: number;
    answer: CheckListAnswerModel;

    constructor(private modalController: ModalController,
        private cklAnswerService: CheckListAnswerService) { }

    ngOnInit() {
        this.cklAnswerService.getById(this.answerId).subscribe(data => {
            this.answer = data;
        })
    }

    segmentChanged(event) {
        this.segment = event.detail.value;
    }

    closeModal() {
        this.modalController.dismiss();
    }
}