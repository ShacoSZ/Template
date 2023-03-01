import { Component, OnInit,Injectable  } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { EntrarService } from 'src/app/Services/entrar.service';
import { Entrar } from 'src/app/interfaces/entrar';
import { Router } from '@angular/router'; 

@Component({
  selector: 'app-entrar',
  templateUrl: './entrar.component.html',
  styleUrls: ['./entrar.component.css']
})
export class EntrarComponent implements OnInit{
  editoriales?:EntrarService[];
  public form: FormGroup;
  editorial?: EntrarService;
  
  constructor(
    private fb:FormBuilder,
    private EntrarService:EntrarService ,
    private router: Router,
  ){    this.form = this.fb.group({
    "email":['',Validators.required],
    "password":['',Validators.required],
  })}

  ngOnInit(): void {
    this.form = this.fb.group({
      "email":['',Validators.required],
      "password":['',Validators.required],
    })
  }

  AgregarEntrar(values: Entrar){
    this.EntrarService.createEntrar(values).subscribe((response:any)=>{
      localStorage.setItem('Token', response.Token);
      localStorage.setItem('UserID', response.UserID);
      localStorage.setItem('rol_id', response.rol_id);
      localStorage.setItem('status', response.status);
      localStorage.setItem('name', response.name);
//      this.router.navigate(['Home'], { queryParams: {showMessage: true, message: 'Persona modificada con exito.'}});
      location.assign('Home');
    });
  }

  Eliminar(atr:Entrar){

  }
}
