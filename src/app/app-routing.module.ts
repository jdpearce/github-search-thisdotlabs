import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SearchComponent } from './components/search/search.component';
import { SearchPageComponent } from './containers/search-page/search-page.component';

const routes: Routes = [
    {
        path: 'search',
        component: SearchComponent
    },
    {
        path: 'search-page',
        component: SearchPageComponent
    },
    {
        path: '',
        redirectTo: 'search',
        pathMatch: 'full'
    }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule {}
