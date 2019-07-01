import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { environment } from 'src/environments/environment';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { PaginationComponent } from './components/pagination/pagination.component';
import { SearchComponent } from './components/search/search.component';
import { UserListComponent } from './components/user-list/user-list.component';
import { SearchPageComponent } from './containers/search-page/search-page.component';
import { CoreModule } from './core/core.module';
import { SharedModule } from './shared/shared.module';
import { appReducers } from './store/app.reducers';
import { SearchEffects } from './store/search/search.effects';
import { UserCardComponent } from './components/user-card/user-card.component';

@NgModule({
    declarations: [AppComponent, HeaderComponent, SearchComponent, SearchPageComponent, PaginationComponent, UserListComponent, UserCardComponent],
    imports: [
        BrowserModule,
        BrowserAnimationsModule,
        AppRoutingModule,
        CoreModule,
        SharedModule,
        StoreModule.forRoot(appReducers),
        EffectsModule.forRoot([SearchEffects]),
        environment.imports
    ],
    providers: [],
    bootstrap: [AppComponent]
})
export class AppModule {}
