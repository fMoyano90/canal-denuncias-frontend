import { BrowserModule } from '@angular/platform-browser';
import { LOCALE_ID, NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

// Configuración para Chile

import { registerLocaleData } from '@angular/common';
import localeEsCl from '@angular/common/locales/es-CL';
registerLocaleData(localeEsCl, 'es-Cl');

// RUTAS
import { APP_ROUTING } from './app.routes';

// PDF VIEWER

import { AppComponent } from './app.component';
import { InicioComponent } from './components/inicio/inicio.component';

import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { NavbarComponent } from './components/shared/navbar/navbar.component';
import { FooterComponent } from './components/shared/footer/footer.component';
import { EmpresaComponent } from './components/empresa/empresa.component';
import { TransporteComponent } from './components/transporte/transporte.component';
import { LogisticaComponent } from './components/logistica/logistica.component';
import { AlmacenamientoComponent } from './components/almacenamiento/almacenamiento.component';
import { SustentabilidadComponent } from './components/sustentabilidad/sustentabilidad.component';
import { NoticiasComponent } from './components/noticias/noticias.component';
import { GaleriaComponent } from './components/galeria/galeria.component';
import { ContactoComponent } from './components/contacto/contacto.component';
import { DenunciasComponent } from './components/denuncias/denuncias.component';
import { UsuariosComponent } from './components/gestion/usuarios/usuarios.component';
import { GestionDenunciasComponent } from './components/gestion/gestion-denuncias/gestion-denuncias.component';
import { GestionContenidoComponent } from './components/gestion/gestion-contenido/gestion-contenido.component';
import { LoginComponent } from './components/gestion/login/login.component';
import { TrabajoComponent } from './components/trabajo/trabajo.component';

// Galerias de imagenes
import { NgxGalleryModule } from 'ngx-gallery';

// Editor de texto enriquecido
import { EditorModule } from '@tinymce/tinymce-angular';

// Subir archivos
import { AngularFileUploaderModule } from 'angular-file-uploader';

/* Custom Hammer configuration */
import { HammerGestureConfig, HAMMER_GESTURE_CONFIG } from '@angular/platform-browser';
import * as Hammer from 'hammerjs';

// Paginación
import { NgxPaginationModule } from 'ngx-pagination';

// Pipes
import { ImagenPipe } from './pipes/imagen.pipe';
import { FilePipe } from './pipes/file.pipe';
import { CategoriaPipe } from './pipes/categoria.pipe';

import { CrearNoticiaComponent } from './components/gestion/crear-noticia/crear-noticia.component';
import { TicketComponent } from './components/gestion/ticket/ticket.component';
import { RegisterComponent } from './components/gestion/register/register.component';
import { EditarNoticiaComponent } from './components/gestion/editar-noticia/editar-noticia.component';
import { NoticiaComponent } from './components/noticia/noticia.component';
import { HistorialDenunciasComponent } from './components/gestion/historial-denuncias/historial-denuncias.component';
import { DenunciasPendientesComponent } from './components/gestion/denuncias-pendientes/denuncias-pendientes.component';
import { CategoriaDenunciaComponent } from './components/gestion/categoria-denuncia/categoria-denuncia.component';
import { DetalleDenunciaComponent } from './components/gestion/detalle-denuncia/detalle-denuncia.component';

export class CustomHammerConfig extends HammerGestureConfig {
	overrides = {
		pan: {
			direction: Hammer.DIRECTION_ALL
		}
	};
}
/* End Custom hammer configuration */

@NgModule({
	declarations: [
		AppComponent,
		InicioComponent,
		NavbarComponent,
		FooterComponent,
		EmpresaComponent,
		TransporteComponent,
		LogisticaComponent,
		AlmacenamientoComponent,
		SustentabilidadComponent,
		NoticiasComponent,
		GaleriaComponent,
		ContactoComponent,
		DenunciasComponent,
		UsuariosComponent,
		GestionDenunciasComponent,
		GestionContenidoComponent,
		LoginComponent,
		TrabajoComponent,
		CrearNoticiaComponent,
		TicketComponent,
		RegisterComponent,
		ImagenPipe,
		FilePipe,
		CategoriaPipe,
		EditarNoticiaComponent,
		NoticiaComponent,
		HistorialDenunciasComponent,
		DenunciasPendientesComponent,
		CategoriaDenunciaComponent,
		DetalleDenunciaComponent
	],
	imports: [
		BrowserModule,
		APP_ROUTING,
		FormsModule,
		HttpClientModule,
		NgxGalleryModule,
		EditorModule,
		AngularFileUploaderModule,
		NgxPaginationModule
	],
	providers: [
		{ provide: LOCALE_ID, useValue: 'es-Cl' },
		{ provide: HAMMER_GESTURE_CONFIG, useClass: CustomHammerConfig }
	],
	bootstrap: [ AppComponent ]
})
export class AppModule {}
