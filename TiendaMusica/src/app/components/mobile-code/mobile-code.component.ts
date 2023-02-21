import { Component, OnInit,Injectable  } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MobileCodeService } from 'src/app/Services/mobile-code.service';
import { MobileCode } from 'src/app/interfaces/mobile-code';
import { Router } from '@angular/router'; 

@Component({
  selector: 'app-mobile-code',
  templateUrl: './mobile-code.component.html',
  styleUrls: ['./mobile-code.component.css']
})
export class MobileCodeComponent implements OnInit{
  form: FormGroup;
  rimuru=localStorage.getItem('url');
  

  constructor(
    private fb:FormBuilder,
    private MobileCodeService:MobileCodeService ,
    private router: Router
  ){
    this.form = this.fb.group({
      "Code":['',Validators.required],
    })
  }

  ngOnInit() {}

  AgregarMobileCode(values: MobileCode,urlsao=localStorage.getItem('url')){
    if(urlsao==='string'){
    this.MobileCodeService.createCode(values,urlsao).subscribe((response:any)=>{
      localStorage.setItem('url', response.url);
    });
    }
  }

  onSubmit(values: MobileCode, url = localStorage.getItem('url'))
  {
    if(typeof url === 'string')
    {
      this.MobileCodeService.addMobile(values, url).subscribe(response => {
        console.log(response);
        localStorage.removeItem('url');
        this.router.navigate(['Home'], { queryParams: {showMessage: true, message: 'Persona modificada con exito.'}});
      });

    }
  }



  Eliminar(atr:MobileCode){

  }
}
