import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router'; 
import { IdiomasService } from 'src/app/Services/idiomas.service';
import { Idioma } from 'src/app/interfaces/idiomas.interface';
import { ValidateTokenService } from 'src/app/Services/validate-token.service';
import { URL } from 'src/app/global-component';
import { Subscription } from 'rxjs';
@Component({
  selector: 'app-idiomas',
  templateUrl: './idiomas.component.html',
  styleUrls: ['./idiomas.component.css']
})
export class IdiomasComponent implements OnInit, OnDestroy{
  idiomas?:Idioma[];
  form: FormGroup;
  idioma?: Idioma;
  mostrarFormulario: boolean = false;
  rol_id = localStorage.getItem('rol_id');
  eventSource?: EventSource;
  suscription?: Subscription;
  eventS?:EventSource;
  message?:string= ''
  estado?:boolean

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
    this.getAutores();
    this.eventS = new EventSource(URL.appUrl + 'idiomas/eventos');
    this.eventS.addEventListener('new:idioma', (event) => {
      console.log('Se ha agregado una nueva consola');
      this.getAutores();
    });

//    this.eventS.onopen = () => {
//      console.log('Conectado al event source');
//      this.getAutores();
//   };
//
//   this.getAutores();
//    this.eventS.onerror = (error) => {
//      console.log('Error en el event source');
//      console.log(error);
//    };
    /*this.eventS.addEventListener('new:idioma', (event) => {
      console.log(event)
      this.getAutores()
    })*/

    //this.eventS.addEventListener('new:idioma', (event) => {
      //console.log('Mensaje del event source');
      // this.getAutores();
     // console.log(event);
      // this.getAutores()
      // this.suscription = this.idiomasService.get_refresh$().subscribe(() => {
      //   this.getAutores();
      // });
      // this.message = event.data;
      // this.estado = true;
      // console.log(this.message);
      // console.log(this.estado);
    //});

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
    // Cierra la conexión con EventSource
    if (this.eventSource) {
      this.eventSource.close();
    }
    // Cancela la suscripción al servicio de ingredientes
    if (this.suscription) {
      this.suscription.unsubscribe();
    }
    //cierra el eventS
    if(this.eventS){
      this.eventS.close();
    }
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
