import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IDefinition } from 'app/shared/model/definition.model';

@Component({
    selector: 'jhi-definition-detail',
    templateUrl: './definition-detail.component.html'
})
export class DefinitionDetailComponent implements OnInit {
    definition: IDefinition;

    constructor(private activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ definition }) => {
            this.definition = definition;
        });
    }

    previousState() {
        window.history.back();
    }
}
