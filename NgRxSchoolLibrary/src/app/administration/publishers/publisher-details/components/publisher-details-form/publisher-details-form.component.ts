import { Component, OnInit, Output, Input, EventEmitter } from '@angular/core';
import { IPublisher } from '../../../../../shared/models/publisher.model';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-publisher-details-form',
  templateUrl: './publisher-details-form.component.html',
  styleUrls: ['./publisher-details-form.component.css']
})
export class PublisherDetailsFormComponent implements OnInit {
  @Input() publisher: IPublisher;

  @Output() edit = new EventEmitter<void>();
  @Output() redirectToPublishersList = new EventEmitter<void>();

  public publisherDetailsForm: FormGroup;

  constructor() { }

  public ngOnInit(): void {
    this.publisherDetailsForm = new FormGroup({});
  }
}
