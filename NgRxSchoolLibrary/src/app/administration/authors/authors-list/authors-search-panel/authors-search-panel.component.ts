import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { IAuthorSearchFilter } from '../authors-search-filter.model';

@Component({
  selector: 'authors-search-panel',
  templateUrl: './authors-search-panel.component.html',
  styleUrls: ['./authors-search-panel.component.css']
})
export class AuthorsSearchPanelComponent implements OnInit {

  public authorsSearchPanelForm: FormGroup;
  
  @Output() filterAuthorsList = new EventEmitter<IAuthorSearchFilter>();
  
  constructor(private _fb: FormBuilder) { 
    this.authorsSearchPanelForm = this._fb.group({
      fullName: '',
      additionalInformation: ''      
    });

    this.authorsSearchPanelForm.valueChanges.subscribe(value => this.filterAuthorsList.emit(<IAuthorSearchFilter> value));
  }

  ngOnInit() {
  }
}
