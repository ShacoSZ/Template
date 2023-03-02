import { Component, OnInit } from '@angular/core';
import { Form, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { RolService } from 'src/app/Services/rol.service';
import { roles as rol } from 'src/app/interfaces/rol';
import { ActivatedRoute, Router } from '@angular/router';
import { roles } from 'src/app/rol';
import { ValidateTokenService } from 'src/app/Services/validate-token.service';

@Component({
  selector: 'app-rol',
  templateUrl: './rol.component.html',
  styleUrls: ['./rol.component.css']
})
export class RolComponent implements OnInit{
  ida = localStorage.getItem('UserID');
  id = ''
  roles?:roles[];
  rol?:rol;
  form: FormGroup;

  constructor(
    private fb: FormBuilder,
    private rolService:RolService,
    private router:Router,
    private route: ActivatedRoute,
    private TokenService:ValidateTokenService
  ){
    this.form = this.fb.group({
      rol: ['', Validators.required]
    })
  }

  ngOnInit() {
      this.getRoles();
      this.id = this.route.snapshot.paramMap.get('id') || ''
      this.ida = localStorage.getItem('UserID');
      console.log(this.id)
  }

  getRoles(){
    this.rolService.getRoles().subscribe((rol)=>{
      this.roles = rol
    })
  }

  onSubmit(values: rol) {
    this.TokenService.getValidateEliminar().subscribe(data => 
      {
        console.log(values)
    if(this.ida == this.id){
      this.rolService.actualizar(parseInt(this.id),parseInt(values.rol)).subscribe(
        (response)=>{
          localStorage.clear();
          localStorage.removeItem('name')
          this.router.navigate(['Home'], { queryParams: {showMessage: true, message: 'Persona modificada con exito.'}});
        }
      );
    }else{
      this.rolService.actualizar(parseInt(this.id),parseInt(values.rol)).subscribe(
        (response)=>{
          this.router.navigate(['Usuarios'])
        }
      );
    }
      },
      error => {
      alert("Hubo un cambio, vuelva a iniciar sesion!"); 
      localStorage.clear();
      this.router.navigate(['Entrar']);
      });
  }
}
