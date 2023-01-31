import { Component, OnInit } from "@angular/core";
import { ModalController, NavParams, ToastController } from "@ionic/angular";


@Component({
  selector: "app-moviments-modal",
  templateUrl: "./moviments-modal.page.html",
  styleUrls: ["./moviments-modal.page.scss"],
})
export class MovimentsModalPage implements OnInit {
  isLoading = false;
  moviments: MovimentsModalPage[];

  constructor(
    private navParams: NavParams,
    private modalControler: ModalController,
  ) { }

  ngOnInit() {
    this.navParams.get('moviments');
  }

  moveAndFinish(movimentId: number) {
    this.modalControler.dismiss(movimentId);
  }

  closeModal() {
    this.modalControler.dismiss();
  }
}
