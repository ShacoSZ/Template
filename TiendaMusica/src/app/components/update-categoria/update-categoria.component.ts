import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Categoria } from 'src/app/interfaces/categoria';
import { CategoriaService } from 'src/app/Services/categoria.service';
import { categoria } from 'src/app/categoria';

@Component({
  selector: 'app-update-categoria',
  templateUrl: './update-categoria.component.html',
  styleUrls: ['./update-categoria.component.css']
})
export class UpdateCategoriaComponent implements OnInit{
  categorias?:Categoria[];
  categoria?:Categoria;

  ngOnInit(){
  }

  constructor(
    public categoriaServie: CategoriaService,
    private router: Router
  ){}

  submitForm(idiomaForm:NgForm){
    if(idiomaForm.value.id==null){
      this.categoriaServie.createCategoria(idiomaForm.value)
      .subscribe((response)=>{
        this.router.navigate(["Categorias"]);
      });
    }else{
      this.categoriaServie.updateCategoria(idiomaForm.value.id,idiomaForm.value)
      .subscribe((response)=>{
        this.router.navigate(["Categorias"]);
      });
    }
  }

  regresar(autorForm:NgForm){
    this.resetForm(autorForm);
    this.router.navigate(['Categorias']);
  }

  resetForm(autorForm:NgForm){
    if(autorForm!=null){
      autorForm.reset();
      this.categoriaServie.selectCategoria=new categoria();
    }
  }
}
