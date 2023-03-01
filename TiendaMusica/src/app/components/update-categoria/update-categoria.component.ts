import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Categoria } from 'src/app/interfaces/categoria';
import { CategoriaService } from 'src/app/Services/categoria.service';
import { categoria } from 'src/app/categoria';
import { ValidateTokenService } from 'src/app/Services/validate-token.service';

@Component({
  selector: 'app-update-categoria',
  templateUrl: './update-categoria.component.html',
  styleUrls: ['./update-categoria.component.css']
})
export class UpdateCategoriaComponent implements OnInit{
  categorias?:Categoria[];
  categoria?:Categoria;
  rol?:number;

  ngOnInit(){
  }

  constructor(
    public categoriaServie: CategoriaService,
    private router: Router,
    private TokenService:ValidateTokenService
  ){}

  checarRol(){
    this.TokenService.getValidateRol().subscribe((rol)=>{
      this.rol = Number(rol);
    })
  }

  submitForm(idiomaForm:NgForm){
    this.checarRol();
    if(this.rol == 1 || this.rol == 2){
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
    }else{
      alert("Usuario invalido, vuelva a iniciar sesion!"); 
      localStorage.clear();
      this.router.navigate(['Entrar']);
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
