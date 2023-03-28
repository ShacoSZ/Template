import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AgregarLibIdComponent } from './components/agregar-lib-id/agregar-lib-id.component';
import { AutoresComponent } from './components/autores/autores.component';
import { UpdateAutoresComponent } from './components/autores/update-autores/update-autores.component';
import { CategoriasComponent } from './components/categorias/categorias.component';
import { EntrarComponent } from './components/entrar/entrar.component';
import { HomeComponent } from './components/home/home.component';
import { IdiomasComponent } from './components/idiomas/idiomas.component';
import { UpdateIdiomaComponent } from './components/idiomas/update-idioma/update-idioma.component';
import { LibroIdiomasComponent } from './components/libro-idiomas/libro-idiomas.component';
import { MobileCodeComponent } from './components/mobile-code/mobile-code.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import {IdiomaGuestComponent} from './components/idioma-guest/idioma-guest.component'
import { RegistrarComponent } from './components/registrar/registrar.component';
import { RolComponent } from './components/rol/rol.component';
import { SalirComponent } from './components/salir/salir.component';
import { UpdateCategoriaComponent } from './components/update-categoria/update-categoria.component';
import { UsuariosComponent } from './components/usuarios/usuarios.component';
import { UpCrGuardGuard } from './guards/up-cr-guard.guard';
import { UserGuardGuard } from './guards/user-guard.guard';

const routes: Routes = [
  {path:"",redirectTo:"Home", pathMatch:"full"},
  {path:"Home",component:HomeComponent, title:"Home"},
  {path:"LibrosIdiomas/:id",component:LibroIdiomasComponent, title:"Libros",canActivate:[UserGuardGuard]},
  {path:"LibrosIdiomas/:id/agregar/:id",component:AgregarLibIdComponent, title:"Libros",canActivate:[UserGuardGuard,UpCrGuardGuard]},
  {path:"Categorias",component:CategoriasComponent, title:"Categorias",canActivate:[UserGuardGuard]},
  {path:"Categorias/actualizar",component:UpdateCategoriaComponent,title:"Actualizar Categoria",canActivate:[UserGuardGuard,UpCrGuardGuard]},
  {path:"Idiomas",component:IdiomasComponent, title:"Idiomas", children:[
    {path:'actualizar',component:UpdateIdiomaComponent, title:'Actualizar Idioma'},
    {path:'',component:UpdateIdiomaComponent, title:'Actualizar Idioma'},
  ]},
  {path:"idiomas",component:IdiomaGuestComponent, title:"idiomas",canActivate:[UserGuardGuard]},
  {path:"Autores",component:AutoresComponent, title:"Autores",canActivate:[UserGuardGuard]},
  {path:'Autores/actualizar',component:UpdateAutoresComponent, title:'Actualizar Autor',canActivate:[UserGuardGuard,UpCrGuardGuard]},
  {path:"Usuarios",component:UsuariosComponent, title:"Usuarios",canActivate:[UserGuardGuard]},
  {path:"Entrar", component:EntrarComponent, title:"Entrar"},
  {path:"Registrar", component:RegistrarComponent, title:"Registrar"},
  {path:"Roles/:id", component:RolComponent, title:"Cambiar Rol",canActivate:[UserGuardGuard]},
  {path:"Salir", component:SalirComponent, title:"Salir",canActivate:[UserGuardGuard]},
  {path:"Mobile-Code", component:MobileCodeComponent, title:"Mobile-Code"},
  {path:"**", component:PageNotFoundComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
