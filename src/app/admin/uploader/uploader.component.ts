import { Component, EventEmitter, Inject, Input, OnInit, ViewChild } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { humanizeBytes, UploaderOptions, UploadFile, UploadInput, UploadOutput, UploadStatus } from 'ngx-uploader';
import { forkJoin } from 'rxjs';
import { environment } from 'src/environments/environment';
import {UploadService} from "../upload.service";

@Component({
  selector: 'app-uploader',
  templateUrl: './uploader.component.html',
  styleUrls: ['./uploader.component.scss']
})
export class UploaderComponent implements OnInit {
  @ViewChild('file', { static: false }) file;

  public files: Set<File> = new Set();

  progress;
  canBeClosed = true;
  primaryButtonText = 'Upload';
  showCancelButton = true;
  uploading = false;
  uploadSuccessful = false;


  constructor(
    public dialogRef: MatDialogRef<UploaderComponent>,
    private uploaderService:UploadService,
    @Inject(MAT_DIALOG_DATA) public data: {id: string}) {

     }


  ngOnInit() {
  }

  addFile() {
    this.file.nativeElement.click();
  }

  onFileAdded() {
    const files: { [key: string]: File } = this.file.nativeElement.files;
    for (let key in files) {
      if (!isNaN(parseInt(key))) {
        this.files.add(files[key]);
      }
    }
  }

  closeDialog() {
    // if everything was uploaded already, just close the dialog
    if (this.uploadSuccessful) {
      return this.dialogRef.close();
    }

    // set the component state to "uploading"
    this.uploading = true;

    // start the upload and save the progress map
    console.log('from uploader component',this.data.id);
    this.progress = this.uploaderService.uploadPicture(this.data.id, this.files);

    // convert the progress map into an array
    let allProgressObservables = [];
    for (let key in this.progress) {
      allProgressObservables.push(this.progress[key].progress);
    }

    // Adjust the state variables

    // The OK-button should have the text "Finish" now
    this.primaryButtonText = 'Finish';

    // The dialog should not be closed while uploading
    this.canBeClosed = false;
    this.dialogRef.disableClose = true;

    // Hide the cancel-button
    this.showCancelButton = false;

    // When all progress-observables are completed...
    forkJoin(allProgressObservables).subscribe(end => {
      // ... the dialog can be closed again...
      this.canBeClosed = true;
      this.dialogRef.disableClose = false;

      // ... the upload was successful...
      this.uploadSuccessful = true;

      // ... and the component is no longer uploading
      this.uploading = false;
    });
  }

  close() {
    this.dialogRef.close();
  }
}
