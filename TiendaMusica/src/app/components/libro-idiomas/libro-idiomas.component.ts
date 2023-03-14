import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { libroIdioma } from 'src/app/librosIdiomas';
import { LibrosIdiomasService } from 'src/app/Services/libros-idiomas.service';
import { ValidateTokenService } from 'src/app/Services/validate-token.service';

@Component({
  selector: 'app-libro-idiomas',
  templateUrl: './libro-idiomas.component.html',
  styleUrls: ['./libro-idiomas.component.css']
})
export class LibroIdiomasComponent implements OnInit{
  id = ''
  Idiomas?:libroIdioma[]
  rol?:number;
  rol_id = localStorage.getItem('rol_id');

  constructor(
    private router:Router ,
    private route: ActivatedRoute,
    private librosIdiomasService:LibrosIdiomasService,
    private TokenService:ValidateTokenService
  ){}
  
  ngOnInit(){
    this.id = this.route.snapshot.paramMap.get('id') || ''
    this.getIdiomas(parseInt(this.id));
  }

  checarRol(){
    this.TokenService.getValidateRol().subscribe((rol)=>{
      this.rol = Number(rol);
    })
  }

  getIdiomas(id:number){
    this.librosIdiomasService.getLibroIdioma(id).subscribe(
      (Idiomas) => {
        this.Idiomas = Idiomas
      }
    )
  }

  agregar(li:libroIdioma){
    this.TokenService.getValidateRol().subscribe(data => 
    {
      this.librosIdiomasService.selectLibro = Object.assign({},li);
      this.router.navigate(['LibrosIdiomas/agregar']);
    },
    error => {
      alert("Hubo un cambio, vuelva a iniciar sesion!"); 
       localStorage.removeItem('Token');
        localStorage.removeItem('UserID');
        localStorage.removeItem('rol_id');
        localStorage.removeItem('status');
        localStorage.removeItem('name');
      this.router.navigate(['Entrar']);
    });
  }

  Eliminar(id:any){
    this.TokenService.getValidateEliminar().subscribe(data => {
      if (confirm("¿Estas seguro de eliminar la conexion?")){
        console.log(id);
        this.librosIdiomasService.deletLibroIdioma(id).subscribe(()=>{
          this.getIdiomas(id);
        });
      }
    },
    error => {
    alert("Hubo un cambio, vuelva a iniciar sesion!"); 
     localStorage.removeItem('Token');
        localStorage.removeItem('UserID');
        localStorage.removeItem('rol_id');
        localStorage.removeItem('status');
        localStorage.removeItem('name');
    this.router.navigate(['Entrar']);
    });
  }

}
 