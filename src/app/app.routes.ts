import { RouterModule, Routes } from "@angular/router";
import { InicioComponent } from "./components/inicio/inicio.component";
import { GaleriaComponent } from "./components/galeria/galeria.component";
import { EmpresaComponent } from "./components/empresa/empresa.component";
import { TransporteComponent } from "./components/transporte/transporte.component";
import { LogisticaComponent } from "./components/logistica/logistica.component";
import { AlmacenamientoComponent } from "./components/almacenamiento/almacenamiento.component";
import { SustentabilidadComponent } from "./components/sustentabilidad/sustentabilidad.component";
import { NoticiasComponent } from "./components/noticias/noticias.component";
import { ContactoComponent } from "./components/contacto/contacto.component";
import { DenunciasComponent } from "./components/denuncias/denuncias.component";
import { UsuariosComponent } from "./components/gestion/usuarios/usuarios.component";
import { GestionDenunciasComponent } from "./components/gestion/gestion-denuncias/gestion-denuncias.component";
import { GestionNoticiasComponent } from "./components/gestion/gestion-noticias/gestion-noticias.component";
import { GestionContenidoComponent } from "./components/gestion/gestion-contenido/gestion-contenido.component";
import { LoginComponent } from "./components/gestion/login/login.component";
import { TrabajoComponent } from "./components/trabajo/trabajo.component";

const APP_ROUTES: Routes = [
  // Paginas publicas
  { path: "inicio", component: InicioComponent },
  { path: "nosotros", component: EmpresaComponent },
  { path: "transporte", component: TransporteComponent },
  { path: "logistica", component: LogisticaComponent },
  { path: "almacenamiento", component: AlmacenamientoComponent },
  { path: "sustentabilidad", component: SustentabilidadComponent },
  { path: "noticias", component: NoticiasComponent },
  { path: "galeria", component: GaleriaComponent },
  { path: "contacto", component: ContactoComponent },
  { path: "denuncias", component: DenunciasComponent },
  { path: "trabaja-con-nosotros", component: TrabajoComponent },
  // Gestión de contenidos
  { path: "gestion-usuarios", component: UsuariosComponent },
  { path: "gestion-denuncias", component: GestionDenunciasComponent },
  { path: "gestion-noticias", component: GestionNoticiasComponent },
  { path: "gestion-contenido", component: GestionContenidoComponent },
  { path: "login", component: LoginComponent },
  // Default
  { path: "**", pathMatch: "full", redirectTo: "/inicio" }
];

export const APP_ROUTING = RouterModule.forRoot(APP_ROUTES, {
  scrollPositionRestoration: "enabled",
  useHash: true
});
