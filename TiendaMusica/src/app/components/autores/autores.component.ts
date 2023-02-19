import { Component, OnInit,Injectable } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AutoresService } from 'src/app/Services/autores.service';
import { Autor } from 'src/app/interfaces/autores.interface';
import { Router } from '@angular/router'; 

@Component({
  selector: 'app-autores',
  templateUrl: './autores.component.html',
  styleUrls: ['./autores.component.css']
})

@Injectable()
export class AutoresComponent implements OnInit{
  autores?:Autor[];
  form: FormGroup;
  autor?: Autor;
  

  constructor(
    private fb:FormBuilder,
    private autorService: AutoresService,
    private router: Router
  ){
    this.form = this.fb.group({
      "nombre":['',Validators.required]
    })
  }

  ngOnInit() {
      this.getAutores();
  }

  getAutores(){
    this.autorService.getAutores().subscribe((autores) => {this.autores = autores;})
  }

  Agregar(values: Autor){
    this.autorService.createAutor(values).subscribe(()=>{
      this.getAutores();
    });
  }

  Eliminar(atr:Autor){

  }


}