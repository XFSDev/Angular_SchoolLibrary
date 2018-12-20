import { Injectable } from "@angular/core";
import { Actions } from "@ngrx/effects";

@Injectable()
export class AdministrationEffects {
    constructor(private _actions$: Actions) { }
}
