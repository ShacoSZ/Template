import { Component, Injectable } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AutoresService } from 'src/app/Services/autores.service';
import { Autor } from 'src/app/interfaces/autores.interface';
import { Router } from '@angular/router'; 

@Component({
  selector: 'app-read-autores',
  templateUrl: './read-autores.component.html',
  styleUrls: ['./read-autores.component.css']
})

@Injectable()
export class ReadAutoresComponent {
  form: FormGroup;
  autor?: Autor;
  autores?:Autor[];

  constructor(
    private fb:FormBuilder,
    private autorService: AutoresService,
    private router: Router
  ){
    this.form = this.fb.group({
      "nombre":['',Validators.required]
    })
  }

  Agregar(values: Autor){
    this.autorService.createAutor(values).subscribe(()=>{
      this.getAutores();
    });
  }

  getAutores(){
    this.autorService.getAutores().subscribe(autores => this.autores = autores)
  }
}
