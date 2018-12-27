import { Component, OnInit } from '@angular/core';
import { IPublisher } from '../../../../shared/models/publisher.model';
import { ActivatedRoute, Router } from '@angular/router';
import { PublishersService } from '../../publishers.service';

@Component({
  selector: 'publisher-details',
  templateUrl: './publisher-details.component.html',
  styleUrls: ['./publisher-details.component.css']
})
export class PublisherDetailsComponent implements OnInit {
  public isEditMode = false;
  public publisher: IPublisher;

  constructor(private _route: ActivatedRoute, private _router: Router, private _publishersService: PublishersService) { }

  ngOnInit() {
    this._route.paramMap.subscribe(params => {
      const publisherID = +params.get('id');

      if (publisherID === 0) {
        this.publisher = <IPublisher> { publisherID: 0 };
        this.isEditMode = true;
      } else {
        this.loadPublisherData(publisherID);
      }
    });
  }

  public edit() {
    this.isEditMode = true;
  }

  public cancelEdit() {
    this.isEditMode = false;
  }

  public save(publisher: IPublisher) {
    this._publishersService.updatePublisher(publisher)
      .subscribe(() => {
        this._router.navigate(['/administration/publishers']);
      });
  }

  private loadPublisherData(publisherID: number) {
    this._publishersService.getPublisher(publisherID)
      .subscribe(publisher => {
        this.publisher = publisher;
      });
  }
}
