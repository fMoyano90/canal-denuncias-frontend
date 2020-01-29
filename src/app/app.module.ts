import { BrowserModule } from "@angular/platform-browser";
import { LOCALE_ID, NgModule } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { HttpClientModule } from "@angular/common/http";

// Configuración para Chile

import { registerLocaleData } from "@angular/common";
import localeEsCl from "@angular/common/locales/es-CL";
registerLocaleData(localeEsCl, "es-Cl");

// RUTAS
import { APP_ROUTING } from "./app.routes";

// PDF VIEWER

import { AppComponent } from "./app.component";
import { InicioComponent } from "./components/inicio/inicio.component";

import { platformBrowserDynamic } from "@angular/platform-browser-dynamic";
import { NavbarComponent } from "./components/shared/navbar/navbar.component";
import { FooterComponent } from "./components/shared/footer/footer.component";
import { EmpresaComponent } from "./components/empresa/empresa.component";
import { TransporteComponent } from "./components/transporte/transporte.component";
import { LogisticaComponent } from "./components/logistica/logistica.component";
import { AlmacenamientoComponent } from "./components/almacenamiento/almacenamiento.component";
import { SustentabilidadComponent } from "./components/sustentabilidad/sustentabilidad.component";
import { NoticiasComponent } from "./components/noticias/noticias.component";
import { GaleriaComponent } from "./components/galeria/galeria.component";
import { ContactoComponent } from "./components/contacto/contacto.component";
import { DenunciasComponent } from "./components/denuncias/denuncias.component";
import { UsuariosComponent } from "./components/gestion/usuarios/usuarios.component";
import { GestionNoticiasComponent } from "./components/gestion/gestion-noticias/gestion-noticias.component";
import { GestionDenunciasComponent } from "./components/gestion/gestion-denuncias/gestion-denuncias.component";
import { GestionContenidoComponent } from "./components/gestion/gestion-contenido/gestion-contenido.component";
import { LoginComponent } from "./components/gestion/login/login.component";
import { TrabajoComponent } from "./components/trabajo/trabajo.component";
import { NgxGalleryModule } from "ngx-gallery";

/* Custom Hammer configuration */
import {
  HammerGestureConfig,
  HAMMER_GESTURE_CONFIG
} from "@angular/platform-browser";
import * as Hammer from "hammerjs";
import { CrearUsuarioComponent } from './components/gestion/crear-usuario/crear-usuario.component';
import { CrearNoticiaComponent } from './components/gestion/crear-noticia/crear-noticia.component';
import { TicketComponent } from './components/gestion/ticket/ticket.component';

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
    GestionNoticiasComponent,
    GestionDenunciasComponent,
    GestionContenidoComponent,
    LoginComponent,
    TrabajoComponent,
    CrearUsuarioComponent,
    CrearNoticiaComponent,
    TicketComponent
  ],
  imports: [
    BrowserModule,
    APP_ROUTING,
    FormsModule,
    HttpClientModule,
    NgxGalleryModule
  ],
  providers: [
    { provide: LOCALE_ID, useValue: "es-Cl" },
    { provide: HAMMER_GESTURE_CONFIG, useClass: CustomHammerConfig }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
