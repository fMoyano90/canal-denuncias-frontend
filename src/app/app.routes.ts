import { RouterModule, Routes } from "@angular/router";
import { InicioComponent } from "./components/inicio/inicio.component";
import { GaleriaComponent } from "./components/galeria/galeria.component";
import { EmpresaComponent } from "./components/empresa/empresa.component";
import { TransporteComponent } from "./components/transporte/transporte.component";

const APP_ROUTES: Routes = [
  { path: "inicio", component: InicioComponent },
  { path: "nosotros", component: EmpresaComponent },
  { path: "transporte", component: TransporteComponent },
  { path: "galeria", component: GaleriaComponent },
  { path: "**", pathMatch: "full", redirectTo: "/inicio" }
];

export const APP_ROUTING = RouterModule.forRoot(APP_ROUTES, {
  scrollPositionRestoration: "enabled",
  useHash: true
});
