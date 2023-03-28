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
import { UpdateAutoresComponent } from './components/autores/update-autores/update-autores.component';
import { UpdateIdiomaComponent } from './components/idiomas/update-idioma/update-idioma.component';
import { UpdateLibroComponent } from './components/libros/update-libro/update-libro.component';
import { UpdateEditorialComponent } from './components/editoriales/update-editorial/update-editorial.component';
import { UpdateCategoriaComponent } from './components/update-categoria/update-categoria.component';
import { LibroIdiomasComponent } from './components/libro-idiomas/libro-idiomas.component';
import { AgregarLibIdComponent } from './components/agregar-lib-id/agregar-lib-id.component';
import { EntrarComponent } from './components/entrar/entrar.component';
import { MobileCodeComponent } from './components/mobile-code/mobile-code.component';
import { RegistrarComponent } from './components/registrar/registrar.component';
import { SalirComponent } from './components/salir/salir.component';
import { BearerHeaderInterceptor } from './interceptors/bearer-header.interceptor';
import { RolComponent } from './components/rol/rol.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { IdiomaGuestComponent } from './components/idioma-guest/idioma-guest.component';


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
    UpdateAutoresComponent,
    UpdateIdiomaComponent,
    UpdateLibroComponent,
    UpdateEditorialComponent,
    UpdateCategoriaComponent,
    LibroIdiomasComponent,
    AgregarLibIdComponent,
    EntrarComponent,
    MobileCodeComponent,
    RegistrarComponent,
    SalirComponent,
    RolComponent,
    IdiomaGuestComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule
  ],
  providers: [{
    provide: HTTP_INTERCEPTORS,
      useClass: BearerHeaderInterceptor,
      multi: true
  }],
  bootstrap: [AppComponent]
})
export class AppModule { }