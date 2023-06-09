import { Component, OnInit,Injectable, OnDestroy  } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CategoriaService } from 'src/app/Services/categoria.service';
import { Categoria } from 'src/app/interfaces/categoria';
import { Router } from '@angular/router'; 
import { ValidateTokenService } from 'src/app/Services/validate-token.service';
import { interval, startWith, switchMap, Subscription } from 'rxjs';


@Component({
  selector: 'app-categorias',
  templateUrl: './categorias.component.html',
  styleUrls: ['./categorias.component.css']
})
export class CategoriasComponent implements OnInit, OnDestroy{
  categorias?:Categoria[];
  form: FormGroup;
  autor?: Categoria;
  rol_id = localStorage.getItem('rol_id');
  rol?:number;
  suscripcion?:Subscription
  

  constructor(
    private fb:FormBuilder,
    private CategoriaService:CategoriaService ,
    private router: Router,
    private TokenService:ValidateTokenService
  ){
    this.form = this.fb.group({
      "categoria":['',Validators.required]
    })
  }

  ngOnInit():void {
//      this.suscripcion = this.getCategorias();
      console.log(localStorage.getItem('rol_id'));
      this.suscripcion = interval(5000).subscribe(()=>{
        this.get_categoria();
      });
  }

  ngOnDestroy() {
    console.log("Muerto")
    if(this.suscripcion)
    {
      this.suscripcion.unsubscribe();
    }
  }

  checarRol(){
    this.TokenService.getValidateRol().subscribe((rol)=>{
      this.rol = Number(rol);
    })
  }


  getCategorias(){
      interval(0).pipe(
      startWith(0),
      switchMap(() => this.CategoriaService.getCategorias())
    ).subscribe((categorias) => {this.categorias = categorias;})
  }

  get_categoria()
  {
    this.CategoriaService.getCategorias().subscribe((categorias) => {this.categorias = categorias;})
  }

  AgregarCategoria(categoria: Categoria){
    console.log(categoria);
    this.CategoriaService.selectCategoria=Object.assign({},categoria);
    this.router.navigate(['Categorias/actualizar']);
  }

  Eliminar(idCategoria:number){
    this.TokenService.getValidateEliminar().subscribe(data => 
    {
      if (confirm("¿Estas seguro de eliminar el Idioma?")){
        console.log(idCategoria);
        this.CategoriaService.deleteCategoria(idCategoria).subscribe(()=>{
          this.getCategorias();
        });
      }
    },
    error => {
    alert("Hubo un cambio, vuelva a iniciar sesion!"); 
     localStorage.removeItem('Token');
        localStorage.removeItem('UserID');
        localStorage.removeItem('rol_id');
        localStorage.removeItem('status');
        localStorage.removeItem('name');
    this.router.navigate(['Entrar']);
    });
  }
}
