import { Component, OnInit,Injectable  } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { RegistrarService } from 'src/app/Services/registrar.service';
import { Registrar } from 'src/app/interfaces/registrar';
import { Router } from '@angular/router'; 

@Component({
  selector: 'app-registrar',
  templateUrl: './registrar.component.html',
  styleUrls: ['./registrar.component.css']
})
export class RegistrarComponent implements OnInit{
  form: FormGroup;

  

  constructor(
    private fb:FormBuilder,
    private RegistrarService:RegistrarService ,
    private router: Router
  ){
    this.form = this.fb.group({
      "name":['',Validators.required],
      "email":['',Validators.required],
      "phone":['',Validators.required],
      "password":['',Validators.required],
    })
  }

  ngOnInit() {}

  AgregarRegistrar(values: Registrar){
    this.RegistrarService.createRegistrar(values).subscribe((response:any)=>{
      console.log(response)
      console.log(values)
      localStorage.setItem('url', response.url);
      this.router.navigate(['Mobile-Code'], { queryParams: {showMessage: true, message: 'Persona modificada con exito.'}});
    });
  }

  Eliminar(atr:Registrar){

  }
}
