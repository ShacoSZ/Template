import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AutoresComponent } from './components/autores/autores.component';
import { ReadAutoresComponent } from './components/autores/read-autores/read-autores.component';
import { CategoriasComponent } from './components/categorias/categorias.component';
import { EditorialesComponent } from './components/editoriales/editoriales.component';
import { HomeComponent } from './components/home/home.component';
import { IdiomasComponent } from './components/idiomas/idiomas.component';
import { LibrosComponent } from './components/libros/libros.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { UsuariosComponent } from './components/usuarios/usuarios.component';

const routes: Routes = [
  {path:"",redirectTo:"Home", pathMatch:"full"},
  {path:"Home",component:HomeComponent, title:"Home"},
  {path:"Libros",component:LibrosComponent, title:"Libros"},
  {path:"Categorias",component:CategoriasComponent, title:"Categorias"},
  {path:"Editoriales",component:EditorialesComponent, title:"Editoriales"},
  {path:"Idiomas",component:IdiomasComponent, title:"Idiomas"},
  {path:"Autores",component:AutoresComponent, title:"Autores",children:[
    {path:"",component:ReadAutoresComponent}
  ]},
  {path:"Usuarios",component:UsuariosComponent, title:"Usuarios"},
  {path:"**", component:PageNotFoundComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
