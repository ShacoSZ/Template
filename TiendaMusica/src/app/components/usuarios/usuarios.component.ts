import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Usuarios } from 'src/app/interfaces/usuarios';
import { UsuariosService } from 'src/app/Services/usuarios.service';

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styleUrls: ['./usuarios.component.css']
})
export class UsuariosComponent implements OnInit{
  usuarios?:Usuarios[];
  rol_id = localStorage.getItem('rol_id');
  nombre = localStorage.getItem('name');
  constructor(
    private UsuariosService:UsuariosService ,
    private router: Router
  ){}

  ngOnInit() {
      this.getCategorias();
      this.nombre = localStorage.getItem('name');
      this.rol_id = localStorage.getItem('rol_id');
  }

  getCategorias(){
    this.UsuariosService.getUsuarios().subscribe((usuarios) => {this.usuarios = usuarios;})
  }

  cambiarRol(id:number){
    if (confirm("¿Estas seguro de eliminar el Idioma?")){
      this.UsuariosService.cambiarRol(id).subscribe(()=>{
        this.getCategorias()
      })
    }
  }

  cambiarStatus(id:number,nom:string){

    if(this.nombre == nom){
      if (confirm("¿Estas seguro de cambiar el estatus? Tendras que volver a iniciar sesion")){
        this.UsuariosService.cambiarStatus(id).subscribe(()=>{
          localStorage.clear();
          localStorage.removeItem('name')
          this.router.navigate(['Home'], { queryParams: {showMessage: true, message: 'Persona modificada con exito.'}});  
        })
      }
    }else{
      if (confirm("¿Estas seguro de cambiar el estatus?")){
        this.UsuariosService.cambiarStatus(id).subscribe(()=>{
          this.getCategorias()
        })
      } 
    }
  }

}
