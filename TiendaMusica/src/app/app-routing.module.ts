import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AgregarLibIdComponent } from './components/agregar-lib-id/agregar-lib-id.component';
import { AutoresComponent } from './components/autores/autores.component';
import { UpdateAutoresComponent } from './components/autores/update-autores/update-autores.component';
import { CategoriasComponent } from './components/categorias/categorias.component';
import { EditorialesComponent } from './components/editoriales/editoriales.component';
import { UpdateEditorialComponent } from './components/editoriales/update-editorial/update-editorial.component';
import { EntrarComponent } from './components/entrar/entrar.component';
import { HomeComponent } from './components/home/home.component';
import { IdiomasComponent } from './components/idiomas/idiomas.component';
import { UpdateIdiomaComponent } from './components/idiomas/update-idioma/update-idioma.component';
import { LibroIdiomasComponent } from './components/libro-idiomas/libro-idiomas.component';
import { LibrosComponent } from './components/libros/libros.component';
import { UpdateLibroComponent } from './components/libros/update-libro/update-libro.component';
import { MobileCodeComponent } from './components/mobile-code/mobile-code.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { RegistrarComponent } from './components/registrar/registrar.component';
import { RolComponent } from './components/rol/rol.component';
import { SalirComponent } from './components/salir/salir.component';
import { UpdateCategoriaComponent } from './components/update-categoria/update-categoria.component';
import { UsuariosComponent } from './components/usuarios/usuarios.component';
import { UserGuardGuard } from './guards/user-guard.guard';

const routes: Routes = [
  {path:"",redirectTo:"Home", pathMatch:"full"},
  {path:"Home",component:HomeComponent, title:"Home"},
  {path:"Libros",component:LibrosComponent, title:"Libros"},
  {path:"Libros/actualizar",component:UpdateLibroComponent,title:"Actualizar Libro" },
  {path:"LibrosIdiomas/:id",component:LibroIdiomasComponent, title:"Libros"},
  {path:"LibrosIdiomas/:id/agregar/:id",component:AgregarLibIdComponent, title:"Libros"},
  {path:"Categorias",component:CategoriasComponent, title:"Categorias"},
  {path:"Categorias/actualizar",component:UpdateCategoriaComponent,title:"Actualizar Categoria" },
  {path:"Editoriales",component:EditorialesComponent, title:"Editoriales"},
  {path:"Editoriales/actualizar",component:UpdateEditorialComponent,title:"Actualizar Editorial" },
  {path:"Idiomas",component:IdiomasComponent, title:"Idiomas"},
  {path:'Idiomas/actualizar',component:UpdateIdiomaComponent, title:'Actualizar Idioma'},
  {path:"Autores",component:AutoresComponent, title:"Autores"},
  {path:'Autores/actualizar',component:UpdateAutoresComponent, title:'Actualizar Autor'},
  {path:"Usuarios",component:UsuariosComponent, title:"Usuarios",canActivate:[UserGuardGuard]},
  {path:"Entrar", component:EntrarComponent, title:"Entrar"},
  {path:"Registrar", component:RegistrarComponent, title:"Registrar"},
  {path:"Roles/:id", component:RolComponent, title:"Cambiar Rol"},
  {path:"Salir", component:SalirComponent, title:"Salir",canActivate:[UserGuardGuard]},
  {path:"Mobile-Code", component:MobileCodeComponent, title:"Mobile-Code"},
  {path:"**", component:PageNotFoundComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
