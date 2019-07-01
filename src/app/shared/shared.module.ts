import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {
    MatButtonModule,
    MatCardModule,
    MatExpansionModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    MatListModule,
    MatOptionModule,
    MatProgressSpinnerModule,
    MatSelectModule,
    MatTableModule,
    MatToolbarModule
} from '@angular/material';
import { RouterModule } from '@angular/router';

@NgModule({
    imports: [
        RouterModule,
        FormsModule,
        ReactiveFormsModule,
        MatToolbarModule,
        MatIconModule,
        MatButtonModule,
        MatCardModule,
        MatListModule,
        MatProgressSpinnerModule,
        MatTableModule,
        MatInputModule,
        MatSelectModule,
        MatOptionModule,
        MatFormFieldModule,
        MatExpansionModule
    ],
    exports: [
        RouterModule,
        FormsModule,
        ReactiveFormsModule,
        MatToolbarModule,
        MatIconModule,
        MatButtonModule,
        MatCardModule,
        MatListModule,
        MatProgressSpinnerModule,
        MatTableModule,
        MatInputModule,
        MatSelectModule,
        MatOptionModule,
        MatFormFieldModule,
        MatExpansionModule
    ]
})
export class SharedModule {}
