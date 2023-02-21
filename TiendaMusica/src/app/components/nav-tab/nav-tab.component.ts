import { Component, OnInit,Injectable  } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SalirService } from 'src/app/Services/salir.service';
import { Salir } from 'src/app/interfaces/salir';
import { Router } from '@angular/router'; 

@Component({
  selector: 'app-nav-tab',
  templateUrl: './nav-tab.component.html',
  styleUrls: ['./nav-tab.component.css']
})
export class NavTabComponent implements OnInit{

  rol_id = localStorage.getItem('rol_id');

  name=localStorage.getItem('name')
  constructor(
    private SalirService:SalirService ,
    private router: Router,
  ){}

  ngOnInit(): void {
      this.name=localStorage.getItem('name')
  }

  AgregarSalir(){
    if(confirm('Desea Cerrar Sesion?'))
      {
        localStorage.clear();
        localStorage.removeItem('name')
        this.router.navigate(['Home'], { queryParams: {showMessage: true, message: 'Persona modificada con exito.'}});  
        this.SalirService.createSalir().subscribe(response=>{
        })
      }
      else{
       console.log(console.error());
      }
  }

  isSessionActive() 
  {
    return !!localStorage.getItem('Token');
  }  
}
