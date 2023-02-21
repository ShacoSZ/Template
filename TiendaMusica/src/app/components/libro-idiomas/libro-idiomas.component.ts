import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { libroIdioma } from 'src/app/librosIdiomas';
import { LibrosIdiomasService } from 'src/app/Services/libros-idiomas.service';

@Component({
  selector: 'app-libro-idiomas',
  templateUrl: './libro-idiomas.component.html',
  styleUrls: ['./libro-idiomas.component.css']
})
export class LibroIdiomasComponent implements OnInit{
  id = ''
  Idiomas?:libroIdioma[]

  constructor(
    private router:Router ,
    private route: ActivatedRoute,
    private librosIdiomasService:LibrosIdiomasService
  ){}
  
  ngOnInit(){
    this.id = this.route.snapshot.paramMap.get('id') || ''
    this.getIdiomas(parseInt(this.id));
  }

  getIdiomas(id:number){
    this.librosIdiomasService.getLibroIdioma(id).subscribe(
      (Idiomas) => {
        this.Idiomas = Idiomas
      }
    )
  }

  agregar(li:libroIdioma){
    console.log(li);
    this.librosIdiomasService.selectLibro = Object.assign({},li);
    this.router.navigate(['LibrosIdiomas/agregar']);
  }

  Eliminar(id:any){
    if (confirm("¿Estas seguro de eliminar la conexion?")){
      console.log(id);
      this.librosIdiomasService.deletLibroIdioma(id).subscribe(()=>{
        this.getIdiomas(id);
      });
    }
  }

}
 