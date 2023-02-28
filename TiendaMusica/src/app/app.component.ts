import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Usuarios } from './interfaces/usuarios';
import { UsuariosService } from './Services/usuarios.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'Libreria';

  usuarios?:Usuarios[];
  rol_id?:string
  nombre?:string
  constructor(
    private UsuariosService:UsuariosService ,
    private router: Router
  ){}

  ngOnInit() {
    
    this.getCategorias();
    this.nombre = String(localStorage.getItem('name'));
    this.rol_id = String(localStorage.getItem('rol_id'));
  }

  getCategorias(){
    this.UsuariosService.getUsuarios().subscribe((usuarios) => {this.usuarios = usuarios;})
  }
}
