import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Autor as a } from 'src/app/autor';
import { Autor } from 'src/app/interfaces/autores.interface';
import { AutoresService } from 'src/app/Services/autores.service';

@Component({
  selector: 'app-update-autores',
  templateUrl: './update-autores.component.html',
  styleUrls: ['./update-autores.component.css']
})
export class UpdateAutoresComponent implements OnInit{
  autores?:Autor[];
  autor?: Autor;

  constructor(
    public autorService: AutoresService,
    private router: Router
  ){ }

  ngOnInit(){
  }

  submitForm(autorForm:NgForm){
    if(autorForm.value.id==null){
      this.autorService.createAutor(autorForm.value)
      .subscribe((response)=>{
        this.router.navigate(["Autores"]);
      });
    }else{
      this.autorService.updateAutor(autorForm.value.id,autorForm.value)
      .subscribe((response)=>{
        this.router.navigate(["Autores"]);
      }
      );
    }
    this.resetForm;
  }

  resetForm(autorForm:NgForm){
    if(autorForm!=null){
      autorForm.reset();
      this.autorService.selectAutor=new a();
    }
  }
}
