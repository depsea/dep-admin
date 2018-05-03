import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { App, DashboardPage, LoginPage } from './pages';

@NgModule({
	imports: [
		BrowserModule,
	],
	declarations: [
		DashboardPage,
		LoginPage,
	],
	bootstrap: [App],
})
export class AppModule { }
