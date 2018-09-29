import { Component, OnInit, Output, Input, EventEmitter } from '@angular/core';
import { IPublisher } from '../../publisher.model';
import { FormGroup } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'publisher-details-form',
  templateUrl: './publisher-details-form.component.html',
  styleUrls: ['./publisher-details-form.component.css']
})
export class PublisherDetailsFormComponent implements OnInit {

  @Input() publisher: IPublisher; 

  @Output() edit = new EventEmitter<void>();

  public publisherDetailsForm: FormGroup;

  constructor(private _router: Router) { }

  ngOnInit() {
    this.publisherDetailsForm = new FormGroup({});
  }

  public redirectToPublishersList() {
    this._router.navigate(['/administration/publishers']);
  }
}
