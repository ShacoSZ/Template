import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Autor as a } from 'src/app/autor';
import { Autor } from 'src/app/interfaces/autores.interface';
import { AutoresService } from 'src/app/Services/autores.service';
import { trigger, transition, style, animate } from '@angular/animations';

@Component({
  selector: 'app-update-autores',
  templateUrl: './update-autores.component.html',
  styleUrls: ['./update-autores.component.css'],
  animations: [
    trigger('success', [
      transition(':enter', [
        style({ opacity: 0 }),
        animate('300ms ease-out', style({ opacity: 100 }))
      ]),
      transition(':leave', [
        style({ opacity: 100 }),
        animate('300ms ease-out', style({ opacity: 0 }))
      ])
    ])
  ]
})
export class UpdateAutoresComponent implements OnInit{
  showSuccessMessage = false;
  showErrorMessage = false;
  autores?:Autor[];
  autor?: Autor;
  error: string = '';

  constructor(
    public autorService: AutoresService,
    private router: Router
  ){ }

  ngOnInit(){
  }

  submitForm(autorForm:NgForm){
    this.showSuccessMessage = true;
    this.showErrorMessage = false; // Agrega variable para manejar errores
    if(autorForm.value.id==null){
      this.autorService.createAutor(autorForm.value)
      .subscribe((response)=>{
        this.router.navigate(["Autores"]);
      }, (error) => { // Manejo de errores
        this.showErrorMessage = true;
        this.showSuccessMessage = false;
      });
    }else{
      this.autorService.updateAutor(autorForm.value.id,autorForm.value)
      .subscribe((response)=>{
        this.showSuccessMessage = true;
        this.router.navigate(["Autores"]);
      }, (error) => { // Manejo de errores
        this.showErrorMessage = true;
        this.showSuccessMessage = false;
      });
    }
    this.resetForm(autorForm);
  }

  regresar(autorForm:NgForm){
    this.resetForm(autorForm);
    this.router.navigate(['Autores']);
  }

  resetForm(autorForm:NgForm){
    this.showSuccessMessage = false
    if(autorForm!=null){
      autorForm.reset();
      this.autorService.selectAutor=new a();
    }
  }

}
