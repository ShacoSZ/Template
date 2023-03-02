import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Editoriales } from 'src/app/interfaces/editoriales';
import { EditorialesService } from 'src/app/Services/editoriales.service';
import { ValidateTokenService } from 'src/app/Services/validate-token.service';

@Component({
  selector: 'app-editoriales',
  templateUrl: './editoriales.component.html',
  styleUrls: ['./editoriales.component.css']
})
export class EditorialesComponent {
  editoriales?:Editoriales[];
  form: FormGroup;
  idioma?: Editoriales;
  mostrarFormulario: boolean = false;
  rol_id = localStorage.getItem('rol_id');

  constructor(
    private fb:FormBuilder,
    private editorialService: EditorialesService,
    private router: Router,
    private TokenService:ValidateTokenService,
  ){
    this.form = this.fb.group({
      "nombre":['', Validators.required]
    })
  }

  ngOnInit() {
    this.getAutores();
  }

  getAutores(){
    this.editorialService.getEditoriales().subscribe((editoriales) => {this.editoriales = editoriales;})
  }

  Actualizar(editorial:Editoriales){
    console.log(editorial);
    this.editorialService.selectEditorial=Object.assign({},editorial);
    this.router.navigate(['Editoriales/actualizar']);
  }

  Eliminar(idEditorial:number)
  {
    this.TokenService.getValidateEliminar().subscribe(data => 
      {
        if (confirm("¿Estas seguro de eliminar el Idioma?")){
          console.log(idEditorial);
          this.editorialService.deleteCategoria(idEditorial).subscribe(()=>{
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
