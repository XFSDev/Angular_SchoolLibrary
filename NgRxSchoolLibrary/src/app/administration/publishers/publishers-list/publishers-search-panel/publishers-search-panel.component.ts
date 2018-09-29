import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { IPublisherSearchFilter } from '../publishers-search-filter.model';

@Component({
  selector: 'publishers-search-panel',
  templateUrl: './publishers-search-panel.component.html',
  styleUrls: ['./publishers-search-panel.component.css']
})
export class PublishersSearchPanelComponent implements OnInit {
  public publishersSearchPanelForm: FormGroup;
  
  @Output() filterPublishersList = new EventEmitter<IPublisherSearchFilter>();
  
  constructor(private _fb: FormBuilder) { 
    this.publishersSearchPanelForm = this._fb.group({
      name: '',
      address: '',
      additionalInformation: ''      
    });

    this.publishersSearchPanelForm.valueChanges.subscribe(value => this.filterPublishersList.emit(<IPublisherSearchFilter> value));
  }

  ngOnInit() {
  }
}
