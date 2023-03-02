import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router'; 
import { IdiomasService } from 'src/app/Services/idiomas.service';
import { Idioma } from 'src/app/interfaces/idiomas.interface';
import { ValidateTokenService } from 'src/app/Services/validate-token.service';
@Component({
  selector: 'app-idiomas',
  templateUrl: './idiomas.component.html',
  styleUrls: ['./idiomas.component.css']
})
export class IdiomasComponent implements OnInit{
  idiomas?:Idioma[];
  form: FormGroup;
  idioma?: Idioma;
  mostrarFormulario: boolean = false;
  rol_id = localStorage.getItem('rol_id');

  constructor(
    private fb:FormBuilder,
    private idiomasService: IdiomasService,
    private router: Router,
    private TokenService:ValidateTokenService
  ){
    this.form = this.fb.group({
      "idioma":['', Validators.required]
    })
  }

  ngOnInit() {
    this.getAutores();
  }

  getAutores(){
    this.idiomasService.getIdiomas().subscribe((idiomas) => {this.idiomas = idiomas;})
  }

  Agregar(values: Idioma){
    this.idiomasService.createIdioma(values).subscribe(()=>{
      this.getAutores();
    });
  }

  Actualizar(idi:Idioma){
    console.log(idi);
    this.idiomasService.selectIdioma=Object.assign({},idi);
    this.router.navigate(['Idiomas/actualizar']);
  }

  Eliminar(idIdioma:number){
    this.TokenService.getValidateEliminar().subscribe(data => 
      {
        if (confirm("¿Estas seguro de eliminar el Idioma?")){
          console.log(idIdioma);
          this.idiomasService.deleteIdioma(idIdioma).subscribe(()=>{
            this.getAutores();
          });
        }
      },
      error => {
      alert("Hubo un cambio, vuelva a iniciar sesion!"); 
      localStorage.clear();
      this.router.navigate(['Entrar']);
      });
  }


}
