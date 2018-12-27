import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { IPublisher } from '../../../../../shared/models/publisher.model';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'publisher-edit-form',
  templateUrl: './publisher-edit-form.component.html',
  styleUrls: ['./publisher-edit-form.component.css']
})
export class PublisherEditFormComponent implements OnInit {
  @Input() publisher: IPublisher;
  @Output() savePublisher = new EventEmitter<IPublisher>();
  @Output() cancelEdit = new EventEmitter<void>();

  public publisherEditForm: FormGroup;

  constructor(private _router: Router, private _fb: FormBuilder) { }

  ngOnInit() {
    this.publisherEditForm = this._fb.group({
      publisherID: [this.publisher.publisherID],
      name: [this.publisher.name, [Validators.required, Validators.maxLength(50)]],
      address: [this.publisher.address, [Validators.required, Validators.maxLength(200)]],
      additionalInformation: [this.publisher.additionalInformation, Validators.maxLength(1000)]
    });
  }

  public redirectToPublishersList() {
    this._router.navigate(['/administration/publishers']);
  }

  public save() {
    for (const field in this.publisherEditForm.controls) {
      const control = this.publisherEditForm.get(field);
      control.markAsTouched( {onlySelf: true } );
    }

    if (this.publisherEditForm.valid) {
      this.savePublisher.emit(this.publisherEditForm.value);
    }
  }
}
