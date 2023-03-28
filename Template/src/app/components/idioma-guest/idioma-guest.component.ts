import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router'; 
import { IdiomasService } from 'src/app/Services/idiomas.service';
import { Idioma } from 'src/app/interfaces/idiomas.interface';
import { ValidateTokenService } from 'src/app/Services/validate-token.service';
import { URL } from 'src/app/global-component';
import { Subscription } from 'rxjs';
@Component({
  selector: 'app-idioma-guest',
  templateUrl: './idioma-guest.component.html',
  styleUrls: ['./idioma-guest.component.css']
})
export class IdiomaGuestComponent implements OnInit, OnDestroy{
  idiomas?:Idioma[];
  form: FormGroup;
  idioma?: Idioma;
  mostrarFormulario: boolean = false;
  rol_id = localStorage.getItem('rol_id');
  estado: boolean = false;
  message: string = '';
  eventSource: EventSource = new EventSource(URL.appUrl + 'stream');
  suscription?: Subscription;

  constructor(
    private fb:FormBuilder,
    private idiomasService: IdiomasService,
    private router: Router,
    private TokenService:ValidateTokenService
  ){
    this.form = this.fb.group({
      "idioma":['', Validators.required]
    })
  }
  
  ngOnInit() {

    this.eventSource.onopen = () => {
      console.log('Conectado al event source');
      this.getAutores();

   };
    this.getAutores();
    this.eventSource.onerror = (error) => {
      console.log('Error en el event source');
      console.log(error);
    };
    this.eventSource.addEventListener('new:ingrediente', (event) => {
      console.log('Mensaje del event source');
      this.getAutores();
      console.log(event);
      this.suscription = this.idiomasService.get_refresh$().subscribe(() => {
        this.getAutores();
      });
      this.message = event.data;
      this.estado = true;
    });
    this.eventSource.addEventListener('update:ingrediente', (event) => {
      console.log('Mensaje del event source');
      this.getAutores();
      console.log(event);
      this.suscription = this.idiomasService.get_refresh$().subscribe(() => {
        this.getAutores();
      });
      this.message = event.data;
      this.estado = true;
    });
    this.eventSource.addEventListener('delete:ingrediente', (event) => {
      console.log('Mensaje del event source');
      this.getAutores();
      console.log(event);
      this.suscription = this.idiomasService.get_refresh$().subscribe(() => {
        this.getAutores();
      });
      this.message = event.data;
      this.estado = true;
    });

    this.eventSource.addEventListener('message', (event) => {
      console.log('Mensaje del event source');
      this.getAutores();
      console.log(event);
      this.suscription = this.idiomasService.get_refresh$().subscribe(() => {
        this.getAutores();
      });
      this.message = event.data;
      this.estado = true;
    });

  }

  getAutores(){
    this.idiomasService.getIdiomas().subscribe((idiomas) => {this.idiomas = idiomas;})
  }

  Agregar(values: Idioma){
    this.idiomasService.createIdioma(values).subscribe(()=>{
      this.getAutores();
    });
  }

  Actualizar(idi:Idioma){
    console.log(idi);
    this.idiomasService.selectIdioma=Object.assign({},idi);
    this.router.navigate(['/Idiomas/actualizar']);
  }

  ngOnDestroy(): void {

  }


  Eliminar(idIdioma:number){
    this.TokenService.getValidateEliminar().subscribe(data => 
      {
        if (confirm("¿Estas seguro de eliminar el Idioma?")){
          console.log(idIdioma);
          this.idiomasService.deleteIdioma(idIdioma).subscribe(()=>{
            this.getAutores();
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
