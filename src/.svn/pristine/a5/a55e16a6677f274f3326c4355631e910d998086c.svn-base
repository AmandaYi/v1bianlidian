import { NgModule } from '@angular/core';
import { IonicModule } from 'ionic-angular';
import { MyApp } from '../../app/app.component';
import { DiscoveryPage } from './discovery';
import { ThemeStreet } from './theme-street/theme-street';
import { RecommendToday } from "./recommend-today/recommend-today";

@NgModule({
    declarations: [DiscoveryPage, ThemeStreet, RecommendToday],
    imports: [IonicModule.forRoot(MyApp, { backButtonText: '', tabsHideOnSubPages: true, mode: 'ios' })],
    entryComponents: [DiscoveryPage, ThemeStreet, RecommendToday],
    exports: [IonicModule]
})
export class DiscoveryModule { }