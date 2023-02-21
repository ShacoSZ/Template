import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Idioma as i } from 'src/app/idioma';
import { Idioma } from 'src/app/interfaces/idiomas.interface';
import { IdiomasService } from 'src/app/Services/idiomas.service';

@Component({
  selector: 'app-update-idioma',
  templateUrl: './update-idioma.component.html',
  styleUrls: ['./update-idioma.component.css']
})
export class UpdateIdiomaComponent implements OnInit{
  idiomas?:Idioma[];
  idioma?:Idioma;

  ngOnInit(){
  }

  constructor(
    public idiomaService: IdiomasService,
    private router: Router
  ){}
 
  submitForm(idiomaForm:NgForm){
    if(idiomaForm.value.id==null){
      this.idiomaService.createIdioma(idiomaForm.value)
      .subscribe((response)=>{
        this.router.navigate(["Idiomas"]);
      });
    }else{
      this.idiomaService.updateIdioma(idiomaForm.value.id,idiomaForm.value)
      .subscribe((response)=>{
        this.router.navigate(["Idiomas"]);
      });
    }
    this.resetForm(idiomaForm);
  }

  regresar(autorForm:NgForm){
    this.resetForm(autorForm);
    this.router.navigate(['Idiomas']);
  }

  resetForm(autorForm:NgForm){
    if(autorForm!=null){
      autorForm.reset();
      this.idiomaService.selectIdioma=new i();
    }
  }

}
