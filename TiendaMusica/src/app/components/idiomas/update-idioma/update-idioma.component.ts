import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Idioma as i } from 'src/app/idioma';
import { Idioma } from 'src/app/interfaces/idiomas.interface';
import { IdiomasService } from 'src/app/Services/idiomas.service';
import { ValidateTokenService } from 'src/app/Services/validate-token.service';

@Component({
  selector: 'app-update-idioma',
  templateUrl: './update-idioma.component.html',
  styleUrls: ['./update-idioma.component.css']
})
export class UpdateIdiomaComponent implements OnInit{
  idiomas?:Idioma[];
  idioma?:Idioma;
  rol?:number;

  ngOnInit(){
  }

  checarRol(){
    this.TokenService.getValidateRol().subscribe((rol)=>{
      this.rol = Number(rol);
      console.log(this.rol);
      if(!(this.rol == 1 || this.rol == 2)){
        alert("Usuario invalido, vuelva a iniciar sesion!"); 
         localStorage.removeItem('Token');
        localStorage.removeItem('UserID');
        localStorage.removeItem('rol_id');
        localStorage.removeItem('status');
        localStorage.removeItem('name');
        this.router.navigate(['Entrar']);
      }
    })
  }

  constructor(
    public idiomaService: IdiomasService,
    private router: Router,
    private TokenService:ValidateTokenService
  ){}
    submitForm(idiomaForm:NgForm)
    {
      this.TokenService.getValidateRol().subscribe(data => 
        {
          if(idiomaForm.value.id==null){
            this.idiomaService.createIdioma(idiomaForm.value)
            .subscribe((response)=>{
              this.router.navigate(["Idiomas"]);
            });
          }else{
            this.idiomaService.updateIdioma(idiomaForm.value.id,idiomaForm.value)
            .subscribe((response)=>{
              this.router.navigate(["Idiomas"]);
            });
          }
          this.resetForm(idiomaForm);
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

  regresar(autorForm:NgForm){
    this.resetForm(autorForm);
    this.router.navigate(['Idiomas']);
  }

  resetForm(autorForm:NgForm){
    if(autorForm!=null){
      autorForm.reset();
      this.idiomaService.selectIdioma=new i();
    }
  }

}
