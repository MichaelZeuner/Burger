import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { WebcamImage, WebcamInitError } from 'ngx-webcam';
import { PostService } from '../post.service';

@Component({
  selector: 'app-post-create',
  templateUrl: './post-create.component.html',
  styleUrls: ['./post-create.component.scss']
})
export class PostCreateComponent implements OnInit {

  // latest snapshot
  public webcamImage: WebcamImage = null;

  constructor(private postService: PostService) { }

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
    this.postService.addPost({
      id: null,
      name: 'a new name',
      content: 'some shit'
    })
  }

}
