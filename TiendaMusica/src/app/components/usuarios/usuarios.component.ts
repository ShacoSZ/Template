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
  constructor(
    private UsuariosService:UsuariosService ,
    private router: Router
  ){}

  ngOnInit() {
      this.getCategorias();
  }

  getCategorias(){
    this.UsuariosService.getUsuarios().subscribe((usuarios) => {this.usuarios = usuarios;})
  }

  Eliminar(atr:Usuarios){

  }

}
