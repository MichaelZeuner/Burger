import { Component, OnInit } from '@angular/core';
import { WebcamImage, WebcamInitError } from 'ngx-webcam';

@Component({
  selector: 'app-data-entry',
  templateUrl: './data-entry.component.html',
  styleUrls: ['./data-entry.component.scss']
})
export class DataEntryComponent implements OnInit {

  // latest snapshot
  public webcamImage: WebcamImage = null;

  constructor() { }

  ngOnInit() {
  }

  handleImage(webcamImage: WebcamImage) {
    this.webcamImage = webcamImage;
  }

  public handleInitError(error: WebcamInitError): void {
    if (error.mediaStreamError && error.mediaStreamError.name === "NotAllowedError") {
      console.warn("Camera access was not allowed by user!");
      //this.dialog.openAlertDialog("Dude you really need to allow camera access to take burger pics. We'll live though...");
    }
  }

  onRatingChange(event) {
    console.log(event);
  }

  submit() {

  }

}
