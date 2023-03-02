import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Editoriales } from 'src/app/interfaces/editoriales';
import { editorial } from 'src/app/editoriales';
import { EditorialesService } from 'src/app/Services/editoriales.service';
import { ValidateTokenService } from 'src/app/Services/validate-token.service';

@Component({
  selector: 'app-update-editorial',
  templateUrl: './update-editorial.component.html',
  styleUrls: ['./update-editorial.component.css']
})
export class UpdateEditorialComponent implements OnInit{
  editoriales?:Editoriales[];
  editorial?:Editoriales;
  rol?:number;

  ngOnInit(){
  }

  checarRol(){
    this.TokenService.getValidateRol().subscribe((rol)=>{
      this.rol = Number(rol);
      console.log(this.rol);
      if(!(this.rol == 1 || this.rol == 2)){
        alert("Usuario invalido, vuelva a iniciar sesion!"); 
        localStorage.clear();
        this.router.navigate(['Entrar']);
      }
    })
  }

  constructor(
    public editorialService: EditorialesService,
    private router: Router,
    private TokenService:ValidateTokenService
  ){}

  submitForm(idiomaForm:NgForm)
  {
    this.TokenService.getValidateRol().subscribe(data => 
      {
        if(idiomaForm.value.id==null){
          this.editorialService.createCategoria(idiomaForm.value)
          .subscribe((response)=>{
            this.router.navigate(["Editoriales"]);
          });
        }else{
          this.editorialService.updateCategoria(idiomaForm.value.id,idiomaForm.value)
          .subscribe((response)=>{
            this.router.navigate(["Editoriales"]);
          });
        }
        this.resetForm(idiomaForm);    
      },
      error => {
      alert("Hubo un cambio, vuelva a iniciar sesion!"); 
      localStorage.clear();
      this.router.navigate(['Entrar']);
      });
  }

  regresar(autorForm:NgForm){
    this.resetForm(autorForm);
    this.router.navigate(['Editoriales']);
  }

  resetForm(autorForm:NgForm){
    if(autorForm!=null){
      autorForm.reset();
      this.editorialService.selectEditorial=new editorial();
    }
  }
}
 