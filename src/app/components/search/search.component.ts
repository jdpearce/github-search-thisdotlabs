import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
    selector: 'tdl-search',
    templateUrl: './search.component.html',
    styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {
    form: FormGroup;

    constructor(private router: Router) {}

    ngOnInit() {
        this.form = new FormGroup({
            q: new FormControl(null, { validators: [Validators.required] })
        });
    }

    search() {
        if (this.form.valid) {
            const query = this.form.get('q').value;
            this.router.navigate(['/search-page'], { queryParams: { q: query } });
        }
    }
}
