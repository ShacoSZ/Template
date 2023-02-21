import { Component, OnInit,Injectable  } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CategoriaService } from 'src/app/Services/categoria.service';
import { Categoria } from 'src/app/interfaces/categoria';
import { Router } from '@angular/router'; 


@Component({
  selector: 'app-categorias',
  templateUrl: './categorias.component.html',
  styleUrls: ['./categorias.component.css']
})
export class CategoriasComponent {
  categorias?:Categoria[];
  form: FormGroup;
  autor?: Categoria;
  

  constructor(
    private fb:FormBuilder,
    private CategoriaService:CategoriaService ,
    private router: Router
  ){
    this.form = this.fb.group({
      "categoria":['',Validators.required]
    })
  }

  ngOnInit() {
      this.getCategorias();
  }

  getCategorias(){
    this.CategoriaService.getCategorias().subscribe((categorias) => {this.categorias = categorias;})
  }

  AgregarCategoria(categoria: Categoria){
    console.log(categoria);
    this.CategoriaService.selectCategoria=Object.assign({},categoria);
    this.router.navigate(['Categorias/actualizar']);
  }

  Eliminar(idCategoria:number){
    if (confirm("¿Estas seguro de eliminar el Idioma?")){
      console.log(idCategoria);
      this.CategoriaService.deleteCategoria(idCategoria).subscribe(()=>{
        this.getCategorias();
      });
    }
  }
}
