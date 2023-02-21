import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { LibrosService } from 'src/app/Services/libros.service';
import { libro } from 'src/app/libro';
import { libros } from 'src/app/interfaces/libros.interface';
import { Router } from '@angular/router';
import { Editoriales } from 'src/app/interfaces/editoriales';
import { Categoria } from 'src/app/interfaces/categoria';
import { Autor } from 'src/app/interfaces/autores.interface';
import { AutoresService } from 'src/app/Services/autores.service';
import { CategoriaService } from 'src/app/Services/categoria.service';
import { EditorialesService } from 'src/app/Services/editoriales.service';

@Component({
  selector: 'app-update-libro',
  templateUrl: './update-libro.component.html',
  styleUrls: ['./update-libro.component.css']
})
export class UpdateLibroComponent implements OnInit{
  libros?:libros[];
  libro?:libros;
  categorias?:Categoria[];
  categoria?:Categoria;
  editoriales?:Editoriales[];
  editorial?:Editoriales;
  autores?:Autor[];
  autor?: Autor;

  constructor(
    public libroService:LibrosService,
    public editorialesService:EditorialesService,
    public autorService:AutoresService,
    public categoriaService:CategoriaService,
    private router:Router
  ){}

  ngOnInit(){  
    this.getAutores();
    this.getCategorias();
    this.getEditoriales();
  }

  submitForm(libroForm:NgForm){
    if(libroForm.value.id==null){
      this.libroService.createLibro(libroForm.value)
      .subscribe((response)=>{
        this.router.navigate(["Libros"]);
      });
    }else{
      this.libroService.updateLibro(libroForm.value.id,libroForm.value)
      .subscribe((response)=>{
        this.router.navigate(["Libros"]);
      }
      );
    }
  }

  getAutores(){
    this.autorService.getAutores().subscribe((autores) => {this.autores = autores;})
  }
  getCategorias(){
    this.categoriaService.getCategorias().subscribe((categorias) => {this.categorias = categorias;})
  }
  getEditoriales(){
    this.editorialesService.getEditoriales().subscribe((editoriales) => {this.editoriales = editoriales;})
  }
  regresar(autorForm:NgForm){
    this.resetForm(autorForm);
    this.router.navigate(['Libros']);
  }

  resetForm(autorForm:NgForm){
    if(autorForm!=null){
      autorForm.reset();
      this.libroService.selectLibro=new libro();
    }
  }

  convertirAEntero(algo: string): number {
    return parseInt(algo);
  }

}
