import { Component, OnInit, OnDestroy } from '@angular/core';
import { IPublisher } from '../../../../shared/models/publisher.model';
import { Observable } from 'rxjs';
import { PublishersFacade } from '../../state/publishers.facade';

@Component({
  selector: 'publisher-details',
  templateUrl: './publisher-details.component.html',
  styleUrls: ['./publisher-details.component.css']
})
export class PublisherDetailsComponent implements OnInit, OnDestroy {
  public isEditMode$: Observable<boolean>;
  public publisher$: Observable<IPublisher>;

  constructor(private _publishersFacade: PublishersFacade) { }

  public ngOnInit(): void {
    this._publishersFacade.loadPublisher();

    this.publisher$ = this._publishersFacade.getPublisher();
    this.isEditMode$ = this._publishersFacade.getIsEditMode();
  }

  public ngOnDestroy(): void {
    this._publishersFacade.clearPublisher();
  }

  public edit() {
    this._publishersFacade.setIsEditMode(true);
  }

  public cancelEdit() {
    this._publishersFacade.setIsEditMode(false);
  }

  public save(Publisher: IPublisher) {
    this._publishersFacade.save(Publisher);
  }
}
