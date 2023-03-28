import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Idioma } from 'src/app/interfaces/idiomas.interface';
import { libroIdioma } from 'src/app/interfaces/librosIdiomas';
import { IdiomasService } from 'src/app/Services/idiomas.service';
import { LibrosIdiomasService } from 'src/app/Services/libros-idiomas.service';

@Component({
  selector: 'app-agregar-lib-id',
  templateUrl: './agregar-lib-id.component.html',
  styleUrls: ['./agregar-lib-id.component.css']
})
export class AgregarLibIdComponent implements OnInit{
  id = ''
  idiomas?:Idioma[];
  form: FormGroup;
  libroIdioma?:libroIdioma

  ngOnInit() {
    this.id = this.route.snapshot.paramMap.get('id') || ''
    this.getAutores();
  }
  
  constructor(
    private router:Router ,
    private route: ActivatedRoute,
    private librosIdiomasService:LibrosIdiomasService,
    private fb: FormBuilder,
    private idiomasService:IdiomasService
  ){
    this.form = this.fb.group({
      libro_id: [this.id, Validators.required],
      idioma_id: ['', Validators.required]
    })
  }

  onSubmit(values: libroIdioma) {
    values.libro_id = parseInt(this.id);
    console.log(values)
    this.librosIdiomasService.createLibroIdioma(values).subscribe(
      (response)=>{
        this.router.navigate(['LibrosIdiomas/'+this.id])
      }
    );
  }

  getAutores(){
    this.idiomasService.getIdiomas().subscribe((idiomas) => {this.idiomas = idiomas;})
  }
}
