import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { HomeComponent } from './components/home/home.component';
import { NavTabComponent } from './components/nav-tab/nav-tab.component';
import { LibrosComponent } from './components/libros/libros.component';
import { IdiomasComponent } from './components/idiomas/idiomas.component';
import { UsuariosComponent } from './components/usuarios/usuarios.component';
import { EditorialesComponent } from './components/editoriales/editoriales.component';
import { CategoriasComponent } from './components/categorias/categorias.component';
import { AutoresComponent } from './components/autores/autores.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ReadAutoresComponent } from './components/autores/read-autores/read-autores.component';


@NgModule({
  declarations: [
    AppComponent,
    PageNotFoundComponent,
    HomeComponent,
    NavTabComponent,
    LibrosComponent,
    IdiomasComponent,
    UsuariosComponent,
    EditorialesComponent,
    CategoriasComponent,
    AutoresComponent,
    ReadAutoresComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
