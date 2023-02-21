import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Editoriales } from 'src/app/interfaces/editoriales';
import { editorial } from 'src/app/editoriales';
import { EditorialesService } from 'src/app/Services/editoriales.service';

@Component({
  selector: 'app-update-editorial',
  templateUrl: './update-editorial.component.html',
  styleUrls: ['./update-editorial.component.css']
})
export class UpdateEditorialComponent implements OnInit{
  editoriales?:Editoriales[];
  editorial?:Editoriales;

  ngOnInit(){
  }

  constructor(
    public editorialService: EditorialesService,
    private router: Router
  ){}

  submitForm(idiomaForm:NgForm){
    if(idiomaForm.value.id==null){
      this.editorialService.createCategoria(idiomaForm.value)
      .subscribe((response)=>{
        this.router.navigate(["Editoriales"]);
      });
    }else{
      this.editorialService.updateCategoria(idiomaForm.value.id,idiomaForm.value)
      .subscribe((response)=>{
        this.router.navigate(["Editoriales"]);
      });
    }
  }

  regresar(autorForm:NgForm){
    this.resetForm(autorForm);
    this.router.navigate(['Editoriales']);
  }

  resetForm(autorForm:NgForm){
    if(autorForm!=null){
      autorForm.reset();
      this.editorialService.selectEditorial=new editorial();
    }
  }
}
 