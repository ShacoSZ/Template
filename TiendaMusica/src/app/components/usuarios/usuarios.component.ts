import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Usuarios } from 'src/app/interfaces/usuarios';
import { UsuariosService } from 'src/app/Services/usuarios.service';
import { ValidateTokenService } from 'src/app/Services/validate-token.service';

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
    private router: Router,
    private TokenService:ValidateTokenService
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
    this.TokenService.getValidateEliminar().subscribe(data => 
      {
        if (confirm("¿Estas seguro de eliminar el Idioma?")){
          this.UsuariosService.cambiarRol(id).subscribe(()=>{
            this.getCategorias()
          })
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

  cambiarStatus(id:number,nom:string)
  {
    this.TokenService.getValidateEliminar().subscribe(data => 
      {
        if(this.nombre == nom){
          if (confirm("¿Estas seguro de cambiar el estatus? Saldras de la sesion")){
            this.UsuariosService.cambiarStatus(id).subscribe(()=>{
               localStorage.removeItem('Token');
        localStorage.removeItem('UserID');
        localStorage.removeItem('rol_id');
        localStorage.removeItem('status');
        localStorage.removeItem('name');
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

  menu(){
    this.router.navigate(["Home"])
  }
}
